import { Routes } from '@angular/router';
import { Characters } from './pages/characters/characters';
import { Details } from './pages/details/details';
import { Generator } from './pages/generator/generator';

export const AppRoutes: Routes = [
  {
    path: '',
    component: Characters,
    title: 'Characters',
  },
  {
    path: 'details',
    component: Details,
    title: 'Details',
  },
  {
    path: 'generator',
    component: Generator,
    title: 'Generator',
  },
];
