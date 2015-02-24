# DemoLogger.js
Replace console.log, console.warn, console.error output to HTML

[demo](https://nakajmg.github.io/DemoLogger.js/dist/)

## usage

load demologger.js

```html
<script src="demologger.js"></script>
```
create `DemoLogger` instance

```js
var demologger = new DemoLogger();
```

use `set` method

```js
demologger.set({
  'function name': function() {
    console.log("log");
  },
  'hoge': hoge
});

function hoge() {
  console.warn("warn");
  console.error("error");
}
```
