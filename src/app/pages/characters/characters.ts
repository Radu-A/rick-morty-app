import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  combineLatest,
  map,
  startWith,
  catchError,
  of,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { CharacterCard } from '../../shared/character-card/character-card';
import { SearchInput } from '../../shared/search-input/search-input';
import { ResponseInterface } from '../../models/character.model';
import { StateInterface } from '../../models/state.model';

@Component({
  selector: 'app-characters',
  imports: [SearchInput, AsyncPipe, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  service = inject(CharacterService);

  private searchSubject$ = new BehaviorSubject<string>('');
  private pageSubject$ = new BehaviorSubject<number>(1);

  currentPage = 1;

  listState$: Observable<StateInterface<ResponseInterface>> = combineLatest([
    this.searchSubject$,
    this.pageSubject$,
  ]).pipe(
    tap(([name, page]) => console.log(`Initializing search of ${name}, at page ${page}`)),
    switchMap(([name, page]) => {
      return this.service.getCharacters(name, page).pipe(
        map((result) => ({
          loading: false,
          data: result,
          error: null,
        })),
        startWith({
          loading: true,
          data: null,
          error: null,
        }),
        catchError((err) =>
          of({ loading: false, data: null, error: 'Something went fucking wrong.' })
        )
      );
    })
  );

  handleSearch(term: string): void {
    this.searchSubject$.next(term);
    this.pageSubject$.next(1);
  }

  handlePrev(): void {
    const currentPage = this.pageSubject$.value;
    this.pageSubject$.next(currentPage - 1);
    this.currentPage = currentPage - 1;
  }

  handleNext(): void {
    const currentPage = this.pageSubject$.value;
    this.pageSubject$.next(currentPage + 1);
    this.currentPage = currentPage + 1;
  }
}
