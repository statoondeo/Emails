import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  target$?: Observable<{ destination: string; email: string }>;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.target$ = this.route.queryParamMap.pipe(
      map((params) => {
        const parameters = params.get('returnUrl');
        console.log(
          'returnUrl',
          params.get('returnUrl') ?? 'emails/inbox',
          'email',
          params.get('email')
        );
        return {
          destination: params.get('returnUrl') ?? 'emails/inbox',
          email: params.get('email') ?? '',
        };
      })
    );
  }
  onConnect(target: string) {
    localStorage.setItem('TokenInfo', 'API_KEY');
    console.log('onConnect=>', target);
    this.router.navigateByUrl(target);
  }
}
