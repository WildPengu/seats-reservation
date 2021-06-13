import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addUserPreferences } from "../store";
import { ReservationStep } from "../types";
import { Button } from "../components/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";

const Container = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  position: absolute;
  inset: 0;
  margin: auto;
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid black;
  -moz-appearance: textfield;

  &:focus {
    outline: none;
  }
`;

interface Props {
  setReservationStep: any;
}

interface OnSubmitData {
  seatsAmount: string,
  seatsTogether: boolean
}

export const FirstStep: FC<Props> = ({ setReservationStep }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, } = useForm();

  const onSubmit = (data: OnSubmitData) => {
    const { seatsAmount, seatsTogether } = data;

    const newReservation = {
      amountOfSeats: parseInt(seatsAmount),
      areSeatsTogether: seatsTogether,
    }

    if(newReservation.amountOfSeats) {
      setReservationStep(ReservationStep.stepTwo);
      dispatch(addUserPreferences(newReservation));
    }
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputsContainer>
        <label>Liczba miejsc:</label>
        <Input type="number" min="1" pattern="^-?[0-9]\d*\.?\d*$" {...register("seatsAmount")}/>
      </InputsContainer>
      <InputsContainer>
        <input type="checkbox" {...register("seatsTogether")}/>
        <div>Czy miejsca mają być obok siebie?</div>
      </InputsContainer>
      <ButtonContainer>
        <Button>Wybierz miejsca</Button>
      </ButtonContainer>
    </Container>
  )
}