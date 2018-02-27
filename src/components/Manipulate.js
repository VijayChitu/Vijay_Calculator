import React from 'react';
import {View, Text, TextInput, Button, Keyboard} from 'react-native';
import Styles from '../Styles';

var valueA = '';
var valueB =  '';

export default class Manipulate extends React.Component {

	static navigationOptions = {title: 'Manipulate', headerTitleStyle: {color: '#FFFFFF'},
	headerStyle: {backgroundColor: '#87CEEB'}, headerTintColor: '#FFFFFF'}

	constructor(props)
	{
		super(props);

		this.state={
			result: '',
		};
	}

	// Function to calculate the result for the operation selected
	calculateResult(operand)
	{
		if(operand == '+' || operand == '-' || operand == '*' || operand == '/')
		{
			if((valueA == '' || valueB == '') || (isNaN(valueA) || isNaN(valueB)))
			{
				alert('Enter numeric values');
				return;
			}
		}
		else if(operand == 'Log 10' || operand == 'Square Root')
		{
			if((valueA == '') || (isNaN(valueA)))
			{
				alert('Enter numeric value');
				return;
			}
		}
		else
		{
			if((valueA == ''))
			{
				alert('Enter expression with numeric values');
				return;
			}
		}

		switch(operand) {
			case '+': this.setState({ result :  "Result = " + (parseInt(valueA) + parseInt(valueB)) });
					break;
			case '-': this.setState({ result :  "Result = " + (parseInt(valueA) - parseInt(valueB)) });
					break;
			case '*': this.setState({ result :  "Result = " + (parseInt(valueA) * parseInt(valueB)) });
					break;
			case '/': this.setState({ result :  "Result = " + (parseInt(valueA) / parseInt(valueB)) });
					break;
			case 'Log 10': this.setState({ result :  "Result = " + Math.log10(parseInt(valueA)) });
					break;
			case 'Square Root': this.setState({ result :  "Result = " + Math.sqrt(parseInt(valueA)) });
					break;
			case 'Composite': this.setState({ result: "Result = " + eval(valueA) });
					break;
			default: break;
		}

		Keyboard.dismiss();
	}

	render(){
		var title = this.props.navigation.state.params.title;
		var operand = this.props.navigation.state.params.operand;
		var displayRow = [];

		// Condition to decide whether to display one textbox or two textbox for input
		if(operand == '+' || operand == '-' || operand == '*' || operand == '/')
		{
			displayRow.push(
				<View key={1}>
					<Text style={Styles.textOperand}>{operand}</Text>

					<TextInput 
						style={Styles.textInput}
						placeholder="Enter Value B"
						ref="ValueB"
						returnKeyType='done' 
						onChangeText={(text) => valueB = text}
						onSubmitEditing={(event) => {
							this.calculateResult(operand)
						}}/>
				</View>
			);
		}

		return(
			<View>

				<Text style={Styles.textTitle}>{title}</Text>

				<TextInput 
					placeholder="Enter Value A"
					returnKeyType='next' 
					style={Styles.textInput}
					onChangeText={(text) => valueA = (text)}
					onSubmitEditing={(event) => {
						this.refs.ValueB.focus();
					}} />

				<View>{displayRow}</View>

				<Button title="Calculate" style={Styles.button} onPress={ () => this.calculateResult(operand) } />

				<Text style={Styles.textResult}>{this.state.result}</Text>

			</View>
	)};
}
