let gl
export default class KAWA{
  constructor(){
    const cl = console.log;
    this.GLSetUp();
    //members
    this.Rectangle = function(x,y,w,h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    this.Stage = function(){
      this.list = [];
      this.add = e=>{
        this.list.push(e);
      }
    }
  }
  GLSetUp(){
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = 800;
    canvas.height = 800;
    //gl
    gl = canvas.getContext("webgl");
    this.gl = gl;
    this.program = gl.createProgram();
    this.createShader("main.vert").then(vs => {
        gl.attachShader(this.program, vs); // ProgramとVertex Shaderを結び付ける
        return this.createShader("main.frag");// Fragment Shaderを作成
    }).then(fs => {
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);
        //program
        
        //color
    });
  }
  CreateVBO(vertex){
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);//無効化
    return vbo;
  }
  createShader(path){
    return new Promise((resolve, reject) => {
      const shaderType = (_ => {
        const extension = path.split(".")[1];
        switch (extension) {
          case "vert": return gl.VERTEX_SHADER;
          case "frag": return gl.FRAGMENT_SHADER;
        }
      })();

      const xhr = new XMLHttpRequest();
      xhr.open("GET", path, true);
      xhr.addEventListener("load", event => {
        const code = event.target.response;
        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, code);
        gl.compileShader(shader);

        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          resolve(shader);
        } else {
          console.error(gl.getShaderInfoLog(shader));
          reject();
        }
      });
      xhr.send(null);
    });
  }
  SetAttribute(vbo,attL){
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo)
    gl.enableVertexAttribArray(attL);
    gl.vertexAttribPointer(attL,2,gl.FLOAT,false,0,0);
  }
  
  render(Stage){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    for(let e of Stage.list){
      const vbo = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
      const vertex = [
        e.x,e.y,
        e.x+e.w,e.y,
        e.x+e.w,e.y+e.h,
        e.x,e.y+e.h,
      ]
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex),gl.STATIC_DRAW);
      //Attribute
      const attLocation = gl.getAttribLocation(this.program,"position");
      gl.enableVertexAttribArray(attLocation);
      gl.vertexAttribPointer(attLocation,2,gl.FLOAT,false,0,0);
      //Draw
      gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    }
    gl.flush();
  }
}
