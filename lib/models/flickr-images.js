'use strict';

import jsonp from 'jsonp-promise';
import qs from 'qs';
// import _ from 'lodash';

export default {
  get: getImage
};

function getImage(tag) {
  const params = {
    format:  'json',
    tagmode: 'all',
    tag:     tag.toLowerCase() || 'untitled'
  };

  return jsonp(
    'http://api.flickr.com/services/feeds/photos_public.gne?' + qs.stringify(params),
    { param: 'jsoncallback' }
  ).promise
   .then(res => res.items[Math.floor(Math.random() * res.items.length)])
   .then(res => res.media.m);
}
