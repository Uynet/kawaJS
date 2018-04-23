precision mediump float;
uniform vec2 entities;
uniform vec2 entities2;

float meta(float r){ return 1.0/(r*r+0.1);
}
void main(){
  //gl_FragColor = vec4(0.8,0.8,1,1);
  float x = gl_FragCoord.x;
  float y = gl_FragCoord.y;
  float u = x-256.0/512.0;
  float v = y-256.0/512.0;
  vec2 p = vec2(x,y);
  vec2 w = vec2(u,v);

  float m = 0.0;
  m += meta(length(p-entities));
  m += meta(length(p-entities2));


  if(m > 0.005){
    gl_FragColor = vec4(0.0,0.8,1,1);
    return;
  }
  gl_FragColor = vec4(0.8,0.8,1,1);
}

