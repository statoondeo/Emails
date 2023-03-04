import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { FAKE_EMAILS_DATA } from 'src/app/data';
import { Email } from '../types';

@Component({
  selector: 'app-emails-detail',
  templateUrl: './emails-detail.component.html',
  styles: [],
})
export class EmailsDetailComponent {
  email$?: Observable<Email>;
  getBodyParts(body: string) {
    return body.split('\r\n');
  }
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.email$ = this.route.paramMap.pipe(
      filter((paramMap) => paramMap.has('id')),
      map((paramMap) => +paramMap.get('id')!),
      map((id) => FAKE_EMAILS_DATA.find((email) => email.id === +id) as Email)
    );
  }
  deleteEmail() {
    this.router.navigate(['../../inbox'], { relativeTo: this.route });
  }
}
