import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './LogIn.component.html',
    styleUrls: ['./LogIn.component.css']
})
export class LogInComponent {

    constructor(private http: HttpClient, private router: Router) { }

    onSubmit(form: any): void {
        const loginData = {
            email: form.email,
            password: form.password
        };

        // Adjust the API endpoint based on your backend setup
        const loginUrl = 'http://localhost:8080/public/login';

        // Assuming you need to set headers or handle authentication tokens
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
            // Add any other headers if needed
        });

        this.http.post<any>(loginUrl, loginData, { headers })
            .subscribe({
                next: response => {
                    console.log('Login successful:', response);

                    // Example navigation after successful login
                    this.router.navigate(['/dashboard']);
                },
                error: error => {
                    console.error('Error logging in:', error);
                    // Handle error (display message to the user, etc.)
                }
            });
    }
}
