import React from 'react';
import {StackNavigator} from 'react-navigation';

import HomeScreen from './components/Home';
import ManipulateScreen from './components/Manipulate';
import AddFormulaScreen from './components/AddFormula';

// Stack Navigator for screen navigations
const MainScreen = StackNavigator({
	Home: {screen: HomeScreen},
	Manipulate: {screen: ManipulateScreen},
	AddFormula: {screen: AddFormulaScreen}
	},{
		initialRouteName: 'Home',
		headerMode: 'screen'
});

export default class Index extends React.Component {
	render(){
		return <MainScreen />
	}
}