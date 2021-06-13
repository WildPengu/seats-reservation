import type { FSAAuto } from "flux-standard-action";
import {
  UserPreferences,
  Seat
} from "../../types";

export enum ACTIONS {
  REQUEST_SEATS = "REQUEST_SEATS",
  REQUEST_SEATS_SUCCEED = "REQUEST_SEATS_SUCCEED",
  REQUEST_SEATS_FAILED = "REQUEST_SEATS_FAILED",
  ADD_RESERVATION = "ADD_RESERVATION",
  ADD_USER_PREFERENCES = "ADD_USER_PREFERENCES",
}

export type RequestSeats = FSAAuto<
  ACTIONS.REQUEST_SEATS
>;

export type RequestSeatsSucceed = FSAAuto<
  ACTIONS.REQUEST_SEATS_SUCCEED,
  Array<Seat>
>;

export type RequestSeatsFailed = FSAAuto<
  ACTIONS.REQUEST_SEATS_FAILED,
  Error
>;

export type AddReservation = FSAAuto<
  ACTIONS.ADD_RESERVATION,
  any
>;

export type AddUserPreferences = FSAAuto<
  ACTIONS.ADD_USER_PREFERENCES,
  UserPreferences
>;

export const requestSeats = (): RequestSeats => ({
  type: ACTIONS.REQUEST_SEATS
});

export const requestSeatsSucceed = (payload: Array<Seat>): RequestSeatsSucceed => ({
  type: ACTIONS.REQUEST_SEATS_SUCCEED,
  payload,
});

export const requestSeatsFailed = (error: Error): RequestSeatsFailed => ({
  type: ACTIONS.REQUEST_SEATS_FAILED, error: true, payload: error
});

export const addReservation = (payload: Array<string>): AddReservation => ({
  type: ACTIONS.ADD_RESERVATION,
  payload
});

export const addUserPreferences = (payload: UserPreferences): AddUserPreferences => ({
  type: ACTIONS.ADD_USER_PREFERENCES,
  payload
});

export type GetSeatsAction =
  | RequestSeats
  | RequestSeatsSucceed
  | RequestSeatsFailed
  | AddReservation
  | AddUserPreferences;