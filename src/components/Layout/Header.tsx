import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ scrolled, theme }) => 
    scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => theme.spacing[4]} 0;
  transition: all ${({ theme }) => theme.transitions.base};
  border-bottom: ${({ scrolled, theme }) => 
    scrolled ? `1px solid ${theme.colors.grey[200]}` : 'none'};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  
  img {
    max-height: 40px;
    margin-right: ${({ theme }) => theme.spacing[2]};
  }
`;

const NavMenu = styled.ul<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[8]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing[6]};
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
    transition: transform ${({ theme }) => theme.transitions.base};
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)<{ active: boolean }>`
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.secondary};
  font-weight: ${({ active }) => active ? '600' : '500'};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.base};
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const FollowButton = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
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

const MenuToggle = styled.button`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  padding: ${({ theme }) => theme.spacing[2]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: all ${({ theme }) => theme.transitions.base};
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal - 1};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <HeaderContainer scrolled={scrolled}>
        <Nav>
          <Logo to="/">
            <img src="/assets/images/logo/logo.png" alt="Armiyau Yushau" />
          </Logo>
          
          <NavMenu isOpen={menuOpen}>
            <NavItem>
              <NavLink to="/" active={isActive('/')} onClick={closeMenu}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/blog" active={isActive('/blog')} onClick={closeMenu}>
                Blog
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/awards" active={isActive('/awards')} onClick={closeMenu}>
                Awards
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
                Contact
              </NavLink>
            </NavItem>
            <NavItem>
              <FollowButton href="#0" onClick={closeMenu}>
                Follow Me
              </FollowButton>
            </NavItem>
          </NavMenu>
          
          <MenuToggle onClick={toggleMenu} aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </MenuToggle>
        </Nav>
      </HeaderContainer>
      
      <Overlay isOpen={menuOpen} onClick={closeMenu} />
    </>
  );
};

export default Header;

