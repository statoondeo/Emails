import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'emails';
  purgeLocalStorage() {
    localStorage.clear();
  }
  isConnected() {
    return localStorage.getItem('TokenInfo');
  }
}
