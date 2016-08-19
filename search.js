import React, { Component } from 'react';
import { InteractionManager } from 'react-native'
import { Button,
         Content,
         Container,
         Header,
         Input,
         InputGroup,
         List,
         ListItem,
         Icon,
         Spinner,
         Text,
         Thumbnail,
         Title } from 'native-base';
var superagent = require('superagent');

export default class TrackList extends Component {

    constructor(props) {
      super(props);
      this.state = {
          loading: false,
          results: null
      }
    }

    search(name) {
      if(name.length < 3) {
        return
      }
      superagent.get('http://api.deezer.com/search/artist?q=artist:' + name)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (response.ok) {
              this.setState({
                  loading: false,
                  results: response.body.data
              });
            }
            else {
              this.setState({
                  loading: false
              });
            }
        })
    }

    back() {
      this.props.navigator.pop();
    }

    displayAlbums(artist) {
      var route = {
        scene: 0,
        title: artist.name,
        artistId: artist.id
      }
      this.props.navigator.replacePrevious(route)
      this.back();
    }

    render() {
        if(this.state.loading) {
          return (
            <Container>
                <Header>
                  <Title>search in progress...</Title>
                </Header>
              <Spinner color="#440099"/>
            </Container>
          );
        }
        else {
          return(
            <Container>
                <Header searchBar rounded>
                  <InputGroup borderType="regular">
                      <Icon name="md-search" />
                      <Input placeholder="Artist name" onChangeText={(text) => this.search(text)}/>
                      <Icon name="md-people" />
                  </InputGroup>
                  <Button transparent>
                      Search
                  </Button>
                </Header>
                <Content>
                  <List dataArray={this.state.results}
                        renderRow={(item) =>
                            <ListItem button onPress={()=>this.displayAlbums(item)}>
                                <Thumbnail square size={56} source={{uri: item.picture_small}} />
                                <Text>{item.name}</Text>
                            </ListItem>
                        }>
                  </List>
                </Content>
            </Container>
          );
        }
    }
}