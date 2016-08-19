import React, { Component } from 'react';
import { Button,
         Content,
         Container,
         Header,
         Icon,
         List,
         ListItem,
         Spinner,
         Text,
         Thumbnail,
         Title
       } from 'native-base';
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
      superagent.get('http://api.deezer.com/artist/' + this.props.artistId + '/albums')
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

    // display the track list scene for the given album
    displayTracks(album) {
      var route = {
                    albumId: album.id,
                    title: album.title,
                    scene: 1
                  }
      this.props.navigator.push(route);
    }

    // display the search scene
    displaySearch() {
      var route = {
                    scene: 2
                  }
      this.props.navigator.push(route);
    }

    render() {
        if(this.state.loading) {
          return (
            <Container>
              <Spinner color="#440099"/>
            </Container>
          );
        }
        else {
          return(
            <Container>
                <Header>
                   <Button transparent>
                      <Icon name="md-disc" />
                  </Button>
                   <Title>{this.props.title}</Title>
                   <Button transparent onPress={()=>this.displaySearch()}>
                      <Icon name="md-search" />
                   </Button>
                </Header>
                <Content>
                  <List dataArray={this.state.albums}
                        renderRow={(item) =>
                            <ListItem button onPress={()=>this.displayTracks(item)}>
                                <Thumbnail square size={60} source={{uri: item.cover_small}} />
                                <Text>{item.title}</Text>
                            </ListItem>
                        }>
                  </List>
                </Content>
            </Container>
          );
        }
    }
}