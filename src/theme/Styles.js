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
  justify-content: center;
  flex-direction: column;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`