import { NavigationRoute, NavigationScreenProp } from 'react-navigation';

export const getNavigationPropsMock = <S>(getParamMock = jest.fn()): NavigationScreenProp<NavigationRoute<S>> => {
  return {
    addListener: jest.fn(),
    closeDrawer: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dismiss: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    isFocused: jest.fn(),
    isFirstRouteInParent: jest.fn(),
    openDrawer: jest.fn(),
    setParams: jest.fn(),
    state: {} as any,
    toggleDrawer: jest.fn(),
    navigate: jest.fn(),
    getParam: getParamMock,
    push: jest.fn(),
    replace: jest.fn(),
    reset: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
  };
};
