class Label extends Elem {
  constructor(opt = {}) {
    opt.text = opt.text || 'label';
    opt.el = 'label';
    opt.style = {
      fontSize: '10px',
      color: '#9f9f9f',
      borderBottom: '1px solid #9f9f9f',
      textShadow: '-1px -1px rgba(255,255,255, .2)',
      margin: '8px 0 5px'
    };
    
    super(opt);
  }
}
