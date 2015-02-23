class Frame extends Elem {
  constructor(opt = {}) {
    opt.el = 'frame'
    opt.style = {
      backgroundColor: '#f9faf9',
      padding: '5px',
      borderRadius: '1px',
      boxShadow: 'inset 1px 1px 0 rgba(0,0,0,.2)'
    };
    
    super(opt);
  }
}
