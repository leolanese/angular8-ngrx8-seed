import * as fromHeroes from './heroes.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface HeroesState {
  FEATURE: fromHeroes.State;
}

export interface State {
  heroes: HeroesState;
}

export const reducers: ActionReducerMap<HeroesState> = {
  FEATURE: fromHeroes.reducer
};
