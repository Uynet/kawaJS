precision mediump float;
varying vec2 vUV;
uniform sampler2D tex;

void main(){
  vec4 color = texture2D(tex,vUV);
  gl_FragColor = color;
}

