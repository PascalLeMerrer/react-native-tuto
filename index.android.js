import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Button, Content, Container, Footer, Header, Icon, Title } from 'native-base';

import AlbumList from './albumlist';
import TrackList from './tracklist';

class AwesomeNativeBase extends Component {

    render() {
        return (
            <Container>
                <Header>
                   <Title>Albums</Title>
                </Header>
                <Content>
                  <AlbumList />
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
