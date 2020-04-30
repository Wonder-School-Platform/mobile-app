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
  background-color: ${props => props.active === true ? ({ theme }) => theme.colors.primaryLighten : 'transparent'};
  border-radius:24px;
  align-items: center;
  justify-content: center;
  height:48px;
  width:48px;
`
export const Day = styled.Text`
  color: #353535;
  font-size: 12px;
`
export const Date = styled.Text`
  color: ${props => props.active === true ? ({ theme }) => theme.colors.primary : '#4a4a4a'};
  font-size: 14px;
  font-weight: ${props => props.active === true ? 'bold' : 'normal'};
`