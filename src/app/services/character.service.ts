import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ResponseInterface, CharacterInterface } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private baseUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  getCharacters(name: string | null, page: number | null): Observable<ResponseInterface> {
    let queryParams = new HttpParams();
    if (name) {
      queryParams = queryParams.set('name', name.toLocaleLowerCase());
    }
    queryParams = queryParams.set('page', page?.toString() ?? '1');
    return this.http.get<ResponseInterface>(this.baseUrl, { params: queryParams });
  }

  getCharacterById(id: string): Observable<CharacterInterface> {
    let queryParams = new HttpParams().set('id', id);
    return this.http.get<CharacterInterface>(`${this.baseUrl}${id}`);
  }
}
