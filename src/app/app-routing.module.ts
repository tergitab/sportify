import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { LogInComponent } from './LogIn/LogIn.component';
import { SignUpComponent } from './SignUp/SignUp.component';
import { EventsComponent } from './Events/Events.component';
import { BlogComponent } from './Blog/Blog.component';
import { TrainersComponent } from './Trainers/Trainers.component';
import { AdministrationComponent } from './Administration/Administration.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LogInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'events', component: EventsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'trainers', component: TrainersComponent },
    { path: 'administration', component: AdministrationComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent }



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled', // or 'top' or 'disabled'
            anchorScrolling: 'enabled', // enable anchor scrolling
            scrollOffset: [0, 64], // adjust scroll offset as needed
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
