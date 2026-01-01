import { Routes } from '@angular/router';
import { Characters } from './pages/characters/characters';
import { Details } from './pages/details/details';
import { Locations } from './pages/locations/locations';
import { Generator } from './pages/generator/generator';

export const AppRoutes: Routes = [
  {
    path: '',
    component: Characters,
    title: 'Characters',
  },
  {
    path: 'locations',
    component: Locations,
    title: 'Locations',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Details',
  },
  {
    path: 'generator',
    component: Generator,
    title: 'Generator',
  },
];
