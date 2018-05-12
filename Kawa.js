let gl;
let cl;
export default class KAWA{
  constructor(){
    cl = console.log;
    const KAWA = this;
    this.GLSetUp();
    this.vertex = [];
    this.vbo = this.CreateVBO(this.vertex);
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
    this.CreateShader("main.vert").then(vs => {
        gl.attachShader(this.program, vs); // ProgramとVertex Shaderを結び付ける
        return this.CreateShader("main.frag");// Fragment Shaderを作成
    }).then(fs => {
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
        gl.useProgram(this.program);
        //texture
        const texL = gl.getUniformLocation(this.program, "tex");
        gl.uniform1i(texL, 0);
    });
    this.CreateTexture("./fav.png");
  }
  CreateVBO(vertex){
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);//無効化
    return vbo;
  }
  CreateTexture(source){
    const img = new Image();
    img.src = source;
    img.onload = _=>{
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D,tex);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
      gl.generateMipmap(gl.TEXTURE_2D);
      console.log("bind");
    }
  }
  CreateShader(path){
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
      //VertexPositionBuffer
      gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo);
      this.vertex = [
        e.x,e.y,
        e.x+e.w,e.y,
        e.x+e.w,e.y+e.h,
        e.x,e.y+e.h,
      ]
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(this.vertex),gl.STATIC_DRAW);
      //Attribute
      const attLocation = gl.getAttribLocation(this.program,"position");
      this.SetAttribute(this.vbo,attLocation);
      //tex
      const texVert = [
        0.0,0.0,
        1.0,0.0,
        0.0,1.0,
        1.0,1.0,
      ]
      const texVBO = this.CreateVBO(texVert);
      const uvL = gl.getAttribLocation(this.program,"uv");
      this.SetAttribute(texVBO,uvL);

      gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    }
    gl.flush();
  }
}
