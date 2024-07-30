import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../environment/environment';

@Component({
    selector: 'app-sign-up',
    templateUrl: './SignUp.component.html',
    styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {
    selectedUserType: string | undefined;

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

    ngOnInit() {
    }

    onSubmit(form: any) {
        const userData = {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password,
            role: this.selectedUserType
        };

        const registerUrl = `${environment.apiBaseUrl}/users/register`;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        this.http.post<any>(registerUrl, userData, { headers }).subscribe({
            next: response => {
                console.log('Registration successful:', response);
                this.loginUser(form.value.email, form.value.password);
            },
            error: error => {
                console.error('Error registering user:', error);
                window.alert('Error registering user. Please try again.');
            }
        });
    }

    loginUser(email: string, password: string) {
        const credentials = { email, password };

        this.authService.login(credentials).subscribe({
            next: () => {
                alert('Login successful');
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                console.error(error);
                alert('Login failed: Invalid credentials or server error');
            }
        });
    }
}
