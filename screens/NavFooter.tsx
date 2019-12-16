import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default class NavFooter extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'access-point' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'AuthLoading', title: 'Recents', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    AuthLoading: RecentsRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}