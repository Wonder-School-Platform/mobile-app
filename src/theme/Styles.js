import styled from 'styled-components';

export const MainLayout = styled.View`
  background: ${({ theme }) => theme.colors.background};
`

export const Paragraph = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.regular};
`

export const Icon = styled.View`
  align-self: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius:24px;
  justify-content: center;
  height:48px;
  margin-right:12px;
  width:48px;
`