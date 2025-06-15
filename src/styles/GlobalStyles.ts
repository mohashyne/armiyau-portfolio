import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.background};
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: ${({ theme }) => theme.fontSizes['2xl']};
    }
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    line-height: 1.7;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.base};

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
    transition: ${({ theme }) => theme.transitions.base};
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing[3]};
    transition: ${({ theme }) => theme.transitions.base};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  ul, ol {
    list-style: none;
  }

  // Custom scrollbar
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accent};
  }


  // Utility classes
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing[4]};

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 ${({ theme }) => theme.spacing[3]};
    }
  }

  .section-padding {
    padding: ${({ theme }) => theme.spacing[24]} 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: ${({ theme }) => theme.spacing[16]} 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .hidden {
    display: none;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default GlobalStyles;

