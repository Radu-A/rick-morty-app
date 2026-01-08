import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocationInterface, ResponseInterface } from '../models/location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationServer {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/location/';

  private readonly http = inject(HttpClient);

  getLocations(name: string | null, page: number | null): Observable<ResponseInterface> {
    // Solo añadimos el parámetro si hay texto
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    params = params.set('page', page ?? 1);
    return this.http.get<ResponseInterface>(this.baseUrl, { params });
  }

  getLocationById(id: string): Observable<LocationInterface> {
    return this.http.get<LocationInterface>(`${this.baseUrl}${id}`);
  }
}
