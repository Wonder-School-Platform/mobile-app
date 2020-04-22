import styled from 'styled-components';

export const Navigation = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  padding:8px;
  elevation:2;
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
export const Header = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  padding:8px;
  elevation:2;
  padding:16px;
  margin-top: -16px;
`
export const HeaderContainer = styled.View`
  flex-direction: column;
  flex:1;
`
export const MenuDate = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:12px;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:18px;
  font-weight: bold;
  margin-bottom:5px;
`
export const Content = styled.Text`
  font-size:18px;
  margin-bottom:13px;
`
export const Note = styled.Text`
  font-size:18px;
`
export const LikesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:16px;
`