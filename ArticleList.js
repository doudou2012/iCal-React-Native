/**
 * 文章列表
 * 
*/
'use strict';
var API_URL = 'http://www.goodhunt.net/?json=1';
var React = require('react-native');
var TimerMixin = require('react-timer-mixin');

var fetch = require('fetch');
var AritcelCell = require('./ArticleCell');

var {
	ActivityIndicatorIOS,
  	Image,
  	ListView,
  	TouchableHighlight,
  	StyleSheet,
  	Text,
  	View,
} = React;
var NoReuslt = React.createClass({
  render: function() {
    var text = 'NO data';
    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noReusltText}>{text}</Text>
      </View>
    );
  }
});
var ArticleList = React.createClass({
	mixins: [TimerMixin],
	statics:{
		title:'Article list',
		description:'Article list'
	},
	
	getInitialState:function(){
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
			isLoading: false,
      		isLoadingTail: false,
      		dataSource:ds.cloneWithRows(['']),
      		filter: '',
			currentPage : 1
		};
	},
	//组件加载完成，远程获取数据
	componentDidMount:function(){
		this.fetchRemoteData();	
	},
	getDataSource: function(posts: Array<any>): ListView.DataSource {
    		return this.state.dataSource.cloneWithRows(posts);
  	},
	fetchRemoteData:function(){
		fetch(this.getFecthUrl()).then((response) => response.json())
		.catch((error) => {
			console.warn(error);
  		})
		.then((responseText) => {
			this.setState({isLoading:false,isLoadingTail:true,dataSource:this.state.dataSource.cloneWithRows(this.getDataSource(responseText.posts))});
  		}).done();
	},
	getFecthUrl:function(){
		return API_URL+'&paged='+this.state.currentPage;
	},
	onEndReached:function(){
		console.log('onEndReached!');
		this.setState({
      		currentPage: this.state.currentPage + 1,
      		isLoadingTail: true,
    		});
    		
	},
	renderRows:function(rowData:Object,sectionID: number, rowID: number){
		return (<AritcelCell article={rowData} />);
	},
	renderFooter:function(){
//		if (!this.hasMore() || !this.state.isLoadingTail) {
//    		return <View style={styles.scrollSpinner} />;
//  		}
    		return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
	},
	render:function(){
//		var content = this.state.dataSource.getRowCount() == 0 ?
//    <NoReuslt /> :
//    ;
		return (
			<View style={styles.container} >
				<ListView
       				 	ref="listview"
        					dataSource={this.state.dataSource}
				//      renderFooter={this.renderFooter}
        					renderRow={this.renderRows}
        					onEndReached={this.onEndReached}
        					automaticallyAdjustContentInsets={false}
        					keyboardDismissMode="onDrag"
        					keyboardShouldPersistTaps={true}
        					showsVerticalScrollIndicator={false}
      			/>
			</View>
		);
	}
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  itemWrapper: {
    backgroundColor: '#eaeaea',
  },
  scrollSpinner:{
  	flex:1
  },
  centerText:{
  	textAlign:'center',
  	fontSize:18,
  }
});

module.exports = ArticleList;
