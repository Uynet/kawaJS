let gl
export default class KAWA{
  constructor(){
    const cl = console.log
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = 800;
    canvas.height = 800;
    gl = canvas.getContext("webgl");
    //get GL
    cl(gl)

    this.Container = function(){ }
    this.Renderer = function(){ }
  }
  render(){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  rect(x,y,w,h){
    ctx.beginPath();
    ctx.fillRect(20, 20, 80, 40);
  }
}
