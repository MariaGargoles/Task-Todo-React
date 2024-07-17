import styled from "styled-components";

export const Container = styled.section`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const TaskInput = styled.input`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
`;

export const TaskButton = styled.button`
  padding: 0.5rem;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  margin-top: 0.5rem;
  &:hover {
    background-color: #239b56;
  }
`;

export const TaskMainTitle = styled.h2`
  font-family: "Poppins", sans-serif;
`;

export const TaskListItem = styled.li`
  list-style: none;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  background-color: #ffff;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  svg {
    font-size: 1.5em;
  }
`;

export const ItemTitle = styled.h3`
  font-family: "Poppins", sans-serif;
`;

export const ItemText = styled.p`
  font-family: "Poppins", sans-serif;
`;
