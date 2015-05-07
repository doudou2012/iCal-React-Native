/**
 * 过滤HTML字符串
 */
'use strict';

function getTextStripHTML(text: string): string {
	return text.replace(/<[^>]*>?/g, '');
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp*1000);
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var day = a.getDay();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = year + '-' + month + '-' + day + '' + hour + ':' + min + ':' + sec ;
  return time;
}

module.exports = getTextStripHTML;
