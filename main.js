import KAWA from './Kawa.js';

(function(){
  let k = new KAWA();
  document.getElementById("po").appendChild(k.canvas);
  let t = new k.Triangle(0.0, 0.5, 0.3, 0.0, -0.3, 0.0);
  let s = new k.Stage();
  s.add(t)

  let timer = 0
  const Run = ()=>{
    k.render(s);
    requestAnimationFrame(Run);
    t.p1 = Math.sin(timer/40);
    t.p2 = Math.cos(timer/40);
    timer++
  }
  Run();

})();
