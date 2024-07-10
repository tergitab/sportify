import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-SignUp',
    templateUrl: './SignUp.component.html',
    styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

    selectedUserType: string | undefined; // Track selected user type

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onSubmit(form: any) {
        const userData = {
            username: form.username, // Include username here
            email: form.email,
            password: form.password,
            role: this.selectedUserType // Use selectedUserType here
        };

        this.http.post<any>('http://localhost:8080/users/register', userData)
            .subscribe({
                next: response => {
                    console.log('Registration successful:', response);
                    // Handle success, e.g., navigate to another page
                },
                error: error => {
                    console.error('Error registering user:', error);
                    // Handle error, display a message to the user
                }
            });
    }
}
