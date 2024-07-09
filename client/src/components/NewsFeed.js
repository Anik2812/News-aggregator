import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ArticleCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textColor};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ArticleTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.primaryColor};
`;

const ArticleDescription = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  flex-grow: 1;
  line-height: 1.5;
`;

const ArticleLink = styled.a`
  color: ${({ theme }) => theme.primaryColor};
  text-decoration: none;
  margin-top: 15px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.secondaryColor};
  }
`;

const SentimentIndicator = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-top: 15px;
  background-color: ${props => {
    if (props.sentiment > 0.05) return props.theme.secondaryColor;
    if (props.sentiment < -0.05) return '#e41c1c';
    return '#f7b731';
  }};
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  font-size: 18px;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textColor};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.primaryColor}40`};
  }
`;

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSentimentLabel = (sentiment) => {
    if (sentiment > 0.05) return 'Positive';
    if (sentiment < -0.05) return 'Negative';
    return 'Neutral';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Latest News</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <FeedContainer>
        <AnimatePresence>
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ArticleTitle>{article.title}</ArticleTitle>
              <ArticleDescription>{article.description}</ArticleDescription>
              <ArticleLink href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </ArticleLink>
              <SentimentIndicator sentiment={article.sentiment}>
                {getSentimentLabel(article.sentiment)}
              </SentimentIndicator>
            </ArticleCard>
          ))}
        </AnimatePresence>
      </FeedContainer>
    </div>
  );
}

export default NewsFeed;