/**
 * 
 */
'use strict';

function getImageSource(article: Object, kind: ?string): {uri: ?string} {
  var uri =  article.thumbnail ? article.thumbnail : article.thumbnail_images.medium.url;
  // if (uri && kind) {
  //   uri = uri.replace('tmb', kind);
  // }
  return { uri };
}

module.exports = getImageSource;
