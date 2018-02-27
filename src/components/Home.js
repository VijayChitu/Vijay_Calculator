import React from 'react';
import {View, Text, AsyncStorage, TouchableOpacity, Image, Alert} from 'react-native';
import Styles from '../Styles';
import GridView from 'react-native-super-grid';

var formulaListAdded = ['Add Formula'];

export default class Home extends React.Component {

	static navigationOptions = {title: 'Calculator', headerLeft: null, headerTitleStyle: {color: '#FFFFFF'},
	headerStyle: {backgroundColor: '#87CEEB'}, headerTintColor: '#FFFFFF'}

	constructor(props)
	{
		super(props);

		this.state={
			formulaListState: []
		}
	}

	// Function to render reach item a gridview
	renderRowItem(item)
	{
		var row = [];

		if(item != 'Add Formula')
		{
			row.push(
				<TouchableOpacity key={1} onPress={ () => this.deleteFormula(item)}>
					<Image source={require('../../images/ic_action_delete.png')} style={{height: 20, width: 20}}/>
				</TouchableOpacity>
			);
		}

		return(
			<TouchableOpacity onPress={ () => this.renderNavigation(item)}>
				<View style={Styles.itemContainer}>
					<View style={Styles.eachItem}>
						<Text style={Styles.itemName}>{item}</Text>
					</View>

					<View style={Styles.image}>{row}</View>
				</View>
			</TouchableOpacity>	
		)
	}

	// Function to delete the formula added from the list 
	deleteFormula(item)
	{
		Alert.alert(
			'Confirmation', 
			'Would you like to delete?', 
			[
				{text: 'Cancel'},
				{text: 'Ok', onPress: () => this.confirmDelete(item)}
			]
		)
	}

	// Function to delete the formula after confirmation from the user
	confirmDelete(item)
	{
		formulaListAdded.splice(formulaListAdded.indexOf(item), 1);
		this.setState({formulaListState: formulaListAdded});
		AsyncStorage.setItem('FormulaAdded', JSON.stringify(formulaListAdded));
	}

	// Function to navigate to the screens accroding to the item selected from the gridview
	renderNavigation(item)
	{
		switch(item) {
			case 'Add Formula': this.props.navigation.navigate('AddFormula', {formulaListAdded: formulaListAdded});
								break;
			case 'Sum of two numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: '+'});
										break;
			case 'Difference of two numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: "-"});
											break;
			case 'Product of two numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: "*"});
											break;
			case 'Quotient of two numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: "/"});
											break;
			case 'Log base 10 of a numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: "Log 10"});
											break;
			case 'Square root of a numbers': this.props.navigation.navigate('Manipulate', {title: item, operand: "Square Root"});
											break;
			case 'Composite calculations': this.props.navigation.navigate('Manipulate', {title: item, operand: "Composite"});
											break;
			default: break;					
		}
	}

	componentWillMount() {
		AsyncStorage.getItem('FormulaAdded', (err, result) => {
			if(result != null)
			{
				for(let i = 0; i < JSON.parse(result).length; i++)
				{
					if(formulaListAdded.indexOf(JSON.parse(result)[i]) == -1)
						formulaListAdded.push(JSON.parse(result)[i]);
				}
			}

			this.setState({formulaListState: formulaListAdded});
		});
	}

	render(){
		var row = [];
		return(
			<View>
				<GridView
					itemDimension={130}
					items={this.state.formulaListState}
					style={Styles.gridView}
					renderItem={item => this.renderRowItem(item)} />
			</View>
	)};
}
