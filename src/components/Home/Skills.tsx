import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsSection = styled.section`
  padding: ${({ theme }) => theme.spacing[24]} 0;
  background: ${({ theme }) => theme.colors.background};
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

const SkillsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
`;

const SkillItem = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const SkillName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  margin: 0;
`;

const SkillPercentage = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const SkillBarBackground = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.grey[200]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const SkillBarFill = styled(motion.div)<{ percentage: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: ${({ percentage }) => percentage}%;
`;

interface Skill {
  name: string;
  percentage: number;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [animatedSkills, setAnimatedSkills] = useState<boolean>(false);

  useEffect(() => {
    if (inView && !animatedSkills) {
      setAnimatedSkills(true);
    }
  }, [inView, animatedSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const skills: Skill[] = [
    { name: "Blocking", percentage: 40 },
    { name: "Passing Accuracy", percentage: 80 },
    { name: "Dribbling Skills", percentage: 67 },
    { name: "Shooting", percentage: 90 }
  ];

  return (
    <SkillsSection id="skills" ref={ref}>
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <span className="shape"><span>My</span></span> Skills
          </SectionTitle>
        </SectionHeader>
        
        <SkillsContainer
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <SkillItem key={index} variants={itemVariants}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillPercentage>{skill.percentage}%</SkillPercentage>
              </SkillHeader>
              <SkillBarBackground>
                <SkillBarFill
                  percentage={skill.percentage}
                  initial={{ width: 0 }}
                  animate={animatedSkills ? { width: `${skill.percentage}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                />
              </SkillBarBackground>
            </SkillItem>
          ))}
        </SkillsContainer>
      </Container>
    </SkillsSection>
  );
};

export default Skills;

