import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Button, Card, CardItem, Content, Container, Footer, Header, Icon, List, ListItem, Spinner, Text, Title } from 'native-base';


class AwesomeNativeBase extends Component {

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
        // Set loading to true when the search starts to display a Spinner
        this.setState({
            loading: true
        });

        var self = this;
        return fetch('http://api.deezer.com/artist/27/albums')
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable albums and set loading to
                // false to remove the spinner and display the list of albums
                self.setState({
                    loading: false,
                    albums: responseJson.data
                });
            })
            .catch((error) => {
                self.setState({
                    loading: false
                });

                console.error(error);
        });
    }

    render() {
        return (
            <Container>
                <Header>
                     <Button transparent>
                        <Icon name="md-menu" />
                     </Button>
                     <Title>Notes</Title>
                </Header>
                <Content>
                  { this.state.loading ? <Spinner color="#440099"/> :
                    <List dataArray={this.state.albums}
                          renderRow={(item) =>
                              <CardItem>
                                  <Text>{item.title}</Text>
                              </CardItem>
                          }>
                    </List>
                  }
                </Content>
                <Footer>
                    <Icon name="md-add-circle" />
                </Footer>
            </Container>
        );
    }
}

AppRegistry.registerComponent('AwesomeNativeBase', () => AwesomeNativeBase);
