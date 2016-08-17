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
      superagent.get('http://api.deezer.com/artist/27/albums')
        .set('Content-Type', 'application/json; charset=UTF-8')
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (response.ok) {
              this.setState({
                  loading: false,
                  albums: response.body.data
              });
            }
            else {
              this.setState({
                  loading: false
              });
            }
        })
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