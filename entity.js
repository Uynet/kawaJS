export default class Entity{
  constructor(pos){
    this.pos = pos;
    this.vel={x:1,y:0};
  }
  Collision(){
    if(this.pos.y <100 ){
      this.pos.y = 100;
      this.vel.y *= -0.8;
    }
    if(this.pos.x >500 ){
      this.pos.x = 500;
      this.vel.x *= -1;
    }
    if(this.pos.x <32 ){
      this.pos.x = 32;
      this.vel.x *= -1;
    }
  }
  Update(){
    this.vel.y -= 0.2;
    this.pos.x+=this.vel.x;
    this.pos.y+=this.vel.y;
    this.Collision();
  }
}
