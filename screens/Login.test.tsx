/* import React from 'react'; 
import renderer, { act } from 'react-test-renderer'; 
import LoginComponent from './Login';
import { apiAudax } from '../services/apiAudax';


jest.mock('../services/apiAudax');

describe('<Login />', () => { 

it('Clicking login should call api log in function', (done) => {
  //arrange
 

let x = renderer.create(<LoginComponent/>).root;
const logInButton = x.findByProps({testID: 'LoginButton'});

  //act
  act(() =>{
    logInButton.props.onPress();
  })

  //assert
  expect(1).toBe(1); 
})

}); 



 */