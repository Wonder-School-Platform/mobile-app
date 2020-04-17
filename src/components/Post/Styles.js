import styled from 'styled-components';

export const CardContainer = styled.View`
  background: white;
  border-radius: 10px;
  padding: 16px 0 24px 0;
  justify-content:flex-start;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  elevation: 2;
  margin-bottom: 16px;
`
export const FeaturedImage = styled.Image`
  border-radius:10px;
  height: 212px;
  width:100%;
  margin:-16px 0 32px;
`
export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom:16px;
  min-height: 48px;
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
export const Container = styled.View`
  flex:1 1 auto;
  flex-direction: column;
  justify-content: center;
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.titles};
  flex:1 1 auto;
  flex-wrap: wrap;
  margin-bottom:8px;
`
export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.titles};
  flex:1 1 auto;
  flex-wrap: wrap;
`
export const Location = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.titles};
  flex:1 1 auto;
  flex-wrap: wrap;
`
export const LikesRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top:16px;
`
//Skeleton styles
export const Circle = styled.View`
  background: #d8d8d8;
  border-radius:24px;
  height:48px;
  margin-right:12px;
  width:48px;
`
export const Bar = styled.View`
  background: #d8d8d8;
  border-radius: 5px;
  height: ${props => (props.sizeV ? props.sizeV : '13px')};
  opacity: ${props => (props.opacity ? props.opacity : '1')};
  max-width:${props => (props.sizeH ? props.sizeH : '100%')};
  margin:6px;
`
export const SkeletonHeader = styled.View`
  /* border:1px solid red; */
  flex:1;
  flex-direction: row;
  justify-content: flex-start;
  height: 48px;
  margin-bottom:24px;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`
export const BarContainer = styled.View`
  
  flex:1;
  justify-content: center;
  flex-direction: column;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`