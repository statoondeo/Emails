import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { EmailsComponent } from './emails/emails/emails.component';
import { EmailsListComponent } from './emails/emails-list/emails-list.component';
import { EmailsDetailComponent } from './emails/emails-detail/emails-detail.component';
import { EmailsCreationComponent } from './emails/emails-creation/emails-creation.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './user/login/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordConfirmationValidatorDirective } from './user/register/password-confirmation.directive';

const routes: Routes = [
  {
    path: 'account/login',
    component: LoginComponent,
  },
  { path: 'account/register', component: RegisterComponent },
  {
    path: 'emails',
    component: EmailsComponent,
    children: [
      {
        path: 'create',
        component: EmailsCreationComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'read/:id',
        component: EmailsDetailComponent,
        canActivate: [LoginGuard],
      },
      {
        path: ':type',
        component: EmailsListComponent,
        canActivate: [LoginGuard],
      },
    ],
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EmailsComponent,
    EmailsListComponent,
    EmailsDetailComponent,
    EmailsCreationComponent,
    PasswordConfirmationValidatorDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
