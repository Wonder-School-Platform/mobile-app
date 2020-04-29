import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '../theme/Styles';
import * as Icons from './Icons';
import Theme from '../theme/Theme';

const InfoItem = (props) => {
  const { children } = props;
  return (
    <ListItem>
      <ListText>
        {children}
      </ListText>
      <Icons.ArrowRight fill={Theme.colors.primary} />
    </ListItem>
  );
};

const ListItem = styled.View`
  background-color: #ffffff;
  padding:16px 24px;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`
const ListText = styled(Paragraph)`
  margin-bottom: 0;
`
export default InfoItem;