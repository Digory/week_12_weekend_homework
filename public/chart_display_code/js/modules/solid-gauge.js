/*
  Highcharts JS v6.1.3 (2018-09-12)
 Solid angular gauge module

 (c) 2010-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:"function"===typeof define&&define.amd?define(function(){return l}):l(Highcharts)})(function(l){(function(e){var l=e.pInt,u=e.pick,m=e.each,v=e.isNumber,x=e.wrap,w;x(e.Renderer.prototype.symbols,"arc",function(a,g,d,c,e,b){a=a(g,d,c,e,b);b.rounded&&(c=((b.r||c)-b.innerR)/2,b=["A",c,c,0,1,1,a[12],a[13]],a.splice.apply(a,[a.length-1,0].concat(["A",c,c,0,1,1,a[1],a[2]])),a.splice.apply(a,[11,3].concat(b)));return a});w={initDataClasses:function(a){var g=
this.chart,d,c=0,r=this.options;this.dataClasses=d=[];m(a.dataClasses,function(b,h){b=e.merge(b);d.push(b);b.color||("category"===r.dataClassColor?(h=g.options.colors,b.color=h[c++],c===h.length&&(c=0)):b.color=e.color(r.minColor).tweenTo(e.color(r.maxColor),h/(a.dataClasses.length-1)))})},initStops:function(a){this.stops=a.stops||[[0,this.options.minColor],[1,this.options.maxColor]];m(this.stops,function(a){a.color=e.color(a[1])})},toColor:function(a,g){var d=this.stops,c,e,b=this.dataClasses,h,
f;if(b)for(f=b.length;f--;){if(h=b[f],c=h.from,d=h.to,(void 0===c||a>=c)&&(void 0===d||a<=d)){e=h.color;g&&(g.dataClass=f);break}}else{this.isLog&&(a=this.val2lin(a));a=1-(this.max-a)/(this.max-this.min);for(f=d.length;f--&&!(a>d[f][0]););c=d[f]||d[f+1];d=d[f+1]||c;a=1-(d[0]-a)/(d[0]-c[0]||1);e=c.color.tweenTo(d.color,a)}return e}};e.seriesType("solidgauge","gauge",{colorByPoint:!0},{translate:function(){var a=this.yAxis;e.extend(a,w);!a.dataClasses&&a.options.dataClasses&&a.initDataClasses(a.options);
a.initStops(a.options);e.seriesTypes.gauge.prototype.translate.call(this)},drawPoints:function(){var a=this,g=a.yAxis,d=g.center,c=a.options,r=a.chart.renderer,b=c.overshoot,h=v(b)?b/180*Math.PI:0,f;v(c.threshold)&&(f=g.startAngleRad+g.translate(c.threshold,null,null,null,!0));this.thresholdAngleRad=u(f,g.startAngleRad);m(a.points,function(b){var f=b.graphic,k=g.startAngleRad+g.translate(b.y,null,null,null,!0),t=l(u(b.options.radius,c.radius,100))*d[2]/200,n=l(u(b.options.innerRadius,c.innerRadius,
60))*d[2]/200,p=g.toColor(b.y,b),q=Math.min(g.startAngleRad,g.endAngleRad),m=Math.max(g.startAngleRad,g.endAngleRad);"none"===p&&(p=b.color||a.color||"none");"none"!==p&&(b.color=p);k=Math.max(q-h,Math.min(m+h,k));!1===c.wrap&&(k=Math.max(q,Math.min(m,k)));q=Math.min(k,a.thresholdAngleRad);k=Math.max(k,a.thresholdAngleRad);k-q>2*Math.PI&&(k=q+2*Math.PI);b.shapeArgs=n={x:d[0],y:d[1],r:t,innerR:n,start:q,end:k,rounded:c.rounded};b.startR=t;f?(t=n.d,f.animate(e.extend({fill:p},n)),t&&(n.d=t)):b.graphic=
f=r.arc(n).attr({fill:p,"sweep-flag":0}).add(a.group);f&&f.addClass(b.getClassName(),!0)})},animate:function(a){a||(this.startAngleRad=this.thresholdAngleRad,e.seriesTypes.pie.prototype.animate.call(this,a))}})})(l)});
//# sourceMappingURL=solid-gauge.js.map
