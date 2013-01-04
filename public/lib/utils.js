define('utils', {
  getValueFromXML: function (node, name) {
    node = node.querySelector(name);

    return node ? node.textContent : '';
  }
});
