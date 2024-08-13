import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';// Import your AuthService

interface Event {
    id: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    sport: string;
    summary: string;
    userId: string; // Added userId to associate event with a user
}

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit {
    events: Event[] = [];
    allEvents: Event[] = [];
    userEvents: Event[] = [];
    userId: string | null = null;
    showingMyEvents: boolean = false;

    constructor(private authService: AuthService) { }

    ngAfterViewInit(): void {
        this.loadEvents();
        this.setupFilters();
        this.setupAddEventForm();
        this.setupToggleAddEventForm();
        this.setupMyEventsButton();

        // Get logged-in user's ID
        const decodedToken = this.authService.getDecodedToken();
        this.userId = decodedToken ? decodedToken.userId : null;
    }

    loadEvents(): void {
        // Mocked events for demonstration
        this.allEvents = [
            {
                id: '1',
                name: 'Football Championship',
                date: '2024-06-20',
                startTime: '10:00',
                endTime: '12:00',
                location: 'Stadium A',
                sport: 'Futboll',
                summary: 'The best football teams compete for the championship.',
                userId: '123' // Example userId
            },
            {
                id: '2',
                name: 'Basketball Tournament',
                date: '2024-07-05',
                startTime: '13:00',
                endTime: '15:00',
                location: 'Arena B',
                sport: 'Basketboll',
                summary: 'Top basketball teams from across the country.',
                userId: '124' // Another userId
            },
            {
                id: '3',
                name: 'Tennis Open',
                date: '2024-08-15',
                startTime: '09:00',
                endTime: '11:00',
                location: 'Court C',
                sport: 'Tenis',
                summary: 'A thrilling tennis tournament featuring top players.',
                userId: '123' // Example userId
            }
        ];

        this.userEvents = this.allEvents.filter(event => event.userId === this.userId);
        this.events = [...this.allEvents]; // Initially display all events
    }

    setupFilters(): void {
        const filterButton = document.getElementById('filter-button')!;
        filterButton.addEventListener('click', () => {
            const monthFilter = (document.getElementById('month-filter') as HTMLSelectElement).value;
            const sportFilter = (document.getElementById('sport-filter') as HTMLSelectElement).value;

            const filteredEvents = this.allEvents.filter(event => {
                const eventMonth = new Date(event.date).getMonth() + 1; // getMonth() returns 0-11
                const monthMatch = monthFilter ? (eventMonth === parseInt(monthFilter)) : true;
                const sportMatch = sportFilter ? (event.sport === sportFilter) : true;

                return monthMatch && sportMatch;
            });

            this.events = filteredEvents;
        });
    }

    setupAddEventForm(): void {
        const addEventForm = document.getElementById('add-event-form') as HTMLFormElement;
        addEventForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = (document.getElementById('event-name') as HTMLInputElement).value;
            const date = (document.getElementById('event-date') as HTMLInputElement).value;
            const startTime = (document.getElementById('event-start-time') as HTMLInputElement).value;
            const endTime = (document.getElementById('event-end-time') as HTMLInputElement).value;
            const location = (document.getElementById('event-location') as HTMLInputElement).value;
            const sport = (document.getElementById('event-sport') as HTMLSelectElement).value;
            const summary = (document.getElementById('event-summary') as HTMLTextAreaElement).value;

            const newEvent: Event = {
                id: Date.now().toString(),
                name,
                date,
                startTime,
                endTime,
                location,
                sport,
                summary,
                userId: this.userId ? this.userId : '0'
            };
            this.allEvents.push(newEvent);
            this.events.push(newEvent);
            this.userEvents.push(newEvent);

            // Reset form
            addEventForm.reset();
            this.setupToggleAddEventForm();
        });
    }

    setupToggleAddEventForm(): void {
        const showAddEventFormButton = document.getElementById('show-add-event-form')!;
        const addEventContainer = document.querySelector('.add-event-container') as HTMLElement;

        showAddEventFormButton.addEventListener('click', () => {
            addEventContainer.classList.toggle('hidden');
        });
    }

    setupMyEventsButton(): void {
        const myEventsButton = document.getElementById('my-events-button')!;
        myEventsButton.addEventListener('click', () => {
            this.toggleMyEvents();
        });
    }

    toggleMyEvents(): void {
        const myEventsButton = document.getElementById('my-events-button')!;
        if (this.showingMyEvents) {
            this.events = [...this.allEvents];
            myEventsButton.textContent = 'Eventet e mia';
        } else {
            this.events = [...this.userEvents];
            myEventsButton.textContent = 'Gjithë Eventet';
        }
        this.showingMyEvents = !this.showingMyEvents;
    }

    deleteEvent(eventId: string): void {
        if (confirm('A jeni i sigurt që dëshironi të fshini këtë event?')) {
            this.allEvents = this.allEvents.filter(event => event.id !== eventId);
            this.userEvents = this.userEvents.filter(event => event.id !== eventId);
            this.events = this.showingMyEvents ? this.userEvents : this.allEvents;
        }
    }
}
