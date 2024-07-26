import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        console.log('Sending login request with credentials:', credentials); // Debug log
        return this.http.post(this.loginUrl, credentials).pipe(
            tap((response: any) => {
                console.log('Server response:', response); // Debug log
                if (response && response.token) {
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 1);

                    this.cookieService.set('authToken', response.token, {
                        expires: expirationDate,
                        secure: true,
                        sameSite: 'Lax'
                    });

                    this.decodedToken = jwtDecode(response.token);
                } else {
                    throw new Error('Invalid credentials');
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
        const expiry = this.decodedToken.exp;
        return Math.floor(new Date().getTime() / 1000) >= expiry;
    }

    logout(): void {
        this.cookieService.delete('authToken');
        this.decodedToken = null;
        this.router.navigate(['/login']);
    }
}
