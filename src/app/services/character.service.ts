import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ResponseInterface, CharacterInterface } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}
  getAllCharacters(): Observable<CharacterInterface[]> {
    return this.http
      .get<ResponseInterface>(this.baseUrl)
      .pipe(map((response: ResponseInterface) => response.results));
  }
}
