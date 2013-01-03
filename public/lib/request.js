define('request', (function () {
  var config = require('config');

  return function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', config.base_url, true);
    xhr.setRequestHeader('X-TrackerToken', config.token);
    xhr.addEventListener('readystatechange', function () {
      if(xhr.readyState === 4) {
        if (xhr.responseXML) {
          success(xhr.responseXML);
        } else {
          error(xhr);
        }
      }
    });

    xhr.send();
  };
}()));
