import React from 'react'; 
import renderer, { act } from 'react-test-renderer'; 
import LoginComponent from './Login';
import { AudaxService } from '../services/AudaxService';


jest.mock('../services/AudaxService');

describe('<Login />', () => { 

  beforeAll(()=>{
   // AudaxService.mockClear();
  })
it('Clicking login should call api log in function', () => {
  //arrange
  const mockServiceInstance = AudaxService as jest.Mocked<typeof AudaxService>;
  mockServiceInstance.login.mockResolvedValue(true);

  const mockNavigation = { navigate: jest.fn() };
let loginElement = renderer.create(<LoginComponent navigation={mockNavigation}/>).root;
const logInButton = loginElement.findByProps({testID: 'LoginButton'});

  //act
/*   act(()=>
    {logInButton.props.onPress();}
  ).then(
    data => expect(mockServiceInstance.login).toHaveBeenCalledTimes(1)
  ); */

/*   act(() =>{
    logInButton.props.onPress();
  }).then(()=>{done()}); */

  //act(() =>{fireEvent.press(logInButton);})

  //fireEvent.press(logInButton);
  logInButton.props.onPress();
      //assert
  expect(mockServiceInstance.login).toHaveBeenCalledTimes(1);

  //assert
 // expect(mockServiceInstance.login).toHaveBeenCalledTimes(1);

  //let mockServiceInstance = AudaxService.mock.instances[0];

});

}); 



