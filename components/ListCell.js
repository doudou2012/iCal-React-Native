/**
 * ListCell
 * 
 */
'use strict';

var React = require('react-native');

var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

var getTextStripHTML = require('../getTextStripHTML');
var getImageSource = require('../getImageSource');

var ListCell  = React.createClass({
	render:function(){
		var item = this.props.article,
			timeStr = '';
		if (this.props.cellType && this.props.cellType == 'favorite') {
			timeStr = item.date;
		}else{
			var startTime = new Date(parseInt(item.custom_fields['wpcf-start-time'])*1000);
			var endTime = new Date(parseInt(item.custom_fields['wpcf-end-time'])*1000);
			var startDateStr = startTime.getFullYear()+'年'+(startTime.getMonth()+1)+'月'+startTime.getDate()+'日';
			var endDateStr = endTime.getFullYear()+'年'+(endTime.getMonth()+1)+'月'+(endTime.getDate())+'日';
			timeStr =  startDateStr + '-' + endDateStr;
		}
		
		return (
			<TouchableHighlight onPress={this.props.onSelect}>
			<View style={styles.contener}>
				<Image 
					style = {styles.medimg}
					resizeMode = {Image.resizeMode.stretch}
					source = {getImageSource(item)}
				/>
				<Text style = {[styles.title,styles.contener]} numberOfLines={2}>
					{getTextStripHTML(item.title)}
				</Text>
				<Text style = {[styles.timeLabel,styles.contener]} numberOfLines={1}>
					{startDateStr + '-' + endDateStr }
				</Text>
				<View style={styles.cellBorder} />
			</View>
			</TouchableHighlight>
		);
	}
});

var styles = StyleSheet.create({
	contener:{
		flex:1,
	},
	title:{
		fontSize:18,
		fontWeight:'500',
		margin:5,
		textAlign:'center',
		marginTop:10,
	},
	timeLabel:{
		fontSize:14,
		margin:5,
		color:'#999999',
		textAlign:'center',
		marginTop:10,
	},
	medimg:{
		width:320,
		height:200,
	},
	cellBorder: {
    	backgroundColor: 'rgba(0, 0, 0, 0.1)',
    	height: 1 / PixelRatio.get(),
    	marginLeft: 4,
  	},
});

module.exports = ListCell;