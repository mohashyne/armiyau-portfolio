import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AchievementSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const AchievementContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const AchievementLeft = styled(motion.div)`
  position: relative;
  
  .bg-image {
    width: 100%;
    height: 500px;
    background: url('/assets/images/award/achivement-bg.jpg');
    background-size: cover;
    background-position: center;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      );
      border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    }
    
    img {
      max-width: 200px;
      height: auto;
      z-index: 2;
      position: relative;
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 2;
  }
`;

const AchievementRight = styled(motion.div)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  .shape {
    position: relative;
    display: inline-block;
    
    span {
      color: ${({ theme }) => theme.colors.primary};
      position: relative;
      z-index: 2;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background: ${({ theme }) => theme.colors.primary};
      opacity: 0.2;
      z-index: 1;
    }
  }
`;

const AchievementText = styled(motion.div)`
  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.grey[600]};
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
`;

const Signature = styled(motion.div)`
  margin: ${({ theme }) => theme.spacing[6]} 0;
  
  img {
    max-width: 150px;
    height: auto;
  }
`;

const CounterWrapper = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  margin: ${({ theme }) => theme.spacing[8]} 0;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const CounterItem = styled.div`
  text-align: center;
  
  .counter-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing[2]};
    
    .title {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary};
      margin: 0;
    }
  }
  
  .subtitle {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.grey[600]};
    font-weight: 600;
    margin: 0;
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    animation: loading 1.4s infinite;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes loading {
    0%, 80%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ReadMoreButton = styled(motion.a)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;


const Achievement: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AchievementSection id="achievement" ref={ref}>
      <Container>
        <AchievementContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AchievementLeft variants={imageVariants}>
            <div className="bg-image">
              <img src="/assets/images/award/trophy-shape.png" alt="Trophy" />
            </div>
          </AchievementLeft>
          
          <AchievementRight variants={itemVariants}>
            <SectionHeader>
              <SectionTitle variants={itemVariants}>
                <span className="shape"><span>My</span></span> Achievement
              </SectionTitle>
            </SectionHeader>
            
            <AchievementText variants={itemVariants}>
              <p>
                As an official player for Katsina United and a member of Nigeria's U-20 national team, 
                I've achieved remarkable milestones including NPFL Youth League 2024 participation, 
                making my NPFL debut in 2023 which continues to date, and contributing to our 
                Katsina State FA Cup victory (2023/2024). My international success includes winning 
                the Dana Cup 2024 in Denmark and reaching the Norway Cup semi-finals in 2024.
              </p>
              <p>
                My national team journey culminated in a third-place finish at the Nigeria U-20 AFCON 2025, 
                representing my country with pride and determination. Beyond competitive success, I've 
                dedicated 100+ hours to mentoring young athletes and received recognition for maintaining 
                academic excellence while pursuing professional football. My journey is defined by a 
                relentless team-first mindset and commitment to continuous growth.
              </p>
            </AchievementText>
            
            <Signature variants={itemVariants}>
              <img src="/assets/images/award/sign.png" alt="Signature" />
            </Signature>
            
            <CounterWrapper variants={itemVariants}>
              <CounterItem>
                <div className="counter-header">
                  <h2 className="title">
                    <LoadingDots>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </LoadingDots>
                  </h2>
                </div>
                <h4 className="subtitle">Matches</h4>
              </CounterItem>
              
              <CounterItem>
                <div className="counter-header">
                  <h2 className="title">
                    <LoadingDots>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </LoadingDots>
                  </h2>
                </div>
                <h4 className="subtitle">Player of Year</h4>
              </CounterItem>
              
              <CounterItem>
                <div className="counter-header">
                  <h2 className="title">
                    <LoadingDots>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </LoadingDots>
                  </h2>
                </div>
                <h4 className="subtitle">Goals</h4>
              </CounterItem>
            </CounterWrapper>
            
            <ReadMoreButton 
              href="#0" 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
            </ReadMoreButton>
          </AchievementRight>
        </AchievementContent>
      </Container>
    </AchievementSection>
  );
};

export default Achievement;

