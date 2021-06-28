import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AppService } from './app.service';
import { Rate } from './app.types';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form" (ngSubmit)="fetch()">
      <input placeholder="Select Currency" formControlName="param" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rate</th>
            <th>Currency</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let x of rates.asObservable() | async">
            <td>{{ x.name }}</td>
            <td>{{ numberFixed(x.rate) }}</td>
            <td>{{ x.currency }}</td>
          </tr>
        </tbody>
      </table>
    </form>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  readonly rates = new BehaviorSubject<Rate[]>([]);
  readonly form = new FormGroup({
    param: new FormControl('USD'),
  });

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.rates.next([]);
    this.appService
      .getRates(this.form.value.param)
      .pipe(first())
      .subscribe((data) => this.rates.next(data));
  }

  numberFixed(num: string) {
    return Number(num).toFixed(2);
  }
}
