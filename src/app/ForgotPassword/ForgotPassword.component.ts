import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './ForgotPassword.component.html',
    styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent {
    isLoading = false;
    message: string | null = null;
    errorMessage: string | null = null;

    constructor(private authService: AuthService) { }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            this.errorMessage = 'Please enter a valid email.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const email = form.value.email;
        this.authService.forgotPassword(email).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.message = 'An email has been sent with password reset instructions.';
            },
            error: (error) => {
                this.isLoading = false;
                this.errorMessage = 'Unable to send reset instructions. Please try again later.';
                console.error('Error sending reset instructions:', error);
            }
        });
    }
}
