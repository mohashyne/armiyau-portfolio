import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollButton = styled.button<{ visible: boolean }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing[8]};
  right: ${({ theme }) => theme.spacing[8]};
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  transform: ${({ visible }) => visible ? 'translateY(0)' : 'translateY(100px)'};
  opacity: ${({ visible }) => visible ? 1 : 0};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: ${({ visible }) => visible ? 'translateY(-5px)' : 'translateY(100px)'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    bottom: ${({ theme }) => theme.spacing[6]};
    right: ${({ theme }) => theme.spacing[6]};
    width: 45px;
    height: 45px;
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton
      visible={isVisible}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="fas fa-angle-up" />
    </ScrollButton>
  );
};

export default ScrollToTop;

