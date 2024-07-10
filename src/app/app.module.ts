import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { LogInComponent } from './LogIn/LogIn.component';
import { EventsComponent } from './Events/Events.component';
import { TrainersComponent } from './Trainers/Trainers.component';
import { BlogComponent } from './Blog/Blog.component';
import { AdministrationComponent } from './Administration/Administration.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SignUpComponent,
        LogInComponent,
        EventsComponent,
        TrainersComponent,
        BlogComponent,
        AdministrationComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        FullCalendarModule,
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule

    ],
    providers: [DatePipe],
    bootstrap: [AppComponent] // Do not bootstrap AdministrationComponent here
})
export class AppModule { }
