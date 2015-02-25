# DemoLogger.js
Interrupt console.log, console.warn, console.error output to HTML

[demo](https://nakajmg.github.io/DemoLogger.js/dist/)

## usage

load demologger.js

```html
<script src="demologger.js"></script>
```
create `DemoLogger` instance then use `set` method pass `function name` & `function`

```js
var demologger = new DemoLogger();

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

# config & options

`new DemoLogger([,config ,options])`

## config

### log, warn, error

enable/disable option.

```js
{
  log:   false,   // default: true
  warn:  false,   // default: true
  error: false,  // default: true
}
```

### color

change font color.

```js
{
  color: {
    log:   '',                  // default: ''
    warn:  'rgb(245, 228, 38)', // default: 'rgb(245, 228, 38)'
    error: 'rgb(255, 52, 52)'   // default: 'rgb(255, 52, 52)'
  }
}
```

### output

change output element

```js
{
  output: document.querySelector('#app') // default: dl-console
}
```

### logging

disable output to HTML

```js
{
  logging: false, // default: true
}
```

## options

### mount

change append target from `body`

```js
{
  mount: '#app' // default: document.body
}
```

### func

initilize instance with set function

```js
{
  'func': {
    'log': function() {
      console.log(data);
    },
    'warn': function() {
      console.warn(data);
    },
    'erro': function() {
      console.error(data);
    }
  }
}
```

## example

```js
var demoLogger = new DemoLogger(
  { 
    output: document.querySelector('#app'),
    logging: true,
    log:   true,  
    warn:  true,  
    error: false, 
    color: {
      log:   '#007d60',                 
      warn:  '#676de8',
      error: '#9a121f'
    }
  }
  ,{
    mount: '#app', 
    'func': {
      'log': function() {
        console.log(data);
      },
      'warn': function() {
        console.warn(data);
      },
      'erro': function() {
        console.error(data);
      }
    }
  }
);
```
