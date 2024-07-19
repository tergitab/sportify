import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './LogIn.component.html',
    styleUrls: ['./LogIn.component.css']
})
export class LogInComponent {

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    onSubmit(form: any): void {
        const loginData = {
            email: form.email,
            password: form.password
        };

        const loginUrl = 'http://app.sportify-al.com/public/login';

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<any>(loginUrl, loginData, { headers })
            .subscribe({
                next: response => {
                    console.log('Login successful:', response);
                    if (response.token) {
                        this.authService.login(response.token);
                        this.router.navigate(['/dashboard']);
                    }
                },
                error: error => {
                    console.error('Error logging in:', error);
                }
            });
    }
}
