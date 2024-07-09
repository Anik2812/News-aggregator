import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { FaChartLine, FaNewspaper } from 'react-icons/fa';

const TopicContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  display: flex;
  align-items: center;
  gap: 10px;
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

const TopicStats = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
`;

const RelatedArticles = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 15px;
`;

const ArticleLink = styled.a`
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  &:hover {
    text-decoration: underline;
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
      const response = await axios.get('http://localhost:5000/api/trending_topics', {
        timeout: 10000, // Increase the timeout to 10 seconds
      });
      console.log('Fetched topics:', response.data); // Debug log to inspect API response
      setTopics(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      setError('Failed to fetch trending topics. Please try again later.');
      setLoading(false);
    }
  };

  const getSentimentLabel = (sentiment) => {
    if (sentiment > 0.05) return 'Positive';
    if (sentiment < -0.05) return 'Negative';
    return 'Neutral';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="page-title">Trending Topics</h1>
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
              <TopicTitle>
                <FaChartLine />
                {topic.title}
              </TopicTitle>
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
              <TopicStats>
                Mentions: {topic.mentions} | Sentiment: {
                  topic.sentiment !== undefined && topic.sentiment !== null
                    ? `${getSentimentLabel(topic.sentiment)} (${topic.sentiment.toFixed(2)})`
                    : 'N/A'
                }
              </TopicStats>
              <RelatedArticles>
                {(topic.relatedArticles || []).map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <ArticleLink href={article.url} target="_blank" rel="noopener noreferrer">
                      <FaNewspaper />
                      {article.title}
                    </ArticleLink>
                  </li>
                ))}
              </RelatedArticles>
            </TopicCard>
          ))}
        </AnimatePresence>
      </TopicContainer>
    </div>
  );
}

export default TrendingTopics;
