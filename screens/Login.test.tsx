/* import React from 'react';
import 'react-native';
import renderer, { act } from 'react-test-renderer';
import LoginComponent from './Login';
import { AudaxService } from '../services/AudaxService';
import { getNavigationPropsMock } from '../testHelper/navigationPropsMocks';


jest.mock('../services/AudaxService');


describe('<Login />', () => {

  beforeAll(() => {
    //AudaxService.mockClear();
  })
  it('Clicking login should call api log in function', () => {
    //arrange
    const mockServiceInstance = AudaxService as jest.Mocked<typeof AudaxService>;
    mockServiceInstance.login.mockResolvedValue(true);
    let loginElement = renderer.create(<LoginComponent navigation={getNavigationPropsMock<{}>()} />).root;
    //loginElement.instance.onSubmit()
    const logInButton = loginElement.findByProps({ testID: 'LoginButton' }).instance
    //act
    //This will not fire the onSubmit for two reasons
    //The form validation is not satisfied (membership number required etc.)
    //The Formik events haven't finished firing
    act(() => { logInButton.props.onPress(); });
    expect(mockServiceInstance.login).toHaveBeenCalledTimes(1);
  }

  )
}
)
 */