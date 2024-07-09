// src/components/TrendingTopics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TopicContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const TopicCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TopicTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const TopicWord = styled.span`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 12px;
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Trending Topics</h1>
      <TopicContainer>
        {topics.map((topic, index) => (
          <TopicCard
            key={topic.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TopicTitle>Topic {topic.id + 1}</TopicTitle>
            {topic.words.map((word, wordIndex) => (
              <TopicWord key={wordIndex}>{word}</TopicWord>
            ))}
          </TopicCard>
        ))}
      </TopicContainer>
    </div>
  );
}

export default TrendingTopics;