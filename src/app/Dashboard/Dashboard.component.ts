import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-Dashboard',
    templateUrl: './Dashboard.component.html',
    styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    isNavbarActive = false;

    toggleNavbar() {
        this.isNavbarActive = !this.isNavbarActive;
    }

    toggleFaq(event: Event): void {
        const faqItem = (event.currentTarget as HTMLElement).closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('active');
        }
    }
}