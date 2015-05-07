/**
 * 文章列表
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;
var TimerMixin = require('react-timer-mixin');
var API_URL = 'http://icalendar.bbwc.cn/?json=get_posts&post_type=event';
var ListCell = require('./ListCell');
// var ArticleCell = require('../ArticleCell');
var Detail = require('./Detail');
var fetch = require('fetch');

/**
 * 查询缓存
 * @type {Object}
 */
var resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  totalForQuery: {},
};

var LOADING = {};

var List = React.createClass({
  mixins: [TimerMixin],

  timeoutID: (null: any),
  nextPage: function(article) {
    this.props.toRoute({
      name: '展览日历',
      component: Detail,
      data:article
    });
  },
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

  componentDidMount: function() {
    this.searchArticles('');
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

  searchArticles: function(query: string) {
    this.timeoutID = null;

    this.setState({filter: query});

    var cachedResultsForQuery = resultsCache.dataForQuery[query];
    if (cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          dataSource: this.getDataSource(cachedResultsForQuery),
          isLoading: false
        });
      } else {
        this.setState({isLoading: true});
      }
      return;
    }

    LOADING[query] = true;
    resultsCache.dataForQuery[query] = null;
    this.setState({
      isLoading: true,
      // queryNumber: this.state.queryNumber + 1,
      isLoadingTail: false,
    });

    fetch(this._urlForQueryAndPage(query, 1))
      .then((response) => response.json())
      .catch((error) => {
        LOADING[query] = false;
        resultsCache.dataForQuery[query] = undefined;

        this.setState({
          dataSource: this.getDataSource([]),
          isLoading: false,
        });
      })
      .then((responseData) => {
        LOADING[query] = false;
        resultsCache.totalForQuery[query] = responseData.count;
        resultsCache.dataForQuery[query] = responseData.posts;
        resultsCache.nextPageNumberForQuery[query] = 2;

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoading: false,
          dataSource: this.getDataSource(responseData.posts),
        });
      })
      .done();
  },

  hasMore: function(): boolean {
    var query = this.state.filter;
    if (!query || !resultsCache.dataForQuery[query]) {
      return true;
    }
    return (
      resultsCache.totalForQuery[query] !==
      resultsCache.dataForQuery[query].length
    );
  },

  onEndReached: function() {
    var query = this.state.filter;
    if (!this.hasMore() || this.state.isLoadingTail) {
      // We're already fetching or have all the elements so noop
      return;
    }

    if (LOADING[query]) {
      return;
    }

    LOADING[query] = true;
    this.setState({
      queryNumber: this.state.queryNumber + 1,
      isLoadingTail: true,
    });

    var page = resultsCache.nextPageNumberForQuery[query];
    fetch(this._urlForQueryAndPage(query, page))
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
        LOADING[query] = false;
        this.setState({
          isLoadingTail: false,
        });
      })
      .then((responseData) => {
        var articlesForQuery = resultsCache.dataForQuery[query].slice();

        LOADING[query] = false;
        if (!responseData.posts) {
          resultsCache.totalForQuery[query] = articlesForQuery.length;
        } else {
          for (var i in responseData.posts) {
            articlesForQuery.push(responseData.posts[i]);
          }
          resultsCache.dataForQuery[query] = articlesForQuery;
          resultsCache.nextPageNumberForQuery[query] += 1;
        }

        if (this.state.filter !== query) {
          // do not update state if the query is stale
          return;
        }

        this.setState({
          isLoadingTail: false,
          dataSource: this.getDataSource(resultsCache.dataForQuery[query]),
        });
      })
      .done();
  },

  getDataSource: function(articles: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(articles);
  },

  selectArticle: function(article: Object) {
    this.nextPage(article);
    // this.props.navigator.push({
    //   title: article.title,
    //   component:Detail,
    //   passProps: {article},
    // });
  },

  onSearchChange: function(event: Object) {
    var filter = event.nativeEvent.text.toLowerCase();

    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchArticles(filter), 100);
  },

  renderFooter: function() {
    if (!this.hasMore() || !this.state.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }
    return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
  },

  renderRow: function(article: Object)  {
    return (
      <ListCell
        onSelect={() => this.selectArticle(article)}
        article={article}
        style={styles.container}
      />
    );
  },

  render: function() {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <NoArticles
        filter={this.state.filter}
        isLoading={this.state.isLoading}
      /> :
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
      />;

    return (
      <View style={styles.container}>
        <View style={styles.separator} />
        {content}
      </View>
    );
  },
});

var NoArticles = React.createClass({
  render: function() {
    var text = '';
    if (this.props.filter) {
      text = `No results for “${this.props.filter}”`;
    } else if (!this.props.isLoading) {
      text = 'No articles found';
    }

    return (
      <View style={[styles.container, styles.centerText]}>
        <Text style={styles.noArticlesText}>{text}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  noArticlesText: {
    marginTop: 80,
    color: '#888888',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  spinner: {
    width: 30,
  },
  scrollSpinner: {
    marginVertical: 20,
  },
});

module.exports = List;
