class Func extends Elem {
  constructor(opt = {}) {
    this.fn = opt.fn;
    this.text = opt.text;
    opt.el = 'func';
    opt.text = '';
    opt.style = {
      boxShadow: 'none',
      borderBottom: '1px dashed rgba(0,0,0,.2)',
      padding: '5px'
    }
    super(opt);
    this._initElement();
  }
  _initElement() {
    this.btn = new CodeBtn();
    this.code = new Code({
      text: this._toString()
    });
    
    this.add([
      new FuncLabel({
        text: this.text
      }),
      new Btn({
        name: this.text,
        events: {
          click: this.fn
        }
      }),
      this.btn,
      this.code
    ]);
    this.btn.el.addEventListener('click', () => {
      this.code.show();
    }.bind(this));
  }
  _toString() {
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
