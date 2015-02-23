var replacelog = (el) => {
  var _log = console.log;
  console.log = (...args) => {
    _log.apply(console, args);
    var logs = [];
    for (var i = 0, leng = args.length; i < leng; i++) {
      if (typeof args[i] == 'object') {
        logs.push((JSON && JSON.stringify ? JSON.stringify(args[i]) : args[i]));
      }
      else {
        logs.push(args[i]);
      }
    }
    el.innerHTML += logs.join(' ') + '<br>';
  }
};
