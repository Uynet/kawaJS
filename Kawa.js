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

    });
    this.Container = function(){ }
    this.Triangle = function(p1,p2,p3,p4,p5,p6){
      this.p1 = p1;
      this.p2 = p2;
      this.p3 = p3;
      this.p4 = p4;
      this.p5 = p5;
      this.p6 = p6;
    }
    this.Renderer = function(){ }
    this.Stage = function(){
      this.list = [];
      this.add = t=>{
        this.list.push(t);
        const VertexPositionBuffer = gl.createBuffer();
        //
        gl.bindBuffer(gl.ARRAY_BUFFER,VertexPositionBuffer);
        let vertex = new Float32Array([
          t.p1, t.p2,
          t.p3, t.p4,
          t.p5, t.p6
        ]);
        gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.DYNAMIC_DRAW);
        const attributeLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(attributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, VertexPositionBuffer);
        gl.vertexAttribPointer(attributeLocation, 2, gl.FLOAT, false, 0, 0);
        //
      }
    }
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
    //Draw StageObject
    Stage.list.forEach((e,i)=>{
      let vertex = new Float32Array([
        e.p1, e.p2,
        e.p3, e.p4,
        e.p5, e.p6
      ]);
      gl.bufferData(gl.ARRAY_BUFFER,vertex,gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.TRIANGLES,0,3);
    })
    gl.flush();
  }
}
