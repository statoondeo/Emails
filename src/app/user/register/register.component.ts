import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  subscription = {
    email: '',
    security: {
      password: '',
      confirmation: '',
    },
  };
  constructor(private router: Router) {}
  onSubmit() {
    this.router.navigate(['/emails/inbox'], {
      queryParams: { email: this.subscription.email },
    });
    return false;
  }
}
