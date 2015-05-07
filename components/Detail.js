'use strict';
var WEBVIEW_REF = 'webview';
var React = require('react-native');
var {
  ActivityIndicatorIOS,
  StyleSheet,
  WebView,
} = React;
var TimerMixin = require('react-timer-mixin');

var Detail = React.createClass({

	/*初始化*/
	getInitialState: function() {
    	return {
      		status: 'No Page Loaded',
      		loading: true,
      	}
    },
    render:function(){
    	return (
    		<WebView
    			ref={WEBVIEW_REF}
    			automaticallyAdjustContentInsets={true}
    			url={this.props.data.url}
    			startInLoadingState={true}
    		/>
    	);
    }
});

module.exports = Detail;