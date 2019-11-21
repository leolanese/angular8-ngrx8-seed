import * as featureSelectors from './heroes.selectors';
import { createSelector } from '@ngrx/store';

export import FEATURE = featureSelectors;

export const selectFeatureState = createSelector(featureSelectors.getNamesState, state => state);
