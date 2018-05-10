precision mediump float;
varying vec4 vColor;

void main(){
  float x = gl_FragCoord.x / 200.0;
  gl_FragColor = vColor;
}

