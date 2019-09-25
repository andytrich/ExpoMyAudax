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
    initalEventFilter.maxDistance = 50;
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
    filter.minDistance = itemValue; 
    filter.maxDistance=itemValue; 
    this.setState({myEventsFilter : filter}); 
    this.getFilteredEvents(filter);
  }


  public render() {
    let filter = this.state.myEventsFilter;

    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <View>
          <Text>Events</Text>
          <Picker selectedValue={filter.minDistance}               
              mode="dropdown"
              iosHeader="Event Distance"
              iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "#007aff", fontSize: 25 }} />}
              style={{ width: undefined }}
              itemStyle={{
                backgroundColor: "#d3d3d3",
                marginLeft: 0,
                paddingLeft: 10
              }}
               onValueChange={(itemValue,
                              onFilterChange)=> {this.onFilterChange(itemValue,filter)}}
          >
            <Picker.Item label="50km" value="50" color={this.gradientCalculator(50)[1]} />
            <Picker.Item label="100km" value="100" color={this.gradientCalculator(100)[1]} />
            <Picker.Item label="150km" value="150" color={this.gradientCalculator(150)[1]} />
            <Picker.Item label="200km" value="200" color={this.gradientCalculator(200)[1]} />
            <Picker.Item label="300km" value="300" color={this.gradientCalculator(300)[1]} />
            <Picker.Item label="400km" value="400" color={this.gradientCalculator(400)[1]} />
            <Picker.Item label="600km" value="600" color={this.gradientCalculator(600)[1]} />
            <Picker.Item label="1000km" value="1000" color={this.gradientCalculator(1000)[1]}/>
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
