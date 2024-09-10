export class TagInputHandler{
  true_input:HTMLInputElement;
  true_input_selector:string;
  true_input_name:string;
  hidden:boolean;
  tag_data:Array<string>;
  tag_input:HTMLInputElement;
  tag_template:HTMLTemplateElement;
  tag_temp_selector:string = '[data-tag]';
  tag_value_selector:string = '[data-tag-value]';
  tag_target_selector:string = '[data-show-tags]';
  tag_del_btn_selector:string = '[data-remove-tag]';

  delHandler(tag:DocumentFragment):void{
    const delBtn = tag.querySelector(this.tag_del_btn_selector);
    if(!delBtn) throw new Error("Tag doesn't contain a delete button. " + this.tag_del_btn_selector);
    delBtn.addEventListener('click', (e:MouseEvent)=>{
      const tag = (e.target as HTMLElement).closest(this.tag_temp_selector);
      if(!tag) throw new Error("Couldn't find the element. " + this.tag_temp_selector);
      const tagValEl = tag.querySelector(this.tag_value_selector) as HTMLElement;
      if(!tagValEl) throw new Error("Couldn't find the element. " + this.tag_value_selector);
      const index = this.tag_data.indexOf(tagValEl.innerHTML);
      if(index <= -1) throw new Error("The tag doesn't exist inside the input data array. Value: " + tagValEl);
      tag.remove();
      this.tag_data.splice(index,1);
      this.true_input.value = this.tag_data.join(',');
    });
  };
  insertIntoDOM(singleValue:string):void{
    if(singleValue.trim() === '') return; 
    const temp = this.tag_template.content.querySelector(this.tag_temp_selector);
    if(!temp) throw new Error("Could't find the template element.");
    const tag = temp.cloneNode(true) as DocumentFragment;
    this.delHandler(tag);
    tag.querySelector(this.tag_value_selector).innerHTML = singleValue;
    if(!this.tag_input) throw new Error("Couldn't find the input element.");
    const tarEl = document.querySelector(this.tag_target_selector);
    if(!tarEl) throw new Error("Couldn't find the target element.");
    tarEl.insertBefore(tag,this.tag_input);
  };
  initiateHandler():void{
    this.true_input = document.querySelector(this.true_input_selector);
    if(!this.true_input) throw new Error("The input element with selector " + this.true_input_selector + " doesn't exist.");
    this.true_input_name = this.true_input.getAttribute('name');
    if(!this.true_input_name) throw new Error("The input element doesn't have a name attribute.");
    this.tag_input = document.querySelector('[data-input-tag]');
    if(!this.tag_input) throw new Error("The tag input element with selector doesn't exist.");
    this.tag_template = document.querySelector('template[data-tag]') as HTMLTemplateElement;
    if(!this.tag_template) throw new Error("Tag template element couldn't be found.");
    this.tag_data = [];
    if(this.hidden) this.tag_input.removeAttribute('disabled');
    this.tag_input.addEventListener('keydown', (e:KeyboardEvent)=>{
      if(e.key !== 'Enter') return;
      e.preventDefault();
      const val = this.tag_input.value as string;
      if(val.trim() === ''){
        this.tag_input.setAttribute('data-invalid','true');
        throw new Error("Enter a valid input.");
      };
      this.tag_input.removeAttribute('data-invalid');
      val.split(',').forEach((v:string)=>{
        if(v.trim() === '') return;
        this.tag_data.push(v);
        this.true_input.value = this.tag_data.join(',');
        this.insertIntoDOM(v);
      });
      this.tag_input.value = '';
    });
  };
  constructor(selector:string,hidden:boolean){
    this.hidden = hidden;
    this.true_input_selector = selector;
  };
};
