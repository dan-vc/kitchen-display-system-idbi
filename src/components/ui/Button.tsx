/* 
  Componente Button

  Este es un componente global para la ui que renderiza un botón con 
  estilos por defecto.
*/

import styled from "styled-components";

export const Button = styled.button`
  font-size: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all ease .3s;

  &:hover {
    background-color: #2563eb;
  }
`;