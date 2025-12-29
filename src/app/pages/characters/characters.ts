import { Component, inject } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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
  service = inject(CharacterService);
  private searchSubject$ = new BehaviorSubject<string>('');
  characterList$: Observable<CharacterInterface[]> = this.searchSubject$.pipe(
    switchMap((term) => this.service.getAllCharacters(term))
  );
  handleSearch(term: string): void {
    this.searchSubject$.next(term);
  }
}
