let gl
export default class KAWA{
  constructor(){
    const cl = console.log
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = 800;
    canvas.height = 800;
    //gl
    gl = canvas.getContext("webgl");
    this.gl = gl;
    const program = gl.createProgram();
    this.createShader("main.vert").then(vs => {
        gl.attachShader(program, vs); // ProgramとVertex Shaderを結び付ける
        return this.createShader("main.frag");// Fragment Shaderを作成
    }).then(fs => {
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);
        //program
        
        //color
    });
    //members
    this.Rectangle = function(x,y,w,h){
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
    this.Renderer = function(){ }
    this.Stage = function(){
      this.list = [];
      this.add = e=>{
        this.list.push(e);
        //color
        const colorBuffer = gl.createBuffer();
        const vertexColor = [
          1.0, 0.0, 0.0, 1.0,
          0.0, 1.0, 0.0, 1.0,
          0.0, 0.0, 1.0, 1.0
        ];
        const attributeLocation2 = gl.getAttribLocation(program, "color");
        gl.enableVertexAttribArray(attributeLocation2);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexColor),gl.STATIC_DRAW);
        gl.vertexAttribPointer(attributeLocation2, 4, gl.FLOAT, false, 0, 0);
        //position
        const VertexPositionBuffer = gl.createBuffer();
        let vertex = [
          e.x, e.y,
          e.x, e.y+e.h,
          e.x+e.w, e.y+e.h,
        ];
        const attributeLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(attributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex),gl.STATIC_DRAW);
        gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
      }
    }
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
  
  render(Stage){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,3);
    //Draw StageObject
    gl.flush();
  }
}
