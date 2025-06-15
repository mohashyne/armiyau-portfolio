import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  ), url('/assets/images/footer-bg.JPG');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: ${({ theme }) => theme.spacing[20]} 0 ${({ theme }) => theme.spacing[8]};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
  text-align: center;
`;

const FooterTop = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const FollowTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  color: white;
`;

const SocialIcons = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[6]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
`;

const SocialIcon = styled.li`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:hover, &.active {
      background: ${({ theme }) => theme.colors.primary};
      transform: translateY(-3px);
    }
  }
`;

const FooterNav = styled.ul`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const FooterNavItem = styled.li`
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.base};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Copyright = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${({ theme }) => theme.spacing[6]};
  color: rgba(255, 255, 255, 0.6);
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    
    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FollowTitle>Follow Me</FollowTitle>
          <SocialIcons>
            <SocialIcon>
              <a href="https://x.com/armiyau" target="_blank" rel="noopener noreferrer" className="active" aria-label="X (Twitter)">
                <i className="fab fa-x-twitter" />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href="https://instagram.com/armiyau" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href="https://linkedin.com/in/armiyau" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href="https://facebook.com/armiyau" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
            </SocialIcon>
          </SocialIcons>
        </FooterTop>
        
        <FooterNav>
          <FooterNavItem>
            <a href="#about" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('about');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#about';
              }
            }}>About Me</a>
          </FooterNavItem>
          <FooterNavItem>
            <a href="#skills" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('skills');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#skills';
              }
            }}>Skills</a>
          </FooterNavItem>
          <FooterNavItem>
            <a href="#achievement" onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('achievement');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#achievement';
              }
            }}>My Achievements</a>
          </FooterNavItem>
          <FooterNavItem>
            <Link to="/blog">Blog</Link>
          </FooterNavItem>
          <FooterNavItem>
            <Link to="/awards">Awards</Link>
          </FooterNavItem>
          <FooterNavItem>
            <Link to="/gallery">Gallery</Link>
          </FooterNavItem>
          <FooterNavItem>
            <Link to="/contact">Contact</Link>
          </FooterNavItem>
        </FooterNav>
        
        <Copyright>
          <p>
            © {currentYear} All Rights Reserved by{' '}
            <a href="https://www.crystalbluetech.com" target="_blank" rel="noopener noreferrer">
              Crystal Blue Tech
            </a>
          </p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

