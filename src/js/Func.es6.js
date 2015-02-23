class Func extends Elem {
  constructor(opt = {}) {
    this.fn = opt.fn;
    this.text = opt.text;
    opt.text = '';
    opt.style = {
      boxShadow: 'none',
      borderBottom: '1px dashed rgba(0,0,0,.2)',
      padding: '5px'
    }
    super(opt);
    this._setEvent();
    this._setCode();
  }
  _setEvent() {
    this.add([
      new FuncLabel({
        text: this.text
      }),
      new Btn({
        events: {
          click: this.fn
        }
      }),
      new CodeBtn({
        events: {
          click: function() {
            this.code.toggle();
          }.bind(this)
        }
      })
    ])
  }
  _setCode() {
    this.code = new Code({
      text: this._toString()
    });
    this.add(this.code);
  }
  _toString() {
    // return this.fn.toString();
    var codestring = this.fn.toString().split('\n');
    codestring.splice(-1, 1);
    codestring.splice(0, 1);
    var firstIndent = codestring[0].match(/^\s*/)[0];
    var reg = new RegExp(`\^${firstIndent}`);
    for(var i = 0, leng = codestring.length; i < leng; i++) {
      codestring[0] = codestring[0].replace(reg, '');
    }
    
    return codestring.join('\n');
  }
}