import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface EventsProps {
}

export interface EventsState {
}

export default class EventsComponent extends React.Component<EventsProps, EventsState> {
  constructor(props: EventsProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View>
         <Text>Events Component</Text>
      </View>
    );
  }
}
