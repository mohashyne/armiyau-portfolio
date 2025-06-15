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
  list-style: none;
  margin: 0;
  padding: 0;
  
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
    z-index: ${({ theme }) => theme.zIndex.modal};
    border-left: 1px solid ${({ theme }) => theme.colors.grey[200]};
    pointer-events: ${({ isOpen }) => isOpen ? 'auto' : 'none'};
  }
`;

const NavItem = styled.li`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    text-align: center;
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.secondary};
  font-weight: ${({ active }) => active ? '600' : '500'};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.base};
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width ${({ theme }) => theme.transitions.base};
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing[4]} ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    text-align: center;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.spacing[1]} 0;
    
    &:hover {
      background: rgba(255, 107, 53, 0.1);
    }
    
    &::after {
      display: none;
    }
  }
`;

const FollowButton = styled.div`
  position: relative;
  display: inline-block;
`;

const FollowButtonTrigger = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const FollowDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: ${({ theme }) => theme.spacing[4]};
  min-width: 200px;
  z-index: ${({ theme }) => theme.zIndex.popover};
  transform: ${({ isOpen }) => isOpen ? 'translateY(8px) scale(1)' : 'translateY(0) scale(0.95)'};
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all ${({ theme }) => theme.transitions.base};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    transform: none;
    opacity: 1;
    visibility: visible;
    box-shadow: none;
    background: transparent;
    padding: ${({ theme }) => theme.spacing[2]} 0;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  .icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    color: white;
    justify-content: center;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const MenuToggle = styled.button<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  padding: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;
  border: none;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
  
  span {
    width: 25px;
    height: 3px;
    background: ${({ theme }) => theme.colors.secondary};
    transition: all ${({ theme }) => theme.transitions.base};
    
    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
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
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [followDropdownOpen, setFollowDropdownOpen] = useState(false);
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
              <NavLink to="/gallery" active={isActive('/gallery')} onClick={closeMenu}>
                Gallery
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/contact" active={isActive('/contact')} onClick={closeMenu}>
                Contact
              </NavLink>
            </NavItem>
            <NavItem>
              <FollowButton>
                <FollowButtonTrigger 
                  onClick={() => setFollowDropdownOpen(!followDropdownOpen)}
                >
                  Follow Me
                  <i className="fas fa-chevron-down" style={{ fontSize: '12px' }} />
                </FollowButtonTrigger>
                <FollowDropdown isOpen={followDropdownOpen}>
                  <SocialLink 
                    href="https://x.com/armiyau" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      setFollowDropdownOpen(false);
                      closeMenu();
                    }}
                  >
                    <div className="icon">
                      <i className="fab fa-x-twitter" />
                    </div>
                    <span>Follow on X</span>
                  </SocialLink>
                  <SocialLink 
                    href="https://instagram.com/armiyau" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      setFollowDropdownOpen(false);
                      closeMenu();
                    }}
                  >
                    <div className="icon">
                      <i className="fab fa-instagram" />
                    </div>
                    <span>Follow on Instagram</span>
                  </SocialLink>
                </FollowDropdown>
              </FollowButton>
            </NavItem>
          </NavMenu>
          
          <MenuToggle isOpen={menuOpen} onClick={toggleMenu} aria-label="Toggle menu">
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

