'use strict';

var React = require('react-native');

var {
  StyleSheet,
  TouchableHighlight,
  Text,
  ListView,
  View,
} = React;


var styles = StyleSheet.create({
  backButton: {
    width: 10,
    height: 17,
    marginLeft: 10, 
    marginTop: 3,
    marginRight: 10
  }
});


var CateList = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
  },
  _urlForQueryAndPage: function(query: string, pageNumber: ?number): string {
    if (query) {
      return (
        API_URL + '&s=' +
        encodeURIComponent(query) + '&paged=' + pageNumber
      );
    } else {
      return (
        API_URL + '&page=' + pageNumber
      );
    }
  },
  fetchtResult:function(query: string){
    
  },
  onEndReached:function(){

  },
  renderRow:function(){

  },
  render:function() {
    return (
      <View style={styles.container}>
        <ListView
          ref="listview"
          dataSource={this.state.dataSource}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          onEndReached={this.onEndReached}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="onDrag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }
}); 


module.exports = CateList;
