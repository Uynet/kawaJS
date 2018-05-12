import KAWA from './Kawa.js';

(function(){
  let k = new KAWA();
  document.getElementById("po").appendChild(k.canvas);
  let r = new k.Rectangle(-0.4, 0.0, 0.5, 0.5);
  let s = new k.Stage();
  let timer = 0
    s.add(r)
  const Run = ()=>{
    k.render(s);
    requestAnimationFrame(Run);
    timer++
  }
  Run();

})();
