// src/components/NewsFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ArticleCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ArticleTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ArticleDescription = styled.p`
  font-size: 14px;
  color: #666;
  flex-grow: 1;
`;

const ArticleLink = styled.a`
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const SentimentIndicator = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  margin-top: 10px;
  background-color: ${props => {
    if (props.sentiment > 0.05) return '#4caf50';
    if (props.sentiment < -0.05) return '#f44336';
    return '#ffeb3b';
  }};
`;

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/articles');
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Latest News</h1>
      <FeedContainer>
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ArticleTitle>{article.title}</ArticleTitle>
            <ArticleDescription>{article.description}</ArticleDescription>
            <ArticleLink href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </ArticleLink>
            <SentimentIndicator sentiment={article.sentiment}>
              {article.sentiment > 0.05 ? 'Positive' : article.sentiment < -0.05 ? 'Negative' : 'Neutral'}
            </SentimentIndicator>
          </ArticleCard>
        ))}
      </FeedContainer>
    </div>
  );
}

export default NewsFeed;