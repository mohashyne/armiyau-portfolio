import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.9) 0%,
    rgba(30, 41, 59, 0.8) 50%,
    rgba(51, 65, 85, 0.7) 100%
  ), url('/assets/images/banner/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
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
  font-weight: 900;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;

  .highlight {
    background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #ffd700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    text-transform: uppercase;
    letter-spacing: 3px;
    text-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};

    .highlight {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
      letter-spacing: 2px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};

    .highlight {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      letter-spacing: 1px;
    }
  }
`;

const HeroButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing[5]} ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing[8]};
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #f59e0b 0%, #ff6b35 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 107, 53, 0.4);
    border-color: rgba(255, 255, 255, 0.4);

    &::before {
      left: 100%;
    }
  }
`;

const HeroImage = styled(motion.div)`
  position: relative;

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transition: all ${({ theme }) => theme.transitions.base};

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 35px 70px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 215, 0, 0.1));
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    z-index: -1;
    filter: blur(20px);
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
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.3), rgba(255, 215, 0, 0.2));
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
    border-radius: 50%;
  }
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

