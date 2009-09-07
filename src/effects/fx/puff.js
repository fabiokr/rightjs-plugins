/**
 * The puff visual effect
 *
 * Copyright (C) Nikolay V. Nemshilov aka St.
 */
Fx.Puff = new Class(Fx.Zoom, {
  extend: {
    Options: Object.merge(Fx.Zoom.Options, {
      size: 1.4  // the end/initial size of the element
    })
  },
  
// protected

  prepare: function(how) {
    var how = how || 'toggle', opacity = 0, size = this.options.size;
    
    if (how == 'out' || (how == 'toggle' && this.element.visible())) {
      var initial_style = this.getEndPosition(this._getZoomedStyle(1));
      this.onFinish(function() {
        initial_style.opacity = 1;
        this.element.hide().setStyle(initial_style);
      });
      
    } else {
      this.element.setStyle('visibility: hidden').show();
      var width = this.element.offsetWidth;
      var initial_style = this.getEndPosition(this._getZoomedStyle(1));
      
      this.onFinish(function() {
        this.element.setStyle(initial_style);
      });
      
      this.element.setStyle(Object.merge(
        this.getEndPosition(this._getZoomedStyle(size)), {
          opacity: 0,
          visibility: 'visible'
        }
      ));
      
      size = width / this.element.offsetWidth;
      opacity = 1;
    }
    
    
    return this.$super(size, {opacity: opacity});
  }
  
});