precision mediump float;
uniform int size;
uniform vec2 entities[64];
uniform vec2 entities1;
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
  for(int i = 0;i<32;i++){
    m += meta(length(p-entities[i]));
  }

  if(m > 0.005){
    gl_FragColor = vec4(0.0,0.8,1,1);
    return;
  }
  gl_FragColor = vec4(0.8,0.8,1,1);
}

