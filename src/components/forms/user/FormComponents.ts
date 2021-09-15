import styled from 'styled-components';

export const FormWrapper = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 25rem;
  padding: 1.25rem;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.25rem;
`;

export const Title = styled.h1`
  font-size: 2.75rem;
  font-weight: 700;
  margin: 0;
`;

export const FormInputs = styled.div`
  padding-top: 0.25em;
`;

export const OtherOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 0.5rem;

  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const OptionsTitleContainer = styled.div`
  padding: 1rem;
`;

export const OptionsTitle = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  opacity: 0.75;
  margin: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;

  & > * {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
