import React, { useState } from 'react';
import { Switch } from 'react-native';
import styled from 'styled-components';
import { Paragraph } from '../theme/Styles';
import Theme from '../theme/Theme';

const SettingsItem = (props) => {
  const { children, selected } = props;
  const [isEnabled, setIsEnabled] = useState(selected);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <ListItem>
      <ListText>
        {children}
      </ListText>
      <Switch
        trackColor={{ false: "#7e7e7e", true: `${Theme.colors.primary}` }}
        thumbColor="#ffffff"
        ios_backgroundColor="#7e7e7e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
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
export default SettingsItem;