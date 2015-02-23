class CodeBtn extends Btn {
  constructor(opt = {}) {
    opt.el = 'codebutton';
    opt.text = 'code';
    super(opt);
    this.style = {
      backgroundColor: '#23AC0E'
    };
    this.applyStyle();
  }
}
