// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import NewsFeed from './components/NewsFeed';
import TrendingTopics from './components/TrendingTopics';
import Footer from './components/Footer';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentContainer = styled.main`
  min-height: calc(100vh - 200px);
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <ContentContainer>
          <Routes>
            <Route exact path="/" component={NewsFeed} />
            <Route path="/trending" component={TrendingTopics} />
          </Routes>
        </ContentContainer>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;