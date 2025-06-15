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
    title: "Nigeria U-20 AFCON Bronze Medal",
    count: "x1",
    image: "/assets/images/award/01.png",
    description: "Third Place finish at the Nigeria U-20 African Cup of Nations (2025). This prestigious achievement represents the pinnacle of youth football in Africa, showcasing my ability to perform at the highest international level and contribute to Nigeria's success on the continental stage."
  },
  {
    id: 2,
    title: "Dana Cup Winner (Denmark)",
    count: "x1",
    image: "/assets/images/award/02.png",
    description: "Champion of the prestigious Dana Cup 2024 in Denmark, one of Europe's most competitive youth tournaments. This victory demonstrates my ability to excel in international competition and adapt to different playing styles and conditions."
  },
  {
    id: 3,
    title: "Katsina State FA Cup Winner",
    count: "x1",
    image: "/assets/images/award/03.png",
    description: "Winner of the Katsina State FA Cup (2023/2024 season) with my team. This domestic cup victory highlights my contribution to local football success and my ability to perform in knockout competitions under pressure."
  },
  {
    id: 4,
    title: "Norway Cup Semi-Finalist",
    count: "x1",
    image: "/assets/images/award/04.png",
    description: "Reached the semi-finals of the Norway Cup 2024, one of the world's largest youth football tournaments. This achievement showcases consistent high-level performance in international competition and the ability to compete against the world's best young talents."
  },
  {
    id: 5,
    title: "NPFL Professional Debut",
    count: "x1",
    image: "/assets/images/award/05.png",
    description: "Made my professional debut in the Nigerian Professional Football League (NPFL) in 2023, continuing to date. This milestone marks the beginning of my professional career and represents years of dedication and hard work in youth development."
  },
  {
    id: 6,
    title: "NPFL Youth League Participant",
    count: "x1",
    image: "/assets/images/award/01.png",
    description: "Active participant in the NPFL Youth League 2024, demonstrating consistent performance at the highest level of youth football in Nigeria. This platform has been crucial for my development and transition to professional football."
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

