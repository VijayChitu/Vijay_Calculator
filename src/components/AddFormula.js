import React from 'react';
import {View, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import GridView from 'react-native-super-grid';
import { NavigationActions } from 'react-navigation';

var formulaList = [];
var formulaListAdded = [];

export default class AddFormula extends React.Component {

	static navigationOptions = {title: 'Add', headerTitleStyle: {color: '#FFFFFF'},
	headerStyle: {backgroundColor: '#87CEEB'}, headerTintColor: '#FFFFFF'}

	constructor(props)
	{
		super(props);
		formulaList = [];
		formulaListAdded = [];
		formulaListAdded = this.props.navigation.state.params.formulaListAdded;
	}

	// Function to add formula to the list
	addFormula(item) {
		if(formulaListAdded.indexOf(item) == -1)
		{
			formulaListAdded.push(item);
			AsyncStorage.setItem('FormulaAdded', JSON.stringify(formulaListAdded));
			this.props.navigation.dispatch(NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: 'Home' })]
			}));
		}
		else
		{
			alert("Already added");
		}
	}

	componentWillMount() {
		formulaList.push("Sum of two numbers");
		formulaList.push("Difference of two numbers");
		formulaList.push("Product of two numbers");
		formulaList.push("Quotient of two numbers");
		formulaList.push("Log base 10 of a numbers");
		formulaList.push("Square root of a numbers");
		formulaList.push("Composite calculations");

	}

	render(){
		return(
			<View>
				<GridView
					itemDimension={130}
					items={formulaList}
					style={Styles.gridView}
					renderItem={item => (
						<TouchableOpacity onPress={ () => this.addFormula(item)}>
							<View style={Styles.itemContainer}>
								<Text style={Styles.itemName}>{item}</Text>
							</View>
						</TouchableOpacity>	
					)} />
			</View>
	)};
}
