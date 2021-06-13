import styled from "styled-components";
import { useSelector  } from "react-redux";
import { GetSeatsModuleState } from "../types";

const Container = styled.div`
  padding: 2rem;
`;

const ReservationDetails = styled.p`
  font-size: 1.3rem;
  margin: 0;
`;

const SeatDetails = styled.p`
  font-size: 1.2rem;
  margin: 5px 0;
`;

export const ThirdStep = () => {
  const seats = useSelector((state: GetSeatsModuleState) => state.seats.seats);
  const userReservedSeats = useSelector((state: GetSeatsModuleState) => state.seats.userReservedSeats);

  const seatsInfo = userReservedSeats.map((id: string) => (
    <SeatDetails key={id}>
      - rząd {seats[id].cords.y + 1}, miejsce {seats[id].cords.x + 1} ({id})
    </SeatDetails>
  ));
  return (
    <Container>
      <h2>Twoja rezerwacja przebiegła pomyślnie</h2>
      <ReservationDetails>Wybrałeś miejsca:</ReservationDetails>
      {seatsInfo}
      <h3>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h3>
    </Container>
  )
}
