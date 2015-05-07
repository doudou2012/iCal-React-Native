'use strict';

var React = require('react-native');

var NavBarContent = require('./NavBarContent');

var {
  StyleSheet,
  View
} = React;


var NavBarContainer = React.createClass({
  getInitialState: function() {
    return {
      backButtonOpacity: 0,
      previousRoute: {} 
    };
  },

  componentWillReceiveProps: function(newProps) {
    if (this.props && this.props.currentRoute.index !== newProps.currentRoute.index) {
      this.setState({
        previousRoute: this.props.currentRoute
      });
    }
  },

  goBack: function() {
    this.props.toBack(this.props.navigator);
  },

  goForward: function(route) {
    this.props.toRoute(route, this.props.navigator);
  },

  customAction: function(opts) {
    this.props.customAction(opts);
  },


  render: function() {
    return (
      <View style={[styles.navbarContainer, this.props.style]}>
        <NavBarContent 
          route={this.state.previousRoute} 
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          willDisappear="true" 
        />
        <NavBarContent 
          route={this.props.currentRoute} 
          backButtonComponent={this.props.backButtonComponent}
          rightCorner={this.props.rightCorner}
          titleStyle={this.props.titleStyle}
          goBack={this.goBack}
          goForward={this.goForward}
          customAction={this.customAction}
        />
      </View>
    )
  }
});


var styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: '#5589B7'
  }
});


module.exports = NavBarContainer;
