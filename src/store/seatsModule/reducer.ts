import { ACTIONS } from "./actions";
import { GetSeatsAction } from "./actions";
import { GetSeatsState, } from "../../types";
import { Seat } from "../../types";
import _ from "lodash";

const initialState: GetSeatsState = {
  seats: {},
  userPreferences: {
    amountOfSeats: 0,
    areSeatsTogether: false
  },
  userReservedSeats: [],
}

export const reducer = (
  state: GetSeatsState = initialState, 
  action: GetSeatsAction
): GetSeatsState => {
  switch(action.type) {
    case ACTIONS.REQUEST_SEATS_SUCCEED: {
      return {
        ...state,
        seats: action.payload.reduce((obj: Record<string, Seat>, item: Seat) => ({...obj, [item.id]: item}) ,{})
      };
    }
    case ACTIONS.ADD_USER_PREFERENCES: {
      return {
        ...state,
        userPreferences: action.payload,
      };
    }
    case ACTIONS.ADD_RESERVATION: {
      
      return {
        ...state,
        seats: {
          ...state.seats,
          ..._.keyBy(
            _.map(action.payload, (id: string) => ({
              ...state.seats[id],
              reserved: true
            })
          ), 'id')
        },
        userReservedSeats: action.payload,
      }
    }
    default:
      return state;
  }
}