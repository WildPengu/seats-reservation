import { call, put, takeEvery } from 'redux-saga/effects';
import { 
  ACTIONS,
  requestSeatsSucceed,
  requestSeatsFailed,
} from "./actions";
import { Seat } from "../../types";
import { SeatsAPI } from './api';

function* requestSeats() {
  try {
    const response: Array<Seat> = yield call(SeatsAPI.getSeats);
    yield put(requestSeatsSucceed(response));
  } catch(e) {
    yield put(requestSeatsFailed(e));
  }
}

export function* sagas() {
  yield takeEvery(ACTIONS.REQUEST_SEATS, requestSeats);
}