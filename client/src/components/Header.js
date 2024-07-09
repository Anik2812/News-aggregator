import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  color: ${({ theme }) => theme.textColor};
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
    &:hover {
      color: #007bff;
    }
  }
`;


function Header() {
  return (
    <HeaderContainer>
      <Logo>AI News Aggregator</Logo>
      <Nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/trending">Trending Topics</Link></li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;