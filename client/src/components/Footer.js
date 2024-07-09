import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.textColor};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.textColor};
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2023 AI News Aggregator. All rights reserved.</p>
      <SocialLinks>
        <SocialLink href="https://github.com/Anik2812" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialLink>
        <SocialLink href="https://linkedin.com/Anik2812" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </SocialLink>
      </SocialLinks>
    </FooterContainer>
  );
}

export default Footer;