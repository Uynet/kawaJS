let gl
export default class KAWA{
  constructor(){
    const cl = console.log
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = 800;
    canvas.height = 800;
    gl = canvas.getContext("webgl");
    const VertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,VertexPositionBuffer);
    let vertex = new Float32Array([
        0.0, 0.5,
        0.5, 0.0,
        -0.5, 0.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.STATIC_DRAW);

    this.Container = function(){ }
    this.Renderer = function(){ }
  }
  
  render(){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.drawArrays(gl.TRIANGLES,0,3);
    //gl.flush();
  }
}
