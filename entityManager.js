export default class EntityManager{
  static Init(){
    this.list = [];
  }
  static Add(entity){
    this.list.push(entity);
  }
  static Update(){
    this.list.forEach((e)=>e.Update());
  }
}
