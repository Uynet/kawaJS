import Drawer from './drawer.js';
import Entity from './entity.js';
import EntityManager from './entityManager.js';

export default class Game{
  static Boot(){
    EntityManager.Init();
    let a = new Entity({x:100,y:320});
    let b = new Entity({x:200,y:300});
    EntityManager.Add(a);
    EntityManager.Add(b);
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
