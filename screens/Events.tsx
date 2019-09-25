import * as React from 'react';
import { Container, Content, Text, Button, View, Spinner, Picker, Icon } from 'native-base';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { NavigationInjectedProps } from 'react-navigation';
import { AudaxService } from '../services/apiAudax';
import { CalendarEvent } from '../models/calendarEvents';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { eventsFilter } from '../models/eventsFilter';
import { ActivityIndicator, Linking } from 'react-native';

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

    let initalEventFilter = new eventsFilter();
    initalEventFilter.minDistance = 50;
    initalEventFilter.maxDistance = 99;
    this.state = {
      events : new Array<CalendarEvent>(), 
      IsLoading : false,
      myEventsFilter : initalEventFilter
    };
  }

  componentDidMount()
  {
    this.getFilteredEvents(this.state.myEventsFilter);
  }
  async getFilteredEvents(filter : eventsFilter){
    
    try {
      this.setState({IsLoading: true});
      let eventsList = await AudaxService.filteredEvents(filter);
      console.log(eventsList.TotalCount);
      this.setState({events: eventsList.Items});
    } catch (error) {
      this.setState({IsLoading: false});
    }
    this.setState({IsLoading: false});
  } 
  async getAllEvents(){    
    try {
      this.setState({IsLoading: true});
      let eventsList = await AudaxService.allEvents();
      console.log(eventsList);
      this.setState({events: eventsList.Items});
    } catch (error) {      
      this.setState({IsLoading: false});
    }
    this.setState({IsLoading: false});
  } 

  renderSpinner(){
    if(this.state.IsLoading)
    {
      return <ActivityIndicator size="large" color="#f71000" animating={true}/>
    }
  }

  gradientCalculator(distance: number) : Array<string>{
    let result = new Array<string>();
    switch (distance) {
      case 50:
         result = ['#ffffff', '#ff99cc']
        break;
        case 100:
            result = ['#ffffff', '#99ccff']
           break;
        case 150:
              result = ['#ffffff', '#cc99cc']
            break; 
        case 200:
            result = ['#ffffff', '#d83c3d']
          break; 
        case 300:
            result = ['#ffffff', '#ffcc00']
          break;   
        case 400:
            result = ['#ffffff', '#339933']
          break;        
        case 600:
            result = ['#ffffff', '#006699']
          break;        
      default:
          result = ['#ffffff', '#999999'];
        break;
    }
    
    return result;
  }

  onFilterChange(itemValue, filter : eventsFilter)
  {
    filter.minDistance = +itemValue; 
    
    
    switch (filter.minDistance) {
      case 50:
         filter.maxDistance = filter.minDistance+49;
        break;
        case 100:
          filter.maxDistance = filter.minDistance+49;
           break;
        case 150:
          filter.maxDistance = filter.minDistance+49;
            break; 
        case 200:
          filter.maxDistance = filter.minDistance+99;
          break; 
        case 300:
          filter.maxDistance = filter.minDistance+99;
          break;   
        case 400:
          filter.maxDistance = filter.minDistance+99;
          break;        
        case 600:
          filter.maxDistance = filter.minDistance+99;
          break;        
      default:
        filter.maxDistance = filter.minDistance+99;
        break;
    }

    this.setState({myEventsFilter : filter}); 
    this.getFilteredEvents(filter);
  }


  public render() {
    let filter = this.state.myEventsFilter;

    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <View style={{backgroundColor : '#f2f0f0', borderStyle:'solid', borderRadius:10, borderColor:'#999999' }}>
          <Text>Select Distance</Text>
          <Picker selectedValue={filter.minDistance.toString()}                                     
              mode="dropdown"
              iosHeader="Event Distance"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              //style={{ width: undefined, backgroundColor : '#f2f0f0', borderStyle:'solid', borderRadius:10, borderColor:'#999999' }}
              style={{ width: undefined, borderStyle:'solid', borderRadius:10, borderColor:'black' }}
              itemStyle={{
                backgroundColor: "black",
                marginLeft: 0,
                paddingLeft: 10
              }}
               onValueChange={(itemValue,
                              onFilterChange)=> {this.onFilterChange(itemValue,filter)}}
          >
            <Picker.Item label="View all 50km rides" value="50" color={this.gradientCalculator(50)[1]} />
            <Picker.Item label="View all 100km rides" value="100" color={this.gradientCalculator(100)[1]} />
            <Picker.Item label="View all 150km rides" value="150" color={this.gradientCalculator(150)[1]} />
            <Picker.Item label="View all 200km rides" value="200" color={this.gradientCalculator(200)[1]} />
            <Picker.Item label="View all 300km rides" value="300" color={this.gradientCalculator(300)[1]} />
            <Picker.Item label="View all 400km rides" value="400" color={this.gradientCalculator(400)[1]} />
            <Picker.Item label="View all 600km rides" value="600" color={this.gradientCalculator(600)[1]} />
            <Picker.Item label="View all 1000km rides" value="1000" color={this.gradientCalculator(1000)[1]}/>
          </Picker>
        </View>
        <Content>
          {this.renderSpinner()}
          {
          this.state.events.map((l, i) => (
          <ListItem key={i} rightTitle={l.AwardDistance+'Km'} title={l.Title} subtitle={l.StartCondition}
            style={{margin:5, borderRadius:10}} Component={TouchableScale} tension={100} activeScale={0.95}
            linearGradientProps={{
              colors: this.gradientCalculator(l.AwardDistance),
              start: [1, 0],
              end: [0.2, 0],
            }} onPress={ ()=>{ Linking.openURL('https://www.audax.uk/event-details?eventId='+l.Id.toString())}}/>
            ))
            }
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
