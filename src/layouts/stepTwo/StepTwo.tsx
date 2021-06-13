import { ThemeProvider } from "styled-components";
import { useEffect, useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestSeats, addReservation } from "../../store"
import { Seat, ReservationStep, GetSeatsModuleState } from "../../types";
import { useCallback } from "react";
import { 
  Container,
  SquaresContainer,
  Square,
  InformationsContainer,
  GrayInfoSqaure,
  OrangeInfoSqaure,
  Information,
  InfoSquare,
  SubmitButton,
} from "./styles";

interface Props {
  setReservationStep: any;
}

export const StepTwo: FC<Props> = ({ setReservationStep }) => {
  const dispatch = useDispatch();
  const seats = useSelector((state: GetSeatsModuleState) => state.seats.seats);
  const userPreferences = useSelector((state: GetSeatsModuleState) => state.seats.userPreferences);
  const [reservation, updateReservation] = useState([] as Array<string>);
  const [seatsArray, setSeatsArray] = useState([] as Array<Seat>);

  useEffect(() => {
    dispatch(requestSeats());
  }, [dispatch]);

  const suggestSeats = useCallback((seats: Array<Seat>, seatsTogether: boolean) => {
    let seatsIds = [] as Array<string>;

    if (seatsTogether) {
      for (let importance = 100; importance > 0; importance--) {
        const filteredSeats = seats.filter(seat => seat.importance === importance && !seat.reserved);
        if (filteredSeats.length < userPreferences.amountOfSeats) {
          continue;
        }

        let output = [filteredSeats[0]];

        for (let i = 1; i < filteredSeats.length; i++) {
          if (Math.abs(output[output.length - 1].cords.x - filteredSeats[i].cords.x) === 1) {
            output.push(filteredSeats[i]);
            if (output.length === userPreferences.amountOfSeats) {
              return output.map(seat => seat.id);
            }
          } else {
            output = [filteredSeats[i]];
          }
        }
        break;
      }
    } else {
      seats.forEach((seat) => {
        if (seatsIds.length === userPreferences.amountOfSeats) {
          return seatsIds;
        }
        if (!seat.reserved) {
          seatsIds.push(seat.id);
        }
      })
    }
    
    return seatsIds;
  }, [userPreferences.amountOfSeats]);

  useEffect(() => {
    const array = Object.keys(seats).map(key => (seats[key])) as Array<Seat>;
    array.sort((a: Seat, b: Seat) => (a.importance < b.importance) ? 1 : -1);
    updateReservation(suggestSeats(array, userPreferences.areSeatsTogether));
    setSeatsArray(array);
  }, [seats, userPreferences.areSeatsTogether, suggestSeats ]);

  const addSeat = (seat: Seat) => {
    if (seat.reserved) {
      return;
    }
    const { id } = seat;
    let newReservations = [...reservation, id];
    
    if (reservation.includes(id)) {
      newReservations = newReservations.filter(item => item !== id);
    }

    if (newReservations.length > userPreferences.amountOfSeats) {
      newReservations.shift();
    }

    updateReservation(newReservations);

  };
  
  const saveReservation = (seats: Array<string>) => {
    dispatch(addReservation(seats));
    setReservationStep(ReservationStep.stepThree)
    updateReservation([]);
  };

  const returnSquareColor = (seat: Seat) => {
    if(reservation.includes(seat.id) && !seat.reserved) {
      return "#fc9003";
    }
    if(seat.reserved) {
      return "#5c5c5c";
    }
    return "white";
  }

  const squaresSeats = seatsArray?.map((seat, i) => {
    const {x, y} = seat.cords;
    const squareSize = 75;
    const spaceBetween = 25;

    const theme = {
      bg:  returnSquareColor(seat),
      cursor: seat.reserved ? "auto" : "pointer",
    }

    return (
      <ThemeProvider theme={theme}>
        <Square
          key={seat.id} 
          points={`
            ${x * squareSize + (spaceBetween * (x + 1))} ${y * squareSize + (spaceBetween * (y + 1))}
            ${(x + 1) * squareSize + (spaceBetween * (x + 1))} ${y * squareSize + (spaceBetween * (y + 1))}
            ${(x + 1) * squareSize + ((spaceBetween * (x + 1)))} ${(y + 1) * squareSize + (spaceBetween * (y + 1))}
            ${x * squareSize + (spaceBetween * (x+1))} ${(y + 1) * squareSize + (spaceBetween * (y + 1))}
          `}
          onClick={() => addSeat(seat as Seat)}
        />
      </ThemeProvider>
    )
  })
  
  return (
    <Container>
      <SquaresContainer>
        {squaresSeats}
      </SquaresContainer>
      <InformationsContainer>
        <Information>
          <InfoSquare />
          <div>Miejsce dostępne</div>
        </Information>
        <Information>
          <GrayInfoSqaure />
          <div>Miejsce zarezerwowane</div>
        </Information>
        <Information>
          <OrangeInfoSqaure />
          <div>Twój wybór</div>
        </Information>
        <Information>
          <SubmitButton onClick={() => saveReservation(reservation)}>Rezerwuj</SubmitButton>
        </Information>
      </InformationsContainer>
    </Container>
  )
}