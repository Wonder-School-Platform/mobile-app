import styled from 'styled-components';

export const MainLayout = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex:1 1 100%;
`
export const Container = styled.View`
  padding: 0 24px;
  margin: 24px 0;
  width:100%;
  flex:1 1 100%;
`
export const TextContainer = styled.View`
  flex-direction: row;
  padding: 0 32px;
  margin: 20px 0;
  width:100%;
  align-items: center;
`
export const Paragraph = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Lato-Regular';
  font-size: ${({ theme }) => theme.fontSizes.regular};
  margin-bottom:13px;
  line-height: 26px;
  flex: 1;
`
export const Bold = styled(Paragraph)`
  font-family: 'Lato-Bold';
`
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:18px;
  font-weight: bold;
  font-family: 'Muli-Bold';
  margin-bottom:5px;
`
export const ButtonTitle = styled.Button`
  color: ${({ theme }) => theme.colors.primary};
  font-size:18px;
  font-weight: bold;
  font-family: 'Muli-Bold';
  margin-bottom:5px;
`
export const Content = styled.Text`
  font-size:18px;
  margin-bottom:13px;
  line-height: 26px;
`
export const IconContainer = styled.View`
  align-self: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius:50px;
  justify-content: center;
  height:${props => props.height || "48px"};
  margin-right:12px;
  width: ${props => props.width || "48px"};
`
export const Icon = styled.Image`
  height: 24px;
  width: 24px;
`
export const FeaturedImage = styled.View`
  background: ${props => props.theme.colors.primaryLighten || 'rgb(235, 235, 235)'};
  flex: ${props => props.flexHeight || "0 0 120px"};
  width: 100%;
`
export const MainImg = styled.Image`
  height:100%;
  left:0;
  position: absolute;
  top:0;
  width:100%;
`
export const PostHeader = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px 24px 0 24px;
  padding:8px;
  padding:16px;
  margin-top: -16px;
`
export const PostHeaderContainer = styled.View`
  flex-direction: column;
  flex:1;
`
export const PostDetails = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:12px;
`
export const Note = styled.Text`
  font-size:18px;
`
export const LikesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:16px;
`
export const LikesText = styled.Text`
  font-family: 'Lato-Bold';
  margin-left: 8px;
`
export const Separator = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`
export const ContainerWithBorder = styled.View`
  border-bottom-width:1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-top-width:1px;
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
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom:24px;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`
export const BarContainer = styled.View`
  justify-content: center;
  flex-direction: column;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`