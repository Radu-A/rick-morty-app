import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  combineLatest,
  tap,
  catchError,
  of,
  startWith,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LocationServer } from '../../services/location.server';
import { SearchInput } from '../../shared/search-input/search-input';
import { LocationCard } from '../../shared/location-card/location-card';
import { ResponseInterface } from '../../models/location.model';
import { StateInterface } from '../../models/state.model';

@Component({
  selector: 'app-locations',
  imports: [AsyncPipe, ReactiveFormsModule, SearchInput, LocationCard],
  templateUrl: './locations.html',
  styleUrl: './locations.css',
})
export class Locations {
  server = inject(LocationServer);
  searchForm = new FormControl('');

  totalPages = 0;

  searchValue$ = new BehaviorSubject<string>('');
  currentPage$ = new BehaviorSubject<number>(1);

  listState$: Observable<StateInterface<ResponseInterface>> = combineLatest([
    this.searchValue$,
    this.currentPage$,
  ]).pipe(
    tap(([name, page]) => console.log(`Initializing search of ${name} at page ${page}`)),
    switchMap(([name, page]) =>
      this.server.getLocations(name, page).pipe(
        tap((response) => (this.totalPages = response.info.pages)),
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
            error: `Error loading location: ${error}`,
          })
        )
      )
    )
  );

  handleSearch(name: string) {
    this.searchValue$.next(name);
    this.currentPage$.next(1);
  }

  handlePrevious() {
    this.currentPage$.next(this.currentPage$.value - 1);
  }

  handleNext() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }
}
