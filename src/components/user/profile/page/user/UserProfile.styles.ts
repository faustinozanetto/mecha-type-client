import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--colors-gray-800);
  border-radius: 25px;
  width: 80%;
  margin-right: 2rem;
  margin-left: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  align-content: center;
  justify-content: center;
  align-items: flex-start;
`;

export const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-content: center;

  justify-content: center;

  background-color: var(--colors-gray-700);
  padding: 2rem;
  border-radius: 30px;
  width: 100%;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const UserDetailsTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const UserDetailsBottom = styled.div``;



export const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  flex: 1;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const UserCountry = styled.h2`
  font-size: 1.35rem;
  font-weight: 500;
  color: #fff;
  opacity: 0.75;
  margin: 0;
`;

export const UserDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  margin: 0;
  color: #fff;
  word-wrap: break-word;
  text-align: flex-start;

  align-content: center;
  justify-content: center;
  align-items: flex-start;

  /* padding: 0.5rem; */
  border-radius: 15px;
`;

export const UserBottomContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-gap: 0.5rem;
  margin: 0 auto;
  transition: grid-template-columns 200ms;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr;
  }

  /* @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  } */

  @media (min-width: 1700px) {
    grid-template-columns: 1fr  1fr;
  }

  width: 100%;
  padding: 1.5rem;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: repeat(1, 1fr);
  grid-gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #2d3748;
  border-radius: 10px;
  justify-content: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatsTitle = styled.h3`
  color: #fff;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 2rem;
`;

export const SocialContainer = styled.div``;

export const SocialTitle = styled.h3`
  color: #fff;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-weight: 600;
  font-size: 2rem;
`;

export const PresetsContainer = styled.div``;

export const PresetsTitle = styled.h3`
  color: #fff;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-weight: 600;
  font-size: 2rem;
`;
