class CodeCloseBtn extends Btn {
  constructor(opt = {}) {
    opt.el = 'codeclosebutton';
    opt.text = 'close';
    
    super(opt);
    this.fn = opt.fn;
    
    this.style = {
      backgroundColor: 'rgb(17, 108, 0)',
      position: 'absolute',
      right: '0px',
      top: '0px',
      fontSize: '10px',
      opacity: '0.5'
    };
    this.applyStyle();
    this._addEvent();
  }
  _addEvent() {
    this.el.addEventListener('click', () =>{
      this.fn();
    })
  }
}
