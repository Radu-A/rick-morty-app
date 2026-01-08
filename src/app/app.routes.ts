import { Routes } from '@angular/router';
import { Characters } from './pages/characters/characters';
import { Details } from './pages/details/details';
import { Locations } from './pages/locations/locations';
import { LocationDetails } from './pages/location-details/location-details';
import { Generator } from './pages/generator/generator';

export const AppRoutes: Routes = [
  {
    path: '',
    component: Characters,
    title: 'Characters',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Details',
  },
  {
    path: 'locations',
    component: Locations,
    title: 'Locations',
  },
  {
    path: 'location-details/:id',
    component: LocationDetails,
    title: 'Location Details',
  },
  {
    path: 'generator',
    component: Generator,
    title: 'Generator',
  },
];
