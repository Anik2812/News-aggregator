import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px 0;
  margin-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.textColor};
  color: ${({ theme }) => theme.textColor};
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2023 AI News Aggregator. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;