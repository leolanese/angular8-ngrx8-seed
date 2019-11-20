import { type } from '../utils/type-cache.util';
import { Action } from '@ngrx/store';
import { Hero } from '../../models/hero.model';
import { AppError } from '../../models/app-error.model';

export class ActionTypes {
  static readonly LOAD = type('[Heroes] Load');
  static readonly LOAD_COMPLETED = type('[Heroes] Load Completed');
  static readonly LOAD_FAILED = type('[Heroes] Load Failed');
  
}

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;
  constructor() {}
}

export class LoadCompletedAction implements Action {
  readonly type = ActionTypes.LOAD_COMPLETED;
  constructor(public payload: Hero[]) {}
}

export class LoadFailedAction implements Action {
  readonly type = ActionTypes.LOAD_FAILED;

  constructor(public payload: Partial<AppError>) {}
}

export type Actions =
  | LoadAction
  | LoadCompletedAction
  | LoadFailedAction;
