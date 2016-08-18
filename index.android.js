import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import AlbumList from './albumlist';

class AwesomeNativeBase extends Component {

    renderScene(route, navigator) {
      return(
        <AlbumList title={ route.title } artistId={ route.artistId } />
      )
    }

    render() {
      return (
        <Navigator
          initialRoute={{ title: 'Album List for Daft Punk', artistId:27 }}
          renderScene={ this.renderScene }
        />
      );
    }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
