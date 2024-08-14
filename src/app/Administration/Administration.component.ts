import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { AuthService } from '../services/auth.service';

interface Event {
    name: string;
    date: Date;
    startTime: string;
    endTime: string;
    location: string;
    sport: string;
    summary: string;
}

interface Field {
    id: string;
    name: string;
    location: string;
    description: string;
    photoUrl: string;
}

@Component({
    selector: 'app-administration',
    templateUrl: './Administration.component.html',
    styleUrls: ['./Administration.component.css']
})
export class AdministrationComponent implements OnInit {

    events: Event[] = [];
    fields: Field[] = [];
    newField = { name: '', location: '', description: '', photoUrl: '' };
    start: Date;
    end: Date;
    selectedDate: Date | null = null;
    filteredEvents: Event[] = [];
    selectedEvents: Event[] = [];
    selectedSlot: string | null = null;
    selectedSlotDetails: Event | null = null;
    currentUser: any;
    selectedFieldId: string | null = null;
    selectedFieldName: string = '';
    showFieldsList: boolean = false;
    isEditable: boolean = false;
    showAddFieldForm: boolean = false;
    photoPreview: string | ArrayBuffer | null = null;

    constructor(private authService: AuthService) {
        this.start = new Date();
        this.end = new Date();
        this.events = [
            { name: 'Event 1', date: new Date('2024-07-05'), startTime: '10:00', endTime: '12:00', summary: 'Event 1 Summary', location: 'test', sport: 'Futboll' },
            { name: 'Event 2', date: new Date('2024-07-10'), startTime: '14:00', endTime: '16:00', summary: 'Event 2 Summary', location: 'test', sport: 'Futboll' },
            { name: 'Event 3', date: new Date('2024-07-15'), startTime: '09:00', endTime: '11:00', summary: 'Event 3 Summary', location: 'test', sport: 'Futboll' },
            { name: 'Event 4', date: new Date('2024-07-20'), startTime: '13:00', endTime: '15:00', summary: 'Event 4 Summary', location: 'test', sport: 'Futboll' },
            { name: 'Event 5', date: new Date('2024-07-25'), startTime: '10:00', endTime: '12:00', summary: 'Event 5 Summary', location: 'test', sport: 'Futboll' }
        ];
        this.fields = [
            { id: '1', name: 'Fusha 1', location: 'Tirana', description: 'A high-quality football field.', photoUrl: 'assets/images/Football-field.jpg' },
            { id: '2', name: 'Fusha 2', location: 'Durres', description: 'A large field for various sports.', photoUrl: 'assets/images/sports-field.webp' },
            { id: '3', name: 'Fusha 3', location: 'Shkodra', description: 'A state-of-the-art sports complex.', photoUrl: 'assets/images/sports-complex.jpeg' }
        ];
        this.filterEvents();
    }

    ngOnInit(): void {
        console.log('Logged in user information:', this.currentUser);
    }

    toggleUpdatePage(): void {
        this.showFieldsList = true;
    }

    toggleEditMode(): void {
        this.isEditable = !this.isEditable;
    }

    toggleAddField(): void {
        this.showAddFieldForm = true;
        this.showFieldsList = false;
    }

    addNewField(): void {
        // Add the new field to the fields array
        this.fields.push({
            ...this.newField,
            id: ''
        });

        // Clear the form
        this.newField = { name: '', location: '', description: '', photoUrl: '' };
        this.photoPreview = null; // Clear the photo preview

        // Hide the form
        this.closeAddFieldForm();
    }

    closeAddFieldForm(): void {
        this.showAddFieldForm = false;
        this.showFieldsList = false;
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.photoPreview = reader.result;
                this.newField.photoUrl = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    toggleCalendar(fieldId: string): void {
        if (this.selectedFieldId === fieldId) {
            this.selectedFieldId = null;
            this.selectedFieldName = '';
        } else {
            this.selectedFieldId = fieldId;
            this.selectedFieldName = this.fields.find(field => field.id === fieldId)?.name || '';
        }
    }

    filterEvents() {
        this.selectedEvents = [];
        this.selectedDate = null;
        if (this.start && this.end) {
            this.filteredEvents = this.events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= this.start && eventDate <= this.end;
            });
        } else {
            this.filteredEvents = [...this.events];
        }
    }

    onDateSelected(date: Date | null) {
        this.selectedDate = date;
        this.selectedSlot = null;
        this.selectedSlotDetails = null;

        if (date) {
            this.selectedEvents = this.events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === date.toDateString();
            });
        } else {
            this.selectedEvents = [];
        }
    }

    generateTimeSlots(start: string, end: string, interval: number): { start: string, end: string }[] {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);
        const slots = [];
        let current = startTime;
        while (current < endTime) {
            const endSlotTime = new Date(current.getTime() + interval * 60000);
            slots.push({ start: current.toTimeString().substring(0, 5), end: endSlotTime.toTimeString().substring(0, 5) });
            current = endSlotTime;
        }
        return slots;
    }

    isSlotBooked(slot: string): boolean {
        return this.selectedEvents.some(event => event.startTime <= slot && event.endTime > slot);
    }

    selectSlot(slot: string) {
        this.selectedSlot = slot;
        if (this.isSlotBooked(slot)) {
            this.selectedSlotDetails = this.selectedEvents.find(event => event.startTime === slot) || null;
        } else {
            this.selectedSlotDetails = null;
        }
    }

    bookSlot(slot: string) {
        const newEvent: Event = {
            name: 'New Event',
            date: this.selectedDate!,
            startTime: slot,
            endTime: this.calculateEndTime(slot),
            location: 'New Location',
            sport: 'New Sport',
            summary: 'New Summary'
        };
        this.selectedEvents.push(newEvent);
        this.events.push(newEvent);
        this.selectSlot(slot);
    }

    cancelBooking(slot: string) {
        this.selectedEvents = this.selectedEvents.filter(event => event.startTime !== slot);
        this.events = this.events.filter(event => event.startTime !== slot);
        this.selectedSlot = null;
        this.selectedSlotDetails = null;
    }

    calculateEndTime(start: string): string {
        const [hours, minutes] = start.split(':').map(Number);
        const endTime = new Date(1970, 0, 1, hours, minutes + 60); // Assuming 1 hour interval
        return endTime.toTimeString().substring(0, 5);
    }

    dateClass: MatCalendarCellClassFunction<Date> = (date: Date, view: string) => {
        if (view === 'month') {
            const eventDates = this.events.map(event => event.date.toDateString());
            return eventDates.includes(date.toDateString()) ? 'event-date' : '';
        }
        return '';
    }

    goBack(): void {
        this.selectedFieldId = null;
        this.selectedFieldName = '';
    }

    logOut() {
        this.authService.logout();
    }

    get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}
