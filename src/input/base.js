import View from '../view';

export default class extends View{
  
  constructor(name){
    
    super();

    this.validators = [];

    this.name  = name;
    this.label = null;
    this.help  = null;
    this.input = null;
    this.value = null;

    this.editable = true;

    this.label_text = null;
    this.help_text  = '';

    this.container = CE('div', 'form-group');
  }

  get_name(){
  
    return this.name;
  }

  get_value(){
  
    this.value = this.input.value;
    return this.value;
  }

  edit(flag){

    this.editable = flag;
  }
  
  set_label(text){
    
    this.label_text = text;
  }

  set_value(value){

    this.value = value;

    if(!!this.input){
      return this.make();
    }

    return Promise.resolve();
  }

  is_valid(extra_context){
  
    return new Promise((res, rej) => {

      let promises = [];
      let value    = this.get_value();
    
      this.validators.forEach(validator => {
      
        promises.push(validator.is_valid(value, extra_context));
      });

      Promise.all(promises).then(data => {
      
        let args = Array.prototype.slice.call(data);
        let resp = args.indexOf(false) < 0;
        res(resp);

      }, rej);
    });
  }

  set_help(text){
  
    this.help_text = text;
  }

  make(){
  
    let group = this.container;
    group.innerHTML = '';

    if(!!this.label_text){
      this.label = this.make_label(this.label_text);
      group.append(this.label);
    }
    
    this.input = this.make_input(this.name);
    group.append(this.input);

    if(!!this.help_text){
      this.help = this.make_help(this.help_text);
      group.append(this.help);
    }

    return Promise.resolve();
  }

  make_label(text){
  
    let label = CE('label');
    label.innerText = !!text ? text : '';

    return label;
  }

  make_input(name){
  
    let input = CE('input', 'form-control');
    input.name = name;

    if(!!this.value){
      input.value = this.value;
    }

    if(!this.editable){
      input.disabled = true;
    }

    return input;
  }

  make_help(text){
  
    let small = CE('small', 'form-text text-muted');
    small.innerText = !!text ? text : '';

    return small;
  }
}
