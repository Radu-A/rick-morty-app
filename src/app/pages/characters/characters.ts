import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CharacterService } from '../../services/character.service';
import { CharacterCard } from '../../shared/character-card/character-card';

@Component({
  selector: 'app-characters',
  imports: [AsyncPipe, CharacterCard],
  templateUrl: './characters.html',
  styleUrl: './characters.css',
})
export class Characters {
  characterService = inject(CharacterService);
  characterList$ = this.characterService.getAllCharacters();
}
