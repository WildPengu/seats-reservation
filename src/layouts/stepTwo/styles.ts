import styled from "styled-components";
import { Button } from "../../components/Button";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export const SquaresContainer = styled.svg`
  width: 1100px;
  height: 170vh;
`;

export const Square = styled.polygon`
  stroke: black;
  stroke-width: 1px;
  cursor: pointer;
  fill: ${props => props.theme.bg};
  cursor: ${props => props.theme.cursor};
`;

export const InformationsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
`;

export const Information = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

export const InfoSquare = styled.div`
  width: 75px;
  height: 75px;
  margin-right: 1rem;
  border: 1px solid black;
  background: white;
`;

export const GrayInfoSqaure = styled(InfoSquare)`
  background: #5c5c5c;
`;

export const OrangeInfoSqaure = styled(InfoSquare)`
  background: #fc9003;
`;

export const SubmitButton = styled(Button)`
  height: 100%;
  padding: 0.8rem 6rem;
`;