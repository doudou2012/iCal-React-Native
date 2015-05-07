/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var ArticleList = require('./ArticleList');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  StatusBarIOS,
  Text,
  View,
} = React;
var SearchScreen = require('./SearchScreen');
var List = require('./components/List');
var Router = require('./components/Router');
var Favorite = require('./components/FavoriteList');
var backButton = require('./components/BackButton');
var CateList = require('./components/CateList');
// var Router = require('react-native-router');

var initRoute = {
  name: '展览日历',
  component: List,
};

var favoriteInitRoute = {
  name: '我的收藏',
  component: Favorite
}

var categoryInitRoute = {
  name: '分类',
  component:CateList
}


var iCalendar = React.createClass({
  statics: {
    title: '展览日历',
    description: '展览日历'
  },

  getInitialState: function() {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
    };
  },

  _renderHome:function(){
    return (
      <Router firstRoute={initRoute}  headerStyle={styles.header} />
    );
  },

  _renderFavorite:function(){
    return (
      <Router firstRoute={favoriteInitRoute}  headerStyle={styles.header} />
      );
  },

  _renderCategory:function(){
    return (
      <Router firstRoute={categoryInitRoute}  headerStyle={styles.header} />
      );
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="展览日历"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderHome()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="我的收藏"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === "favorite"}
          onPress={() => {
            this.setState({
              selectedTab: "favorite",
            });
          }}>
          {this._renderFavorite()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="分类"
          selected={this.state.selectedTab === 'category'}
          onPress={() => {
            this.setState({
              selectedTab: 'category',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderCategory()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

// var iCalendar_old = React.createClass({
//   toBack: function(){
//     console.log('ssssss');
//   },
//   render: function() {
//     return (
//       <Router
//         headerStyle={styles.header}
//         firstRoute = {initRoute}
//         backButtonComponent = {backButton}
//         toBack={this.toBack}
//       />
//     );
//   }
// });


var styles = StyleSheet.create({
  header: {
    backgroundColor: 'red'
  },
  container: {
    flex: 1
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('iCalendar', () => iCalendar);

module.exports = iCalendar;