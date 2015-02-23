class Btn extends Elem {
  constructor(opt = {}) {
    opt.el = 'button';
    opt.text = opt.text || 'run';
    opt.style = {
      textAlign: 'center',
      color: '#fff',
      display: 'inline-block',
      // backgroundColor: '#333',
      backgroundColor: '#C7243A',
      // border: '1px solid #222',
      border: 'none',
      borderRadius: '1px',
      padding: '0 10px',
      lineHeight: '26px',
      fontSize: '14px',
      webkitAppearance: 'none',
      boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2)',
      // margin: '3px 3px 0 0'
      margin: '0'
    };
    
    super(opt);
  }
}
