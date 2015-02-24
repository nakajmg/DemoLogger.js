var replacelog = (el) => {
  var _log = console.log;
  console.log = (...args) => {
    _log.apply(console, args);
    for (var i = 0, leng = args.length; i < leng; i++) {
      if (typeof args[i] == 'object') {
        el.appendChild(document.createTextNode(JSON.stringify(args[i], null, 2) + '\n'));
      }
      else if (typeof args[i] === 'undefined') {
        el.appendChild(document.createTextNode('undefined \n'));
      }
      else {
        el.appendChild(document.createTextNode(args[i] + '\n'));
      }
    }
  }
};

var replacewarn = (el) => {
  var _warn = console.warn;
  console.warn = (...args) => {
    _warn.apply(console, args);
    var wrap = document.createElement(`${PRE}warn`);
    wrap.style.color = "rgb(245, 228, 38)";
    
    for (var i = 0, leng = args.length; i < leng; i++) {
      if (typeof args[i] == 'object') {
        wrap.appendChild(document.createTextNode(JSON.stringify(args[i], null, 2) + '\n'));
      }
      else if (typeof args[i] === 'undefined') {
        wrap.appendChild(document.createTextNode('undefined \n'));
      }
      else {
        wrap.appendChild(document.createTextNode(args[i] + '\n'));
      }
    }
    
    el.appendChild(wrap);
  }
};

var replaceerror = (el) => {
  var _error = console.error;
  console.error = (...args) => {
    _error.apply(console, args);
    var wrap = document.createElement(`${PRE}warn`);
    wrap.style.color = "rgb(255, 52, 52)";
    
    for (var i = 0, leng = args.length; i < leng; i++) {
      if (typeof args[i] == 'object') {
        wrap.appendChild(document.createTextNode(JSON.stringify(args[i], null, 2) + '\n'));
      }
      else if (typeof args[i] === 'undefined') {
        wrap.appendChild(document.createTextNode('undefined \n'));
      }
      else {
        wrap.appendChild(document.createTextNode(args[i] + '\n'));
      }
    }
    
    el.appendChild(wrap);
  }
};
