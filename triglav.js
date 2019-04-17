class triglav {
  constructor(divId, largura, altura, data, callback, options) {
    let defaultOptions = {
      dotColor: '#FFF',
      lineColor: '#FFF',
      blinkColor: '#F00',
      radius: 10,
      'stroke-width': 3
    };
    //checking parameters
    if (options === undefined) {
      options = defaultOptions;
    }
    if (data === undefined || data === null) return;
    Object.keys(defaultOptions).forEach(function(key) {
      let val = options[key];
      if (val === undefined) {
        options[key] = defaultOptions[key];
        return;
      }
      options[key] = val;
    });
    if (triglav.prototype.timelines === undefined)
      triglav.prototype.timelines = [];
    triglav.prototype.timelines.push(this);

    this.divId = divId;
    this.largura = largura;
    this.altura = altura;
    this.data = data;
    this.options = options;
    this.dotAlertsEvents = [];
    this.dots = [];
    this.dotColor = options.dotColor;
    this.radius = options.radius;
    this.callback = callback;

    let paper = null;
    //running in Jest or Node
    if (typeof process === 'object' && process + '' === '[object process]') {
      const Raphael = require('raphael');
      paper = Raphael(0, 0, 10, 10);
    } else {
      paper = Raphael(divId);
    }
    paper.setViewBox(0, 0, largura, altura, true);
    this.paper = paper;

    let svg = document.querySelector('svg');
    svg.removeAttribute('width');
    svg.removeAttribute('height');

    this.calc(this.data);
  }
  calc(dataArray) {
    let margem = 150;
    let workLarea = this.largura - margem * 2;
    let distX = workLarea / (dataArray.length - 1);
    let contDistX = margem;
    let aryX = [];
    let y = this.altura / 2;

    dataArray.sort(function(a, b) {
      return a.order - b.order;
    });

    let classObj = this;
    for (let i = 0; i < dataArray.length; i++) {
      aryX[i] = contDistX;
      let l = this.paper
        .circle(contDistX, y, this.radius)
        .attr({ fill: this.dotColor })
        .data('id', dataArray[i].id)
        .click(function() {
          classObj.callback(this.data('id'));
        });
      this.dots.push(l);
      this.paper.text(contDistX, y + 20, dataArray[i].name);
      contDistX += distX;
    }
    //linhas
    for (let i = 0; i < dataArray.length - 1; i++) {
      let x1, x2;
      x1 = aryX[i] + this.radius;
      x2 = aryX[i + 1] - this.radius;

      let line = this.paper.path('M' + x1 + ' ' + y + 'L' + x2 + ' ' + y).attr({
        fill: this.options.lineColor,
        stroke: this.options.lineColor,
        'stroke-width': this.options['stroke-width']
      });
      contDistX += distX;
    }
  }
  getDot(idDot) {
    return this.dots.find(function(e) {
      if (e.data('id') == idDot) return e;
    });
  }
  setColor(idDot, color) {
    let dot = this.getDot(idDot);
    if (dot === undefined) return;
    dot.attr({ fill: color });
  }
  alertDot(idDot) {
    let classObj = this;
    let dot = classObj.getDot(idDot);
    if (dot === undefined) {
      console.error('Nao encontrado.');
      return;
    }
    if (this.dotAlertsEvents[idDot] !== undefined) return;
    this.dotAlertsEvents[idDot] = setInterval(function() {
      let color = dot.attrs.fill;

      if (color == classObj.dotColor) color = classObj.options.blinkColor;
      else color = classObj.dotColor;
      dot.attr({ fill: color });
    }, 500);
  }
  stopAlertDot(idDot) {
    clearInterval(this.dotAlertsEvents[idDot]);
    let dot = this.getDot(idDot);
    dot.attr({ fill: this.dotColor });
    this.dotAlertsEvents[idDot] = undefined;
  }
  static setDotColor(idTimeline, idDot, color) {
    let k = triglav.prototype.timelines.find(function(e) {
      if (e.divId == idTimeline) return e;
    });
    if (k === undefined) return;
    k.setColor(idDot, color);
  }
  static alertDot(idTimeline, idDot) {
    let k = triglav.prototype.timelines.find(function(e) {
      if (e.divId == idTimeline) return e;
    });
    if (k === undefined) return;
    k.alertDot(idDot);
  }
  static alertDotStop(idTimeline, idDot) {
    let k = triglav.prototype.timelines.find(function(e) {
      if (e.divId == idTimeline) return e;
    });
    if (k === undefined) return;
    k.stopAlertDot(idDot);
  }
  static generateUUID() {
    // Public Domain/MIT
    let d = new Date().getTime();
    if (
      typeof performance !== 'undefined' &&
      typeof performance.now === 'function'
    ) {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
if (typeof process === 'object' && process + '' === '[object process]') {
  module.exports = triglav;
}
