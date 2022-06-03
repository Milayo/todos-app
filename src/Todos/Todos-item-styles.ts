import styled from "styled-components";

export const TodoItem = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .icon {
    font-size: 30px;
  }
`;
