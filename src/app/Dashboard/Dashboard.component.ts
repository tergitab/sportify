import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './Dashboard.component.html',
    styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    isNavbarActive = false;

    constructor(private authService: AuthService) { }

    ngOnInit() { }


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
