import styled from "styled-components";
import Input from "./Input";
import { forwardRef, ReactNode } from "react";
import FileInput from "./FileInput";

export const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  error?: any;
  id?: string;
  label: string;
  children?: ReactNode;
};

export const FormRow = forwardRef<HTMLInputElement, FormRowProps>(
  ({ error, id, label, children, ...rest }, ref) => {
    return (
      <StyledFormRow>
        <Label htmlFor={id}>{label}</Label>
        {!id ? null : id === "image" ? (
          <FileInput type="file" id={id} ref={ref} {...rest} />
        ) : (
          <Input type="text" id={id} ref={ref} {...rest} />
        )}
        {children}
        {error && <Error>{error}</Error>}
      </StyledFormRow>
    );
  }
);
