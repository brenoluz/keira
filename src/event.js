export default new class{
  
	constructor(){

    this.listeners = {};
  }

  emit(name, data){

    if(!this.listeners.hasOwnProperty(name)){
      return Promise.resolve();
    }

    let promises = [];

    for(let func of this.listeners[name]){
      promises.push(func(data));
    }

    return Promise.all(promises);
  }

  on(name, func){

  	if(!this.listeners.hasOwnProperty(name)){

	    this.listeners[name] = [];
  	}

    this.listeners[name].push(func);
	}

  remove(name, func){

    if(!this.listeners.hasOwnProperty(name)){
      return;
    }

    let listeners = this.listeners[name];

    for(let i in listeners){

      let even = listeners[i];
      if(even === func){
        
        console.log("REMOVE EVENT", this.listeners[name].length);
        this.listeners[name].splice(i, 1);
        console.log("REMOVIDO EVENT", this.listeners[name].length);
      }
    }
  }
}
