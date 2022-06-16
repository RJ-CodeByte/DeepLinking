import { NavigationAction } from '@react-navigation/native'

let _navigator;


function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef
}

function navigate(routeName, params) {
    _navigator.navigate(routeName, params)
    return;
}

function goBack() {
    _navigator.dispatch(NavigationAction.back());
}

export default {
    setTopLevelNavigator,
    navigate,
    goBack
}