import KAWA from './Kawa.js';

(function(){
  let k = new KAWA();
  document.getElementById("po").appendChild(k.canvas);
  let r = new k.Rectangle(-0.4, -0.5, 0.3, 0.4);
  let r2 = new k.Rectangle(0.2, -0.5, 0.3, 0.4);
  let s = new k.Stage();

  let timer = 0
  const Run = ()=>{
    if(timer==10){
      s.add(r)
      s.add(r2)
    }
    k.render(s);
    requestAnimationFrame(Run);
    timer++
  }
  Run();

})();
