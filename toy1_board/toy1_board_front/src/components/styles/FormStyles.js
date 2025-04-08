import styled from "styled-components";

export const FormWrapper = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  a {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #0066ff;
    text-align: center;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
`;

export const SuccessMessage = styled.p`
  color: green;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;
