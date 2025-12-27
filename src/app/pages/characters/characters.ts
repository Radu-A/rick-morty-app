import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { CharacterService } from '../../services/character.service';
import { CharacterCard } from '../../shared/character-card/character-card';
import { CharacterInterface } from '../../models/character.model';

@Component({
  selector: 'app-characters',
  imports: [ReactiveFormsModule, AsyncPipe, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  characterService = inject(CharacterService);
  // characterList$ = this.characterService.getAllCharacters();
  name = new FormControl('');
  characterList$ = this.name.valueChanges.pipe(
    startWith(''),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap((valor) => this.characterService.getAllCharacters(valor))
  );
}
