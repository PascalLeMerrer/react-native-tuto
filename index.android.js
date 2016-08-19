import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import AlbumList from './albumlist';
import TrackList from './tracklist';
import Search from './search';

class AwesomeNativeBase extends Component {


      return false;
    });
  }
  renderScene(route, navigator) {
    var scenes = [
      <AlbumList title={ route.title } artistId={ route.artistId } navigator={ navigator } />,
      <TrackList title={ route.title } albumId={ route.albumId } navigator={ navigator } />,
      <Search navigator={ navigator } />
    ]
    return(scenes[route.scene]);
  }

  render() {
    return (<Navigator
        initialRoute={ { scene: 0 } }
        renderScene={ this.renderScene }
      />);
  }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
