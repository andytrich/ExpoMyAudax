//import * as React from 'react';
import { Header } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';

//import { Header, Left,  Body, Title, Right } from 'native-base';

export interface HeaderProps {
}

export interface HeaderState {
}

export default class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (<></>);
{/*     <StatusBar bg="#3700B3" barStyle="light-content" />
    <Box safeAreaTop bg="violet.600" />
    <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
      <HStack alignItems="center">
        <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
        <Text color="white" fontSize="20" fontWeight="bold">
          Home
        </Text>
      </HStack>
      <HStack>
        <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
        <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
        <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
      </HStack>
    </HStack> */}
  
  }
}