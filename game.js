import Drawer from './drawer.js';
import Entity from './entity.js';
import EntityManager from './entityManager.js';


export default class Game{
  static Boot(){
    EntityManager.Init();
    for(let i = 0;i<32;i++){
      let a = new Entity({x:200+RAND(200),y:320+RAND(200)});
      EntityManager.Add(a);
    }
    Drawer.Init().then(()=>{this.Run()});
  }
  static Update(){
    EntityManager.Update();
  }
  static Run(){
    Game.Update();
    Drawer.Render(EntityManager.list);
    requestAnimationFrame(Game.Run);
  }
}
