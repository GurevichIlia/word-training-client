import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/reducers';
import { GeneralStateInterface, GENERAL_REDUCER_NODE } from './../reducers/general.reducer';

const featureSelector = createFeatureSelector<AppStateInterface, GeneralStateInterface>(GENERAL_REDUCER_NODE)



