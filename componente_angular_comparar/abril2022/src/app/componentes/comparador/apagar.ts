import { Component, OnInit, Renderer2,ElementRef,ViewChild} from '@angular/core';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})


export class ComparadorComponent implements OnInit {


  @ViewChild('hello', { static: false }) divHello: ElementRef | any;
  
  setStyle() {
    this.renderer.setStyle(this.divHello.nativeElement, 'color', 'blue');
  }



  ngOnInit(): void {
  }
/************************************************************************
Usando variables GLOBALES com fins didáticos
*************************************************************************/
  img:any; 
  e: any;
  x :any;
  clicked : any;
  slider: any;
  a: any;
  i: any;
  w: any;
  pos: any;


  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.x = 0;
    this.clicked = 0;
    this.slider, this.img,  this.a, this.i,this.w,this.pos;
    this.divHello;
  }


  preparacion_elementos_DOM_abril_2022(): void{
    var w = this.img.offsetWidth;
    var h = this.img.offsetHeight;

    /*
    define la posiición inicial del cursor (y no de la Imagen) al 50% del ancho de la imagen
    */
    
    var proporcionAncho:number = 2;
  
    this.img.style.width = (w / proporcionAncho) + "px";
  
    this.slider = document.createElement("DIV");
    this.slider.setAttribute("class", "img-comp-slider");
    //this.slider.setAttribute("class", "titulo");
  
    this.img.parentElement.insertBefore(this.slider, this.img);

  /*
  A posição vertical do ponteiro será colocado a metade:
  */
    this.slider.style.top = (h / 2) - (this.slider.offsetHeight / 2) + "px";
    this.slider.style.left = (w / proporcionAncho) - (this.slider.offsetWidth / proporcionAncho) + "px";
  }


  preparacion_eventos_DOM_abril_2022(): void{
      /*execute a function when the mouse button is pressed:*/
    this.slider.addEventListener("mousedown", this.slideReady_abril_2022);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", this.slideFinish);
    /*or touched (for touch screens:*/
    this.slider.addEventListener("touchstart", this.slideReady_abril_2022);
    /*and released (for touch screens:*/
    window.addEventListener("touchend", this.slideFinish);
  }

  slideReady_abril_2022(e: any): void{
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*the slider is now clicked and ready to move:*/
    this.clicked = 1;
    /*execute a function when the slider is moved:*/
    window.addEventListener("mousemove", this.slideMove);
  }

  slideFinish(): void{
    this.clicked = 0;
  }

  slideMove(e: any): void{
    var pos;
    /*if the slider is no longer clicked, exit this function:*/
    //if (this.clicked != 0) 
    {
      /*get the cursor's x position:*/
      pos = this.getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (this.pos < 0) pos = 0;
      if (this.pos > this.w) pos = this.w;
      this.slide();
    }
  }
  
  //(): void{}
  //(): void{}
  slide(): void{
  /*resize the image:*/
    this.img.style.width = this.x + "px";
  /*position the slider:*/
    this.slider.style.left = this.img.offsetWidth - (this.slider.offsetWidth / 2) + "px";
  }

  getCursorPos(e: any): any{
    e = (e.changedTouches) ? e.changedTouches[0] : e;
    /*get the x positions of the image:*/
    this.a = this.img.getBoundingClientRect();
    /*calculate the cursor's x coordinate, relative to the image:*/
    this.x = e.pageX - this.a.left;
    /*consider any page scrolling:*/
    this.x = this.x - window.pageXOffset;
    //  console.log(x);
    return this.x;
  }

  compareImages(): void{

      this.preparacion_elementos_DOM_abril_2022();
    
      this.preparacion_eventos_DOM_abril_2022();

  }

  comparar() : void {

    var elementAPAGAR= document.getElementById('apagar') as HTMLElement;
    elementAPAGAR.setAttribute("class", "titulo");

//this.setStyle();

    var element= document.getElementById('botao_comparar') as HTMLElement;
    element.style.display = "none";
    var img_comp_overlay = document.getElementsByClassName("img-comp-overlay");
  /*Usando a clase "img_comp_overlay"
        
  */  
    for (var i = 0; i < img_comp_overlay.length; i++) {
      this.img = img_comp_overlay[i];
      this.compareImages();
    }
  }


  
}
