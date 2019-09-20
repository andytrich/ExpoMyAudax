import * as React from 'react';
import { Container, Content, Text, Button, View, Spinner, Picker } from 'native-base';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { NavigationInjectedProps } from 'react-navigation';
import { AudaxService } from '../services/apiAudax';
import { CalendarEvent, CalendarEvents } from '../models/calendarEvents';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { eventsFilter } from '../models/eventsFilter';

export interface EventsProps {
}

export interface EventsState {
  events : CalendarEvent[],
  IsLoading : boolean,
  myEventsFilter : eventsFilter
}

export default class EventsComponent extends React.Component<NavigationInjectedProps<{}> & EventsProps, EventsState> {
  constructor(props: NavigationInjectedProps<{}> & EventsProps) {
    super(props);
    this.state = {
      events : new Array<CalendarEvent>(), 
      IsLoading : false,
      myEventsFilter : new eventsFilter()
    };
  }
  async getFilteredEvents(filter : eventsFilter){
    
    try {
      this.setState({IsLoading: true});
      let eventsList = await AudaxService.filteredEvents(filter);
      console.log(eventsList);
      this.setState({events: eventsList.Items});
    } catch (error) {
      
    }
    this.setState({IsLoading: false});
  } 
  async getEvents(){
    
    try {
      this.setState({IsLoading: true});
      let eventsList = await AudaxService.allEvents();
      console.log(eventsList);
      this.setState({events: eventsList.Items});
    } catch (error) {
      
    }
    this.setState({IsLoading: false});
  } 

  public render() {
    let filter = this.state.myEventsFilter;

    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
          <View>
          <Text>Events</Text>
          {/* Distance - drop down */}
          <Picker
  selectedValue={filter.minDistance ? filter.minDistance : 50}
  style={{ height: 50, width: 100 }}
   onValueChange={(itemValue, itemIndex) => {filter.minDistance = itemValue; filter.maxDistance=itemValue; this.setState({myEventsFilter : filter})}}
  >
  <Picker.Item label="50km" value="50" />
  <Picker.Item label="100km" value="100" />
  <Picker.Item label="150km" value="150" />
  <Picker.Item label="200km" value="200" />
  <Picker.Item label="300km" value="300" />
  <Picker.Item label="400km" value="400" />
  <Picker.Item label="600km" value="600" />
  <Picker.Item label="All" value="" />
</Picker>
          {/* <Button style={{width:120, borderRadius:10, justifyContent: 'center'}}  onPress={()=>{this.getEvents();}} ><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Get All Events</Text></Button> */}
          <Button style={{width:120, borderRadius:10, justifyContent: 'center'}}  onPress={()=>{this.getFilteredEvents(filter);}} ><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Get Filtered Events</Text></Button>
          </View>
          <Content>
            {
            this.state.events.map((l, i) => (
            <ListItem key={i} rightTitle={l.AwardDistance+'Km'} title={l.Title} subtitle={l.StartCondition} style={{margin:5, borderRadius:10}}   Component={TouchableScale}
           // friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: [1, 0],
              end: [0.2, 0],
            }}/>
            ))
            } 
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
