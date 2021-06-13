export enum ReservationStep {
  stepOne = "stepOne",
  stepTwo = "stepTwo",
  stepThree = "stepThree",
}

export interface Seat {
  id: string,
  cords: {
    x: number,
    y: number,
  },
  reserved: boolean,
  importance: number
}

export interface GetSeatsModuleState {
  seats: GetSeatsState
}

export interface GetSeatsState {
  seats: Record<string, Seat>,
  userPreferences: UserPreferences,
  userReservedSeats: Array<string>
}

export interface UserPreferences {
  amountOfSeats: number,
  areSeatsTogether: boolean,
}
