import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of, startWith, switchMap, tap, filter, Observable } from 'rxjs';
import { CharacterInterface } from '../../models/character.model';
import { StateInterface } from '../../models/state.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-details',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  private readonly service = inject(CharacterService);
  private readonly route = inject(ActivatedRoute);
  characterState$: Observable<StateInterface<CharacterInterface>> = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => id !== null),
    tap((id) => console.log(`Id validado: ${id}`)),
    switchMap((id) =>
      this.service.getCharacterById(id).pipe(
        map((result) => ({
          loading: false,
          data: result,
          error: null,
        })),
        startWith({
          loading: true,
          data: null,
          error: null,
        }),
        catchError((error) =>
          of({
            loading: false,
            data: null,
            error: 'Character not found in this galaxy.',
          })
        )
      )
    )
  );
}
