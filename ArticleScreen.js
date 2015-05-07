/**
 * 文章详情页面
 */
'use strict';
var WEBVIEW_REF = 'webview';
var React = require('react-native');
var HTMLWebView = require('./HTMLWebView');
var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
  PropTypes,
  WebView,
} = React;

var getImageSource = require('./getImageSource');
var getStyleFromScore = require('./getStyleFromScore');
var getTextStripHTML = require('./getTextStripHTML');

var ArticleScreen = React.createClass({
  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Image
            source={getImageSource(this.props.article, '')}
            style={styles.detailsImage}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.contentContainer}>
            <Text style={styles.articleTitle}>{this.props.article.title} {' '}
            <Text style={styles.articleAuth} >{'  by:'}{this.props.article.author.nickname}</Text>
            </Text>
            <View style={styles.separator} />
            <View style={styles.castActor}>
              <Text style={styles.articleDesc} numberOfLines={2}>
                {getTextStripHTML(this.props.article.excerpt)}
              </Text>
            </View>
          </View>
        <View style={styles.separator} />
        <HTMLWebView
            style={{width: 300}}
            html={this.props.article.content}
            makeSafe={true}
            autoHeight={true}  />
        <View style={styles.separator} />
      </ScrollView>
    );
  },
});

var ContentViewer = React.createClass({
  getInitialState: function() {
    return {
      url: '',
      html:'',
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      autoHeight:true,
      contentHeight: 200,
    };
  },
  onContentHeight: function (e) {
    console.log(e.nativeEvent.contentHeight);
    if (e.nativeEvent.contentHeight > 1 ) {
      this.setState({contentHeight:e.nativeEvent.contentHeight});
    }
  },
  goBack: function() {
    this.refs[WEBVIEW_REF].goBack();
  },
  goForward: function() {
    this.refs[WEBVIEW_REF].goForward();
  },
  reload: function() {
    this.refs[WEBVIEW_REF].reload();
  },
  onNavigationStateChange: function(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      html: navState.html,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
    });
  },
  render:function(){
    return (
      <WebView
        ref={WEBVIEW_REF}
        automaticallyAdjustContentInsets={false}
        style={[{height:this.state.contentHeight,width:320}]}
        url={''}
        html={this.props.article.content}
        autoHeight={true}
        makeSafe={true}
        onContentHeight={this.onContentHeight}
        contentContainerStyle={styles.contentContainer}
      />
    );
  }
});

var styles = StyleSheet.create({
  contentContainer: {
    padding: 5,
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom:0,
    marginLeft:0,
    marginRight:0,
    width:320,
  },
  articleAuth:{
    fontSize:14,
    marginTop:5,
    color:'#333333',
    textAlign:'right'    
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '500',
    left:5,
  },
  articleDesc:{
    fontSize:15,
    marginTop:6,
  },
  mainSection: {
    flexDirection: 'row',
    flex:1,
  },
  detailsImage: {
    width: 300,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
  },
  castActor: {
    marginLeft: 2,
  },
});

module.exports = ArticleScreen;
