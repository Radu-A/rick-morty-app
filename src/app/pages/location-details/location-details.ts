import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, startWith, catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { LocationServer } from '../../services/location.server';
import { StateInterface } from '../../models/state.model';
import { LocationInterface } from '../../models/location.model';

@Component({
  selector: 'app-location-details',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './location-details.html',
  styleUrl: './location-details.css',
})
export class LocationDetails {
  route = inject(ActivatedRoute);
  server = inject(LocationServer);
  locationState$: Observable<StateInterface<LocationInterface>> = this.server
    .getLocationById(this.route.snapshot.params['id'])
    .pipe(
      map((response) => ({
        loading: false,
        data: response,
        error: null,
      })),
      startWith({
        loading: true,
        data: null,
        error: null,
      }),
      catchError((error) =>
        of({
          loading: false,
          data: null,
          error: 'Imposible to find the location in this reality.',
        })
      )
    );
}
