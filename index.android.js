import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import AlbumList from './albumlist';
import TrackList from './tracklist';

class AwesomeNativeBase extends Component {

    renderScene(route, navigator) {
      if (route.scene == 1) {
        return(
          <TrackList title={ route.title } albumId={ route.albumId } navigator={ navigator }/>
        )
      }
      else {
        return(
          <AlbumList title={ route.title } artistId={ route.artistId } navigator={ navigator } />
        )
      }
    }

    render() {

      const routes = [ { scene: 0,
                         title: 'Album List for Daft Punk',
                         artistId: 27
                       }
                      ];
      return (
        <Navigator
          initialRoute={ routes[0] }
          renderScene={ this.renderScene }
        />
      );
    }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
