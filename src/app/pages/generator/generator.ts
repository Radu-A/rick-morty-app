import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CustomInterface } from '../../models/custom.model';

@Component({
  selector: 'app-generator',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './generator.html',
  styleUrl: './generator.css',
})
export class Generator {
  private readonly charactersSubject$ = new BehaviorSubject<CustomInterface[]>([]);
  readonly characters$ = this.charactersSubject$.asObservable();

  form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    species: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    try {
      const rawData = localStorage.getItem('customList');
      const customList: CustomInterface[] = rawData ? JSON.parse(rawData) : [];
      if (Array.isArray(customList) && customList.length > 0) {
        this.charactersSubject$.next([...customList]);
      }
    } catch (error) {
      console.error(`Error loading data from LocalStorage: ${error}`);
      this.charactersSubject$.next([]);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const newCharacter = this.form.getRawValue();

    const currentList = this.charactersSubject$.value;
    this.charactersSubject$.next([...currentList, newCharacter]);

    localStorage.setItem('customList', JSON.stringify(this.charactersSubject$.value));

    this.form.reset();
  }
}
