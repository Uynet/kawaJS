import Game from './game.js';
import KAWA from './Kawa.js';



(function(){
  let k = new KAWA();
  let c = new k.Container();
  document.getElementById("po").appendChild(k.canvas);
  k.rect(0,0,100,100)
})();
