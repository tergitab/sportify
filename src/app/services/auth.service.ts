import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl = `${environment.apiBaseUrl}/public/login`;
    private decodedToken: any;

    constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

    login(credentials: { email: string, password: string }): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true
        };

        return this.http.post(this.loginUrl, credentials, httpOptions).pipe(
            tap((response: any) => {
                console.log('Response received:', response);
                if (response && response.token) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 1);

                    this.cookieService.set('authToken', response.token, {
                        expires: expirationDate,
                        secure: true,
                        sameSite: 'Lax'
                    });

                    this.decodedToken = jwtDecode(response.token);
                    console.log('Decoded token:', this.decodedToken);
                } else {
                    console.error('No token found in response');
                    throw new Error('Invalid credentials');
                }
            }),
            catchError((error) => {
                console.error('Error during login request:', error);
                if (error.status === 401) {
                    return throwError('Invalid credentials. Please try again.');
                } else if (error.status === 500) {
                    return throwError('Server error. Please try again later.');
                } else {
                    return throwError('Unexpected error. Please try again.');
                }
            })
        );
    }

    getToken(): string {
        return this.cookieService.get('authToken');
    }

    decodeToken(): void {
        const token = this.getToken();
        if (token && !this.decodedToken) {
            this.decodedToken = jwtDecode(token);
        }
    }

    getDecodedToken(): any {
        this.decodeToken();
        return this.decodedToken;
    }

    isLoggedIn(): boolean {
        this.decodeToken();
        return this.decodedToken ? !this.isTokenExpired() : false;
    }

    private isTokenExpired(): boolean {
        const expiry = this.decodedToken?.exp;
        if (expiry) {
            return Math.floor(new Date().getTime() / 1000) >= expiry;
        }
        return false;
    }

    logout(): void {
        this.cookieService.delete('authToken');
        this.decodedToken = null;
        this.router.navigate(['/login']);
    }
}
