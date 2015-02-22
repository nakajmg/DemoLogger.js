var replacelog = (el) => {
  console.log = (...args) => {
    var logs = [];
    args.forEach((log) => {
        if (typeof log == 'object') {
          logs.push((JSON && JSON.stringify ? JSON.stringify(log) : log));
        }
        else {
          logs.push(log);
        }
        el.innerHTML += logs.join(' ') + '<br>';
      }
    );
  }
};
