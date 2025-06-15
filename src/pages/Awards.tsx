import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AwardsPage = styled.div`
  padding-top: 0;
`;

const HeroSection = styled.section`
  min-height: 60vh;
  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.6)
  ), url('/assets/images/banner/banner-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeroContent = styled(motion.div)`
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: white;
    
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  .breadcrumb {
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[2]};
    align-items: center;
    margin-top: ${({ theme }) => theme.spacing[4]};
    
    li {
      color: rgba(255, 255, 255, 0.8);
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
      
      &:not(:last-child)::after {
        content: '/';
        margin-left: ${({ theme }) => theme.spacing[2]};
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

const AwardsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.grey[50]};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const AwardsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const AwardItem = styled(motion.div)`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing[8]};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows['2xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const AwardThumb = styled.div`
  position: relative;
  
  .thumb {
    width: 120px;
    height: 120px;
    background: ${({ theme }) => theme.colors.grey[100]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    
    img {
      max-width: 80px;
      height: auto;
    }
  }
  
  .count {
    position: absolute;
    top: -10px;
    right: -10px;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    
    span {
      font-size: ${({ theme }) => theme.fontSizes.xs};
      margin-right: 2px;
    }
  }
`;

const AwardContent = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
  
  p {
    color: ${({ theme }) => theme.colors.grey[600]};
    line-height: 1.7;
    margin: 0;
  }
`;

const Pagination = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[12]};
  
  li {
    a, span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: white;
      color: ${({ theme }) => theme.colors.grey[600]};
      text-decoration: none;
      font-weight: 600;
      transition: all ${({ theme }) => theme.transitions.base};
      box-shadow: ${({ theme }) => theme.shadows.sm};
      
      &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
      }
    }
    
    &.active span {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
    
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
`;

const awards = [
  {
    id: 1,
    title: "Katsina United Midfielder of the Season",
    count: "x1",
    image: "/assets/images/award/01.png",
    description: "2024 NPFL Midfielder of the Season - the first homegrown winner in club history. This award recognizes my outstanding performances throughout the 2023-24 season, including 83% pass accuracy (Top 5% in NPFL), 2.3 key passes per game, and helping the team achieve a 15-match unbeaten streak when starting."
  },
  {
    id: 2,
    title: "International Tournament Winner",
    count: "x2",
    image: "/assets/images/award/02.png",
    description: "Gold medals from international youth tournaments in Norway (2023) and Poland International Cup (2023). These victories were crucial stepping stones that caught the attention of national team scouts and established my reputation on the international stage."
  },
  {
    id: 3,
    title: "Man of the Match Awards",
    count: "x7",
    image: "/assets/images/award/03.png",
    description: "NPFL 'Team of the Week' recognition earned seven times during the 2023-24 season. These consistent performances highlight my ability to deliver standout displays against top-level opposition in Nigerian professional football."
  },
  {
    id: 4,
    title: "Most Improved Player",
    count: "x1",
    image: "/assets/images/award/04.png",
    description: "Most Improved Technical Player award from Katsina United coaching staff (2023). This recognition reflects my dedication to continuous development and the 200% increase in goal contributions since my professional debut."
  },
  {
    id: 5,
    title: "Academic-Athlete Balance Award",
    count: "x1",
    image: "/assets/images/award/05.png",
    description: "Received from Katsina State Sports Council (2023) for successfully balancing academic pursuits with professional football commitments, while also dedicating 100+ hours to mentoring young athletes in the community."
  }
];

const Awards: React.FC = () => {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AwardsPage>
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1><span>My</span> Awards</h1>
          <ul className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><span>Awards</span></li>
          </ul>
        </HeroContent>
      </HeroSection>
      
      <AwardsSection ref={ref}>
        <Container>
          <AwardsGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {awards.map((award) => (
              <AwardItem key={award.id} variants={itemVariants}>
                <AwardThumb>
                  <div className="thumb">
                    <img src={award.image} alt={award.title} />
                  </div>
                  <div className="count">
                    <span>x</span> {award.count.replace('x', '')}
                  </div>
                </AwardThumb>
                <AwardContent>
                  <h4>{award.title}</h4>
                  <p>{award.description}</p>
                </AwardContent>
              </AwardItem>
            ))}
          </AwardsGrid>
          
          <Pagination>
            <li className="disabled">
              <span><i className="fas fa-angle-left" /></span>
            </li>
            <li><a href="#0">01</a></li>
            <li className="active"><span>02</span></li>
            <li><a href="#0">03</a></li>
            <li>
              <a href="#0"><i className="fas fa-angle-right" /></a>
            </li>
          </Pagination>
        </Container>
      </AwardsSection>
    </AwardsPage>
  );
};

export default Awards;

