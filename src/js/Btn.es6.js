class Btn extends Elem {
  constructor(opt = {}) {
    opt.el = 'button';
    opt.style = {
      textAlign: 'center',
      color: '#fff',
      display: 'inline-block',
      backgroundColor: '#333',
      border: '1px solid #222',
      borderRadius: '1px',
      padding: '0 10px',
      lineHeight: '26px',
      fontSize: '14px',
      webkitAppearance: 'none',
      boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,.2)',
      margin: '3px 3px 0 0'
    };
    
    super(opt);
  }
}
