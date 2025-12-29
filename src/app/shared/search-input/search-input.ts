import { Component, inject, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  outputValue = output<string>();
  searchForm = new FormControl('');
  searchValue$ = this.searchForm.valueChanges.pipe(
    startWith(''),
    debounceTime(1000),
    distinctUntilChanged()
  );
  constructor() {
    this.searchValue$.subscribe((term) => this.outputValue.emit(term ?? ''));
  }
}
