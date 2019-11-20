import * as featureSelectors from './heroes.selectors';
import { createSelector } from '@ngrx/store';

export import FEATURE = featureSelectors;

export const selectFeatureState = createSelector(featureSelectors.getHeroesState, state => state);
