import { reducer } from './reducer';
import { sagas } from './sagas';
import type { ISagaModule } from 'redux-dynamic-modules-saga';
import type { ReducersMapObject } from 'redux';
import { GetSeatsModuleState } from "../../types";

export const GetSeatsModule: ISagaModule<GetSeatsModuleState> = {
  id: 'seats',
  reducerMap: {
    seats: reducer,
  } as ReducersMapObject<GetSeatsModuleState>,
  sagas: [sagas]
};