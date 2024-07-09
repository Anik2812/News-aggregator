import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaNewspaper, FaChartLine } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  color: ${({ theme }) => theme.textColor};
`;

const Logo = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${({ theme }) => theme.primaryColor};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    gap: 20px;
  }

  li {
    font-size: 18px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.primaryColor};
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <FaNewspaper />
        AI News Aggregator
      </Logo>
      <Nav>
        <ul>
          <li>
            <Link to="/">
              <FaNewspaper />
              Home
            </Link>
          </li>
          <li>
            <Link to="/trending">
              <FaChartLine />
              Trending Topics
            </Link>
          </li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;