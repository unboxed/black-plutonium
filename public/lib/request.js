define('request', function (endpoint, success) {
  var config = require('config'),
      settings = require('settings'),
      xhr = new XMLHttpRequest();

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

  function error () {
    alert("It seems we're having trouble getting a response from pivotal tracker. Please check that you have entered a valid correct Pivotal API token");
  }
});
