import styled from 'styled-components';

export const Navigation = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  padding:8px;
`
export const WeekDay = styled.View`
  background: ${props => props.active === true ? ({ theme }) => theme.colors.primaryLighten : 'transparent'};
  /* border-bottom-color: ${props => props.active === true ? ({ theme }) => theme.colors.primaryLighten : 'transparent'};
  border-bottom-width: 3px; */
  border-radius:24px;
  align-items: center;
  justify-content: center;
  height: ${props => props.height || "52px"};
  width: ${props => props.width || "52px"};
  margin: 10px 0;
  position: relative;
`
export const Day = styled.Text`
  color: ${props => props.active === true ? ({ theme }) => theme.colors.primary : '#4a4a4a'};
  font-weight: ${props => props.active === true ? 'bold' : 'normal'};
`

export const Date = styled.Text`
  color: ${props => props.active === true ? ({ theme }) => theme.colors.primary : '#4a4a4a'};
`