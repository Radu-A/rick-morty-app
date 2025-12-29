import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { CharacterCard } from '../../shared/character-card/character-card';
import { SearchInput } from '../../shared/search-input/search-input';
import { CharacterInterface } from '../../models/character.model';

@Component({
  selector: 'app-characters',
  imports: [SearchInput, AsyncPipe, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  private searchSubject$ = new BehaviorSubject<string>('');
  private pageSubject$ = new BehaviorSubject<number>(1);
  service = inject(CharacterService);

  currentPage = 1;

  characterList$: Observable<CharacterInterface[]> = combineLatest([
    this.searchSubject$,
    this.pageSubject$,
  ]).pipe(
    switchMap(([name, page]) => {
      return this.service.getCharacters(name, page);
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
