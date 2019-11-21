import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as actions from '../actions';
import { State } from '../reducers';
import { HeroService } from '../../services/hero.service';

@Injectable({ providedIn: 'root' })
export class HeroesEffects {
  constructor(
    private actions$: Actions,
    private heroService: HeroService,
    private store: Store<State>
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType<actions.FEATURE.LoadAction>(actions.FEATURE.ActionTypes.LOAD),
    map(action => {
      this.heroService.getNames().pipe(
        map(response => {
          return new actions.FEATURE.LoadCompletedAction(response);
        }),
        catchError((error: any) => {
          return of(new actions.FEATURE.LoadFailedAction(error));
        })
      );      
    })
  );
}
