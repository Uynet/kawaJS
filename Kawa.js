export default class KAWA{
  constructor(){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.width = 400;
    this.ctx.height = 400;
    this.gl = this.canvas.getContext("gl");
    this.Container = function(){ }
    this.Renderer = function(){ }
  }
  rect(x,y,w,h){
    this.ctx.beginPath();
    this.ctx.fillRect(20, 20, 80, 40);
  }
}
