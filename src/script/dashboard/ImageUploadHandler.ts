export class ImageUploadHandler{
  input_selector:string;
  to_enable:boolean;
  img_container_selector:string = '[data-img-container]';
  temp_selector:string = "[data-upload-img]";
  temp_img_compo_selector:string = "[data-uploaded-img]";
  temp_img_src_selector:string = "[data-img]";
  temp_img_remove_selector:string = "[data-img-remove]";
  filesData:Array<File> = [];
  initiateUploader(uploadHandler:(b64img:string)=>string):void{
    const inp_el = document.querySelector(this.input_selector) as HTMLInputElement;
    if(!inp_el) throw new Error("The input element couldn't be found.");
    const temp = document.querySelector(this.temp_selector) as HTMLTemplateElement;
    if(!temp) throw new Error("The template element couldn't be found.");
    const imgCompo = temp.content.querySelector(this.temp_img_compo_selector) as HTMLElement;
    if(!imgCompo) throw new Error("The image component doesn't exist within the selected template.");
    const imgContainer = document.querySelector(this.img_container_selector) as HTMLElement;
    if(!imgContainer) throw new Error("The images container couldn't be found.");
    if(this.to_enable) inp_el.removeAttribute('disabled');

    inp_el.addEventListener('change',async (e:Event)=>{

      let filelist = (e.target as HTMLInputElement).files as FileList;
      if(!filelist) return;
      this.filesData = Array.from(filelist);
      this.filesData.forEach(async (file:File,index:number)=>{
        const clonedCompo = imgCompo.cloneNode(true) as DocumentFragment;
        const src = clonedCompo.querySelector(this.temp_img_src_selector) as HTMLImageElement;
        const remove = clonedCompo.querySelector(this.temp_img_remove_selector) as HTMLButtonElement;
        remove.setAttribute('data-index',index.toString());

        remove.addEventListener('click',async (e:MouseEvent)=>{
          e.preventDefault();
          const index = parseInt(remove.getAttribute('data-index'));
          if(!index && typeof index !== 'number') throw new Error("Missing file's index value.");
          this.filesData.splice(index,1);
          const dt = new DataTransfer();
          this.filesData.forEach(file=>dt.items.add(file));
          filelist = dt.files;
          remove.closest(this.temp_img_compo_selector).remove();
        });

        if(!src) throw new Error("The image element couldn't be found.")
        const reader = new FileReader();
        reader.onload = function(e){
          if(uploadHandler){
            uploadHandler(e.target.result as string);
          };
          src.src = (reader as FileReader).result as string;
        };
        imgContainer.insertBefore(clonedCompo,imgContainer.lastChild);
        reader.readAsDataURL(file);
        console.log(file);
        // upload the <image></image>
        // show greyedout image or loading image.
        // get it's url and attach it to the input. 
        // if you dont get an image url in return dont add image ui and throw error.
      });
    });
  };
  constructor(inp_selector:string,enable:boolean){
    this.input_selector = inp_selector;
    this.to_enable = enable;
  };
};
