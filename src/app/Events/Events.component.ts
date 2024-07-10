import { Component, AfterViewInit } from '@angular/core';

interface Event {
    name: string;
    date: string;
    startTime: string; // Start time of the event
    endTime: string; // End time of the event
    location: string;
    sport: string;
    summary: string;
}

@Component({
    selector: 'app-events',
    templateUrl: './Events.component.html',
    styleUrls: ['./Events.component.scss']
})
export class EventsComponent implements AfterViewInit {
    events: Event[] = [];
    allEvents: Event[] = [];
    newEvents: Event[] = [];
    userName: string = 'John Doe'; // Example user name
    showingMyEvents: boolean = false;

    ngAfterViewInit(): void {
        this.loadEvents();
        this.setupFilters();
        this.setupAddEventForm();
        this.setupToggleAddEventForm();
        this.setupMyEventsButton();
    }

    loadEvents(): void {
        // Initial set of events
        this.allEvents = [
            {
                name: 'Football Championship - John Doe',
                date: '2024-06-20',
                startTime: '10:00',
                endTime: '12:00',
                location: 'Stadium A',
                sport: 'Futboll',
                summary: 'The best football teams compete for the championship.'
            },
            {
                name: 'Basketball Tournament',
                date: '2024-07-05',
                startTime: '13:00',
                endTime: '15:00',
                location: 'Arena B',
                sport: 'Basketboll',
                summary: 'Top basketball teams from across the country.'
            },
            {
                name: 'Tennis Open',
                date: '2024-08-15',
                startTime: '09:00',
                endTime: '11:00',
                location: 'Court C',
                sport: 'Tenis',
                summary: 'A thrilling tennis tournament featuring top players.'
            }
        ];

        this.events = [...this.allEvents]; // Copy the initial events to the display array
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

            const newEvent: Event = { name, date, startTime, endTime, location, sport, summary };
            this.allEvents.push(newEvent);
            this.events.push(newEvent);
            this.newEvents.push(newEvent);

            // Reset form
            addEventForm.reset();
            this.toggleAddEventForm();
        });
    }

    setupToggleAddEventForm(): void {
        const showAddEventFormButton = document.getElementById('show-add-event-form')!;
        const closeAddEventFormButton = document.getElementById('close-add-event-form')!;

        showAddEventFormButton.addEventListener('click', () => {
            this.toggleAddEventForm();
        });

        closeAddEventFormButton.addEventListener('click', () => {
            this.toggleAddEventForm();
        });
    }

    toggleAddEventForm(): void {
        const addEventContainer = document.querySelector('.add-event-container') as HTMLElement;
        addEventContainer.classList.toggle('hidden');
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
            this.events = [...this.newEvents];
            myEventsButton.textContent = 'Gjithe Eventet';
        }
        this.showingMyEvents = !this.showingMyEvents;
    }
}
