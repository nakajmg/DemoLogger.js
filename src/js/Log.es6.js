class Log extends Elem {
  constructor(opt = {}) {
    opt.el = 'log';
    opt.style = {
      color: '#15df30',
      padding: '5px 7px',
      backgroundColor: '#333',
      lineHeight: '1.5',
      fontSize: '12px',
      fontFamily: '"Ubuntu Mono", sans-serif',
      border: '1px solid #000',
      borderRadius: '2px',
      margin: '0',
      minHeight: '19px',
      whiteSpace: 'pre',
      letterSpacing: '0.1em'
    };
    
    super(opt);
    new ConsoleToHtml({
      el: this.el,
      log: opt.log,
      warn: opt.warn,
      error: opt.error
    });
  }
}
