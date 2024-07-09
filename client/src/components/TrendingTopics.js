// src/components/TrendingTopics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const TopicContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const TopicCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textColor};
  border-radius: 12px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const TopicTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.primaryColor};
`;

const TopicWord = styled(motion.span)`
  display: inline-block;
  background-color: ${({ theme }) => theme.primaryColor};
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    transform: scale(1.05);
  }
`;

function TrendingTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/trending_topics');
      setTopics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      setError('Failed to fetch trending topics. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trending Topics</h1>
      <TopicContainer>
        <AnimatePresence>
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TopicTitle>Topic {topic.id + 1}</TopicTitle>
              {topic.words.map((word, wordIndex) => (
                <TopicWord
                  key={wordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: wordIndex * 0.1 }}
                >
                  {word}
                </TopicWord>
              ))}
            </TopicCard>
          ))}
        </AnimatePresence>
      </TopicContainer>
    </div>
  );
}

export default TrendingTopics;