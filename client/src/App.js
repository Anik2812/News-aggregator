import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import TrendingTopics from './components/TrendingTopics';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    transition: all 0.3s ease;
  }
`;

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

const ContentContainer = styled.main`
  min-height: calc(100vh - 200px);
`;

const lightTheme = {
  backgroundColor: '#f0f2f5',
  textColor: '#333',
  cardBackground: '#fff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  primaryColor: '#1877f2',
  secondaryColor: '#42b72a',
};

const darkTheme = {
  backgroundColor: '#18191a',
  textColor: '#e4e6eb',
  cardBackground: '#242526',
  cardShadow: '0 4px 6px rgba(255, 255, 255, 0.1)',
  primaryColor: '#2d88ff',
  secondaryColor: '#45bd62',
};

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/trending" element={<TrendingTopics />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;