import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  .todos {
    display: grid;
    place-items: center;
    text-transform: uppercase;
  }
`;

export const Button = styled.button`
  background: grey;
  color: white;
  cursor: pointer;
  border: 1px solid grey;
  padding: 0.5rem;
`;
