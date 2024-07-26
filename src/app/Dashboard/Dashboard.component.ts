import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './Dashboard.component.html',
    styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    isNavbarActive = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        console.log('DashboardComponent initialized');

    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('authToken');
        console.log('Token in localStorage:', token);
        return !!token;
    }

    logOut() {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
    }

    toggleNavbar() {
        this.isNavbarActive = !this.isNavbarActive;
    }

    toggleFaq(event: Event): void {
        const faqItem = (event.currentTarget as HTMLElement).closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('active');
        }
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    logout() {
        this.authService.logout();
    }
}
