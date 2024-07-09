import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const getSentimentColor = (sentiment, theme) => {
  if (sentiment > 0.05) return theme.secondaryColor;
  if (sentiment < -0.05) return '#e41c1c';
  return '#f7b731';
};

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
  background-color: ${props => getSentimentColor(props.$sentiment, props.theme)};
`;

const SearchContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
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

const IconButton = styled.button`
  background-color: ${({ theme }) => theme.primaryColor};
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 20px;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  cursor: pointer;
`;

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/articles?category=${selectedCategory}`);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to fetch articles. Please try again later.');
      setLoading(false);
    }
  };

  const filteredArticles = articles
    .filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      } else {
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      }
    });

  const getSentimentLabel = (sentiment) => {
    if (sentiment > 0.05) return 'Positive';
    if (sentiment < -0.05) return 'Negative';
    return 'Neutral';
  };

  return (
    <div>
      <h1 className="page-title">Latest News</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton>
          <FaSearch />
        </IconButton>
      </SearchContainer>
      <FilterContainer>
        <Select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="technology">Technology</option>
          <option value="politics">Politics</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
        </Select>
        <IconButton onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>
          {sortOrder === 'newest' ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </IconButton>
      </FilterContainer>
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
              <SentimentIndicator $sentiment={article.sentiment}>
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
