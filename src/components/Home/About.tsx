import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[16]};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing[12]};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const AboutText = styled(motion.div)`
  .header-para {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.grey[600]};
    margin-bottom: ${({ theme }) => theme.spacing[8]};
  }
`;

const AboutItem = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  
  .icon {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  
  .content {
    flex: 1;
    
    h5 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      margin-bottom: ${({ theme }) => theme.spacing[2]};
      color: ${({ theme }) => theme.colors.secondary};
      
      span {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
    
    p {
      color: ${({ theme }) => theme.colors.grey[600]};
      line-height: 1.6;
      margin-bottom: 0;
    }
    
    ul {
      list-style: none;
      margin: 0;
      
      li {
        padding: ${({ theme }) => theme.spacing[1]} 0;
        color: ${({ theme }) => theme.colors.grey[600]};
      }
    }
  }
`;

const LoadingDots = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin: 0 4px;
  
  .dot {
    width: 6px;
    height: 6px;
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

const AboutImage = styled(motion.div)`
  text-align: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borderRadius['2xl']};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: -1;
  }
`;

const About: React.FC = () => {
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
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="shape"><span>About</span></span> Me
          </SectionTitle>
        </SectionHeader>
        
        <AboutContent
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AboutText variants={itemVariants}>
            <p className="header-para">
              A dedicated 18-year-old football player with a strong team-first mindset. 
              Ambitious, highly coachable, and committed to continuous improvement both on and off the field. 
              Actively contributes to team success through leadership, discipline, and a deep passion for the game.
            </p>
            
            <AboutItem variants={itemVariants}>
              <div className="icon">
                <i className="fas fa-user" />
              </div>
              <div className="content">
                <h5><span>Biography</span></h5>
                <p>
                  18 y/o Katsina United & Nigeria U-20 player. Trophy winner (Norway/Portland), 
                  playmaker, and youth mentor – all about team success.
                </p>
              </div>
            </AboutItem>
            
            <AboutItem variants={itemVariants}>
              <div className="icon">
                <i className="fas fa-chart-bar" />
              </div>
              <div className="content">
                <h5><span>Stats</span></h5>
                <p>
                  Club football:
                  <LoadingDots>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </LoadingDots>
                  matches,
                  <LoadingDots>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </LoadingDots>
                  goals
                </p>
              </div>
            </AboutItem>
            
            <AboutItem variants={itemVariants}>
              <div className="icon">
                <i className="fas fa-futbol" />
              </div>
              <div className="content">
                <h5><span>Clubs</span></h5>
                <ul>
                  <li>Katsina United (2023-2025)</li>
                  <li>Katsina United(Jr) (2020-2023)</li>
                </ul>
              </div>
            </AboutItem>
          </AboutText>
          
          <AboutImage variants={imageVariants}>
            <img src="/assets/images/about/about.png" alt="About Armiyau" />
          </AboutImage>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;

