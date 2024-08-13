import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './LogIn.component.html',
    styleUrls: ['./LogIn.component.css']
})
export class LogInComponent {
    isLoading = false;
    errorMessage: string | null = null;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            this.errorMessage = 'Please fill in all required fields.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const credentials = form.value;
        this.authService.login(credentials).subscribe({
            next: () => {
                alert('Login successful');
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                console.error('Login error:', error);
                this.isLoading = false;
                if (error.status === 401) {
                    this.errorMessage = 'Invalid credentials. Please try again.';
                } else if (error.status === 500) {
                    this.errorMessage = 'Server error. Please try again later.';
                } else {
                    this.errorMessage = 'Unexpected error. Please try again.';
                }
            }
        });
    }
}
