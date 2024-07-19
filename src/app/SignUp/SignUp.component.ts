import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Component({
    selector: 'app-sign-up',
    templateUrl: './SignUp.component.html',
    styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

    selectedUserType: string | undefined;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    onSubmit(form: any) {
        const userData = {
            username: form.username,
            email: form.email,
            password: form.password,
            role: this.selectedUserType
        };

        const registerUrl = `${environment.apiBaseUrl}/users/register`;

        this.http.post<any>(registerUrl, userData)
            .subscribe({
                next: response => {
                    console.log('Registration successful:', response);
                    // Automatically log in the user after successful registration
                    this.loginUser(form.email, form.password);
                },
                error: error => {
                    console.error('Error registering user:', error);
                }
            });
    }

    loginUser(email: string, password: string) {
        const loginData = { email, password };
        const loginUrl = `${environment.apiBaseUrl}/public/login`;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<any>(loginUrl, loginData, { headers, observe: 'response' })
            .subscribe({
                next: response => {
                    console.log('Login successful:', response);
                    const token = response.headers.get('Authorization');
                    if (token) {
                        localStorage.setItem('authToken', token);
                    }
                    this.router.navigate(['/dashboard']);
                },
                error: error => {
                    console.error('Error logging in:', error);
                }
            });
    }
}
