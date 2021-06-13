import { useState } from 'react';
import './App.css';
import { FirstStep } from "./layouts/FirstStep";
import { StepTwo } from "./layouts/stepTwo/stepTwo";
import { ThirdStep } from "./layouts/ThirdStep";
import { ReservationStep } from "./types";

const App = () => {
  const [reservationStep, setReservationStep] = useState(ReservationStep.stepOne as ReservationStep);

  return (
    <div className="App">
      {reservationStep === ReservationStep.stepOne ? <FirstStep setReservationStep={setReservationStep}/> : null}
      {reservationStep === ReservationStep.stepTwo ? <StepTwo setReservationStep={setReservationStep}/> : null}
      {reservationStep === ReservationStep.stepThree ? <ThirdStep /> : null}
    </div>
  );
}

export default App;
