import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { MainLayout } from './layout/main-layout/main-layout';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, MainLayout, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rick-morty-app');
}
