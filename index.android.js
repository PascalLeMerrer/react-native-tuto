import React, { Component } from 'react';
import { AppRegistry, BackAndroid, Navigator } from 'react-native';

import AlbumList from './albumlist';
import TrackList from './tracklist';
import Search from './search';

class AwesomeNativeBase extends Component {

  constructor(props) {
    super(props);
    this.navigator = null;
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  renderScene(route, navigator) {
    this.navigator = navigator;

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
        renderScene={ this.renderScene.bind(this) }
      />);
  }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);

