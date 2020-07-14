import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, TextContainer } from '../theme/Styles';

const NoEvents = ({children}) => {
    return (
        <TextContainer style={styles.container}>
            <Paragraph style={styles.errorMessage}>{children}</Paragraph>
        </TextContainer>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        color: '#7E7E7E',
        fontSize: 22,
        fontFamily: 'Muli-Bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default NoEvents;