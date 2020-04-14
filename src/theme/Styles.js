import styled from 'styled-components';

export const MainLayout = styled.View`
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
`

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.regular};
`