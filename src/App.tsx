import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { theme } from './styles/theme';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogSingle from './pages/BlogSingle';
import Awards from './pages/Awards';
import Contact from './pages/Contact';
import ScrollToTop from './components/UI/ScrollToTop';
import Preloader from './components/UI/Preloader';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Preloader />
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogSingle />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
