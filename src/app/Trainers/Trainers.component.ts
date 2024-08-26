import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-trainers',
    templateUrl: './Trainers.component.html',
    styleUrls: ['./Trainers.component.css']
})
export class TrainersComponent implements OnInit {
    isMenuActive: boolean = false;
    showRegisterForm = false;
    showFindCoach = false;
    announcements: { name: string; contactNumber: string; location: string, date: Date, city: string, sport: string, time: string }[] = [];
    newAnnouncement = { name: '', contactNumber: '', location: '', date: new Date(), city: '', sport: '', time: '' };
    selectedAnnouncement: any = null;
    trainers: any[] = []; // Array to hold trainers' information

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getTrainers();
    }

    getTrainers(): void {
        const url = 'http://app.sportify-al.com/trainers';
        this.http.get<any[]>(url).subscribe(
            (data) => {
                this.trainers = data;
            },
            (error) => {
                console.error('Error fetching trainers data', error);
            }
        );
    }

    addAnnouncement() {
        this.announcements.push({ ...this.newAnnouncement });
        this.newAnnouncement = { name: '', contactNumber: '', location: '', date: new Date(), city: '', sport: '', time: '' };
        this.showRegisterForm = false;
    }

    toggleSection(section: string) {
        if (section === 'register') {
            this.showRegisterForm = !this.showRegisterForm;
            this.showFindCoach = false;
        } else if (section === 'find') {
            this.showFindCoach = !this.showFindCoach;
            this.showRegisterForm = false;
        }
    }

    showContactInfo(announcement: any) {
        this.selectedAnnouncement = announcement;
    }
}
