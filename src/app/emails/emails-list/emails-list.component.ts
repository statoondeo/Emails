import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { FAKE_EMAILS_DATA } from 'src/app/data';
import { Email } from '../types';

@Component({
  selector: 'app-emails-list',
  templateUrl: './emails-list.component.html',
  styles: [
    `
      tr:hover {
        background-color: #444;
      }
      tr {
        cursor: pointer;
      }
    `,
  ],
})
export class EmailsListComponent implements OnInit {
  emailsAndTitle$?: Observable<{ emails: Email[]; title: string }>;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.emailsAndTitle$ = this.route.paramMap.pipe(
      filter((paramMap) => paramMap.has('type')),
      map((paramMap) => paramMap.get('type')!.toUpperCase()),
      map((type) => {
        return {
          emails: FAKE_EMAILS_DATA.filter(
            (email) => email.status === type
          ) as Email[],
          title:
            type === 'INBOX'
              ? 'Boîte de réception'
              : type === 'SENT'
              ? 'Messages envoyés'
              : 'Corbeille',
        };
      })
    );
  }
  goToEmail(id: number) {
    this.router.navigateByUrl('emails/read/' + id);
  }
}
