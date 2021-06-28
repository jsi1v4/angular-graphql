import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { Rate } from './app.types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private apollo: Apollo) {}

  getRates(currency: string) {
    return this.apollo
      .query<{ rates: Rate[] }>({
        query: gql`
          query GetRates {
            rates(currency: "${currency}") {
              name,
              rate,
              currency
            }
          }
        `,
      })
      .pipe(map((res) => res.data.rates));
  }
}
