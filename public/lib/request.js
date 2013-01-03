define('request', (function () {
  // TODO replace TOKEN and project id
  var BASEURL = '/services/v4/projects/68108/stories',
      TOKEN = '87746d69176b5454a4e2f69bfd69594c';

  return function (filter, success, error) {
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
