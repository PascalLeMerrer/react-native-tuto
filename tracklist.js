import React, { Component } from 'react';
import { InteractionManager } from 'react-native'
import { Button, Content, Container, Header, List, ListItem, Icon, Spinner, Text, Title } from 'native-base';
var superagent = require('superagent');

export default class TrackList extends Component {

    constructor(props) {
      super(props);
      this.state = {
          loading: true,
          tracks: null
      }
    }

    componentDidMount() {
      // delay the loading after the end of the transition
      InteractionManager.runAfterInteractions(() => {
        this.load();
      });
    }

    load() {
      superagent.get('http://api.deezer.com/album/' + this.props.albumId + '/tracks')
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (response.ok) {
              this.setState({
                  loading: false,
                  tracks: response.body.data
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

    render() {
        if(this.state.loading) {
          return (
            <Container>
                <Header>
                   <Button transparent>
                    <Icon name="md-arrow-back"/>
                   </Button>
                   <Title>{this.props.title}</Title>
                </Header>
              <Spinner color="#440099"/>
            </Container>
          );
        }
        else {
          return(
            <Container>
                <Header>
                   <Button transparent onPress={()=>this.back()}>
                    <Icon name="md-arrow-back" />
                   </Button>
                   <Title>{this.props.title}</Title>
                </Header>
                <Content>
                  <List dataArray={this.state.tracks}
                        renderRow={(item) =>
                            <ListItem>
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