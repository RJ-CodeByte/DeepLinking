import { NavigationAction } from '@react-navigation/native'

let _navigator;


function setTopLevelNavigator(navigationRef) {
    _navigator = navigationRef
}

function navigate(routeName, params) {
    console.log("routeName", routeName);
    if (routeName == "Profile") {
        _navigator.goBack()
    }
    _navigator.navigate(routeName, params)
    return;
}

function goBack() {
    _navigator.dispatch(NavigationAction.goBack());
}

export default {
    setTopLevelNavigator,
    navigate,
    goBack
}