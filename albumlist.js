import React, { Component } from 'react';
import { CardItem, List, ListItem, Spinner, Text, Thumbnail } from 'native-base';
var superagent = require('superagent');

export default class AlbumList extends Component {
    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          albums: null
      }
    }

    componentDidMount() {
      this.load();
    }

    load() {
      // show the Spinner during API request execution
      this.setState({
          loading: true
      });

      var self = this;
      return fetch('http://api.deezer.com/artist/27/albums')
          .then((response) => response.json())
          .then((responseJson) => {
              // remove the spinner and display the list of albums
              self.setState({
                  loading: false,
                  albums: responseJson.data
              });
              console.log("Deezer response received")
          })
          .catch((error) => {
              self.setState({
                  loading: false
              });

              console.error(error);
          });
    }

    render() {
        if(this.state.loading) {
          return (
            <Spinner color="#440099"/>
          );
        }
        else {
          return(
            <List dataArray={this.state.albums}
                  renderRow={(item) =>
                      <ListItem>
                          <Thumbnail square size={60} source={{uri: item.cover_small}} />
                          <Text>{item.title}</Text>
                      </ListItem>
                  }>
            </List>
          );
        }
    }
}