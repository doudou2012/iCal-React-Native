/**
 * 文章Cell
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

var getStyleFromScore = require('./getStyleFromScore');
var getImageSource = require('./getImageSource');
var getTextStripHTML = require('./getTextStripHTML');

var ArticleCell = React.createClass({
  render: function() {
    // var criticsScore = this.props.article.ratings.critics_score;
    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.row}>
            <Image
              source={getImageSource(this.props.article, '')}
              style={[styles.cellImage,{resizeMode: Image.resizeMode.stretch}]}
            />
            <View style={styles.textContainer}>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {this.props.article.title}
              </Text>
              <Text style={styles.articleSubTitle} numberOfLines={3}>
                {getTextStripHTML(this.props.article.excerpt)}
              </Text>
              <Text style={styles.articleAuthor} numberOfLines={1}>
                {this.props.article.author.nickname}
                {' '}&bull;{' '}
                <Text style={styles.articleAuthor}>
                  {this.props.article.date}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  articleTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
  },
  articleSubTitle:{
    flex: 1,
    fontSize: 14,
    marginLeft: 4,
    marginTop:4,
    marginBottom:8,
    color:'#666666',
  },
  articleAuthor: {
    color: '#999999',
    fontSize: 14,
  },
  row: {
    flex:1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    flex:1,
    backgroundColor: '#dddddd',
    height: 120,
    marginRight: 10,
    width: 120,
  },
  atTime:{
    color:'#336699',
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
});

module.exports = ArticleCell;
