import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InformationSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing[16]} 0;
  margin-top: -103px;
  position: relative;
  z-index: 10;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const InformationCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[8]};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const IconWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  
  .main-icon {
    width: 80px;
    height: 80px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  .bg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.1;
    z-index: 1;
  }
`;

const CardTitle = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-weight: 600;
`;

const CardInfo = styled.span`
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: 500;
`;

const Information: React.FC = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const informationData = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Place of Birth",
      info: "Katsina, Nigeria"
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Date of Birth",
      info: "18th Oct 2006"
    },
    {
      icon: "fas fa-weight",
      title: "Weight",
      info: "55kg / 5500000 cg"
    },
    {
      icon: "fas fa-ruler-vertical",
      title: "Height",
      info: "174cm / 68.5039 inch"
    }
  ];

  return (
    <InformationSection ref={ref}>
      <Container>
        <InformationGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {informationData.map((item, index) => (
            <InformationCard
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <IconWrapper>
                <div className="bg-icon" />
                <div className="main-icon">
                  <i className={item.icon} />
                </div>
              </IconWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardInfo>{item.info}</CardInfo>
            </InformationCard>
          ))}
        </InformationGrid>
      </Container>
    </InformationSection>
  );
};

export default Information;

