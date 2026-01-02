import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterInterface } from '../../models/character.model';

@Component({
  selector: 'app-character-card',
  imports: [RouterLink],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  character = input.required<CharacterInterface>();
}
