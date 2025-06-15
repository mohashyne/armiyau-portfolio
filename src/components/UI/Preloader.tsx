import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const PreloaderContainer = styled.div<{ isLoading: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transition: opacity 0.5s ease-in-out;
  
  ${({ isLoading }) => !isLoading && css`
    animation: ${fadeOut} 0.5s ease-in-out forwards;
  `}
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.grey[200]};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoaderText = styled.p`
  margin-top: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.grey[600]};
  font-weight: 500;
`;

const LoaderWrapper = styled.div`
  text-align: center;
`;

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Hide completely after fade animation
      setTimeout(() => setShouldShow(false), 500);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <PreloaderContainer isLoading={isLoading}>
      <LoaderWrapper>
        <Loader />
        <LoaderText>Loading...</LoaderText>
      </LoaderWrapper>
    </PreloaderContainer>
  );
};

export default Preloader;

