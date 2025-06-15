import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.4)
  ), url('/assets/images/banner/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const HeroContent = styled(motion.div)`
  color: white;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  .highlight {
    color: ${({ theme }) => theme.colors.primary};
    display: block;
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 400;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    
    .highlight {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }
`;

const HeroButton = styled(motion.a)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing[8]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const HeroImage = styled(motion.div)`
  position: relative;
  
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
`;

const Signature = styled(motion.div)`
  margin: ${({ theme }) => theme.spacing[6]} 0;
  
  img {
    max-width: 200px;
    height: auto;
  }
`;

// Floating shapes for visual appeal
const FloatingShape = styled(motion.div)<{ top?: string; left?: string; right?: string; bottom?: string }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  opacity: 0.1;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  z-index: 1;
`;

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    }
  };

  const shapeAnimation = {
    y: [-20, 20, -20],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <HeroSection>
      {/* Floating shapes */}
      <FloatingShape
        top="10%"
        left="10%"
        animate={shapeAnimation}
      />
      <FloatingShape
        top="20%"
        right="15%"
        animate={{
          ...shapeAnimation,
          transition: { ...shapeAnimation.transition, delay: 2 }
        }}
      />
      <FloatingShape
        bottom="20%"
        left="5%"
        animate={{
          ...shapeAnimation,
          transition: { ...shapeAnimation.transition, delay: 4 }
        }}
      />
      <FloatingShape
        bottom="30%"
        right="10%"
        animate={{
          ...shapeAnimation,
          transition: { ...shapeAnimation.transition, delay: 1 }
        }}
      />
      
      <HeroContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroContent variants={itemVariants}>
          <HeroTitle variants={itemVariants}>
            <span className="highlight">I AM</span>
            Armiyau Yushau
          </HeroTitle>
          
          <Signature variants={itemVariants}>
            <img src="/assets/images/banner/sign.png" alt="Signature" />
          </Signature>
          
          <HeroButton 
            href="#about" 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Career
          </HeroButton>
        </HeroContent>
        
        <HeroImage variants={imageVariants}>
          <img src="/assets/images/banner/banner.png" alt="Armiyau Yushau" />
        </HeroImage>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;

