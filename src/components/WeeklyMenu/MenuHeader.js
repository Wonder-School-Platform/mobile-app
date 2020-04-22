import React from 'react';
import * as Icons from '../Icons';
import { Icon } from '../../theme/Styles';
import { HeaderContainer, Title, MenuDate, Header } from './Styles';

const MenuHeader = (props) => {
  const { date, title } = props;
  return (
    <Header>
      <Icon>
        <Icons.Food fill='#ff0000' />
      </Icon>
      <HeaderContainer>
        <Title>{title}</Title>
        <MenuDate>Menu for {date}</MenuDate>
      </HeaderContainer>
    </Header>
  );
};

export default MenuHeader;