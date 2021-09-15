import { Button } from '@components/ui/buttons';
import { Container } from '@components/ui/container/Container';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80vh;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem;
  align-items: center;
  flex-direction: column;
  border-radius: 0.5rem;
  max-width: 32rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  padding-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: #fff;
  text-align: center;
`;

interface NotFoundErrorProps {}

export const NotFoundError: React.FC<NotFoundErrorProps> = ({}) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Container>
        <Content>
          <Title>Error 404</Title>
          <Description>
            The page you requested does not exists! If you think this may be wrong, please contact us as soon as
            possible. Thank you, Mecha Team
          </Description>
          <Button
            backgroundColor="#4338CA"
            hoverBackgroundColor="#3730A3"
            color="#fff"
            size="lg"
            variant="solid"
            margin="1rem 0 0 0"
            onClick={() => router.push('/')}
          >
            Return Home
          </Button>
        </Content>
      </Container>
    </Wrapper>
  );
};
