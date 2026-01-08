import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationInterface } from '../../models/location.model';

@Component({
  selector: 'app-location-card',
  imports: [RouterLink],
  templateUrl: './location-card.html',
  styleUrl: './location-card.css',
})
export class LocationCard {
  location = input.required<LocationInterface>();
}
