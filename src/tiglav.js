//import Raphael from '../node_modules/raphael/raphael';

class Tiglav {
    constructor(divId, largura, altura, data,callback,options){
        let defaultOptions = { 
            dotColor: "#FFF",
            lineColor: "#FFF",
            blinkColor: '#F00',
            radius: 10,
            "stroke-width": 3
        };
        if(options === undefined){   
            options = defaultOptions;
        }
        Object.keys(defaultOptions).forEach(function (key) {
            let val = options[key];
            if(val === undefined){
                options[key] = defaultOptions[key];
                return;
            }
            options[key] = val;
        });
        if(Tiglav.prototype.timelines===undefined)
            Tiglav.prototype.timelines = [];
        Tiglav.prototype.timelines.push(this);

        this.divId = divId;
        this.largura = largura;
        this.altura = altura;
        this.data = data;
        this.options = options;
        this.dotAlertsEvents = [];
        this.dots = [];
        this.dotColor = options.dotColor;
        this.radius = options.radius;

        let paper = Raphael(divId);
        paper.setViewBox(0,0,largura,altura,true);
        //paper.setSize('100%', '100%');
        let svg = document.querySelector("svg");
        svg.removeAttribute("width");
        svg.removeAttribute("height");

        let margem = 150;
        let workLarea = largura - margem*2;
        let distX = workLarea/(data.length-1);
        let contDistX = margem;
        let aryX=[];
        let y = altura/2;

        data.sort(function(a, b){return a.order - b.order});

        for(let i = 0; i < data.length;i++){
            aryX[i]=contDistX;
            let l = paper.circle(contDistX, y, this.radius)
                .attr({fill: this.dotColor})
                .data("id",data[i].id)
                .click(function(){
                    callback(this.data("id"));
                });
            this.dots.push(l);
            paper.text(contDistX, y+20, data[i].name);
            contDistX+=distX;
        }
        //linhas
        for(let i = 0; i < data.length-1;i++){
            let x1,x2;
            x1=aryX[i]+this.radius;
            x2=aryX[i+1]-this.radius;
            
            let line = paper.path("M"+x1+" "+y+"L"+x2+" "+y)
                .attr({
                        "fill":this.options.lineColor,
                        "stroke": this.options.lineColor,
                        "stroke-width": this.options["stroke-width"]
                    });
            console.log(line);
            contDistX+=distX;
        }
    };
    getDot(idDot){
        return this.dots.find(function(e){
            if(e.data("id")==idDot)
                return e;
        });
    };
    setColor(idDot, color){
        let dot = this.getDot(idDot);
        if(dot === undefined) return;
        dot.attr({"fill":color});
    };
    alertDot(idDot){
        let classObj = this;
        let dot = classObj.getDot(idDot);
        if(dot === undefined)
        {
            console.error("Nao encontrado.");
            return;
        }
        if(this.dotAlertsEvents[idDot]!==undefined)
            return;
        this.dotAlertsEvents[idDot] = setInterval(function(){
            let color = dot.attrs.fill;
            
            if(color == classObj.dotColor)
                color = classObj.options.blinkColor;
            else
                color = classObj.dotColor;
            dot.attr({"fill":color});
        }, 500);
    };
    stopAlertDot(idDot){
        clearInterval(this.dotAlertsEvents[idDot]);
        let dot = this.getDot(idDot);
        dot.attr({"fill":this.dotColor});
        this.dotAlertsEvents[idDot]=undefined;
    };
    static setDotColor(idTimeline,idDot, color){
        let k = Tiglav.prototype.timelines.find(function(e){
            if(e.divId==idTimeline)
                return e;
        });        
        if(k===undefined)return;
        k.setColor(idDot, color);
    };
    static alertDot(idTimeline,idDot){
        let k = Tiglav.prototype.timelines.find(function(e){
            if(e.divId==idTimeline)
                return e;
        });        
        if(k===undefined)return;
        k.alertDot(idDot);
    };
    static alertDotStop(idTimeline,idDot){
        let k = Tiglav.prototype.timelines.find(function(e){
            if(e.divId==idTimeline)
                return e;
        });
        if(k===undefined)return;
        k.stopAlertDot(idDot);
    };
    static generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
}
module.exports = new Tiglav();
