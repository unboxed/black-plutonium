define('request', (function () {
  // TODO replace TOKEN and project id
  // var BASEURL = 'http://www.pivotaltracker.com/services/v4/projects/68108/stories',
  var BASEURL = 'sample.xml',
      TOKEN = '';

  return function (success, error) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', BASEURL, true);
    xhr.setRequestHeader('X-TrackerToken', TOKEN);
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
