import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './LogIn.component.html',
    styleUrls: ['./LogIn.component.css']
})
export class LogInComponent {
    constructor(private authService: AuthService, private router: Router) { }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const credentials = form.value;
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
