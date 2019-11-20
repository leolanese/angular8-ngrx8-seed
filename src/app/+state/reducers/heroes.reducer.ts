import * as actions from '../actions/heroes.actions';
import { AppError } from '../../models/app-error.model';
import { Hero } from '../../models/hero.model';

export const HEROES_FEATURE_NAME = 'heroes';

export interface State {
  heroes: Hero[];
  messages: string[];
  loading: boolean;
  loaded: boolean;
  error: AppError;
}

export const initialState: State = {
  heroes: [],
  messages: [],
  loading: false,
  loaded: false,
  error: null
}

export function reducer(state: State = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null
      };
    }

    case actions.ActionTypes.LOAD_COMPLETED: {
      return {
        ...state,
        heroes: action.payload,
        loading: false,
        loaded: true,
        error: null
      };
    }
  }
}

export const isLoading = (state: State) => state.loading;
export const isLoaded = (state: State) => state.loaded;
export const getHeroes = (state: State) => state.heroes;
