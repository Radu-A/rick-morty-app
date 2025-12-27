import { Component, input } from '@angular/core';
import { CharacterInterface } from '../../models/character.model';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  character = input.required<CharacterInterface>();
}
