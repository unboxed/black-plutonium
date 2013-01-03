define('request', (function () {
  var config = require('config'),
      settings = require('settings');

  return function (endpoint, success) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', config.base_url + endpoint, true);
    xhr.setRequestHeader('X-TrackerToken', settings.get('token'));
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

  function error () {
    alert("It seems we're having trouble getting a response from pivotal tracker.");
  }
}()));
