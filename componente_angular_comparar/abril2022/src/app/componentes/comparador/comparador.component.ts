import { Component, OnInit, Renderer2,ElementRef,ViewChild} from '@angular/core';

@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css'],
})

/************************************************************************
Componente simples para usar um slider
e visualizar de forma simultânea duas (02) imagens (img1 e img2)


*************************************************************************/

export class ComparadorComponent implements OnInit {

  img:any; 
  e: any;
  x :any;
  clicked : any;
  slider: any;
  a: any;
  i: any;
  w: any;
  pos: any;

  ngOnInit(): void {
    
    this.img=document.getElementsByClassName("img-comp-overlay")[0];

    this.preparacion_elementos_DOM_abril_2022(); 
    this.preparacion_eventos_DOM_abril_2022();
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.x = 0;
    this.clicked = 0;
    this.slider;     
    this.a, this.i,this.w,this.pos;
  }

/*************************************************************************
Os elementos são preparados para este componente, 
e POSTERIORMENTE
 os eventos são adicionados para o controle do slider.
*************************************************************************/

  preparacion_elementos_DOM_abril_2022(): void{

    var w = this.img.offsetWidth;
    var h = this.img.offsetHeight;

    var proporcionAncho : number = 2;
  
    this.img.style.width = (w / proporcionAncho) + "px";
  
    this.slider = document.createElement("DIV");
    this.img.parentElement.insertBefore(this.slider, this.img);
    
    //Colocação do Style de forma programática: 

    this.slider.style.width="40px";
    this.slider.style.height="40px";

    this.slider.style.position="absolute";
    this.slider.style.zIndex="9";    
    this.slider.style.cursor="ew-resize";
    this.slider.style.backgroundColor="#2196F3";
    this.slider.style.opacity="0.7";
    this.slider.style.borderRadius="50%";

    this.slider.setAttribute("id", "domingo");   

    this.slider.style.top = (h / 2) - (this.slider.offsetHeight / 2) + "px";
    this.slider.style.left = (w / proporcionAncho) - (this.slider.offsetWidth / proporcionAncho) + "px";

  }

/*************************************************************************
Eventos adicionados de forma separada.
*************************************************************************/

  preparacion_eventos_DOM_abril_2022(): void{
      /*execute a function when the mouse button is pressed:*/
    this.slider.addEventListener("mousedown", this.slideReady_abril_2022.bind(this));
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", this.slideFinish.bind(this));
    /*or touched (for touch screens:*/
    this.slider.addEventListener("touchstart", this.slideReady_abril_2022.bind(this));
    /*and released (for touch screens:*/
    window.addEventListener("touchend", this.slideFinish.bind(this));
  }
/*************************************************************************
Evento: disparado quando o mouse é clicado (ou tocado), o que se chama de "mousedown".
*************************************************************************/
  slideReady_abril_2022(e: any): void{
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*the slider is now clicked and ready to move:*/
    this.clicked = 1;
    /*execute a function when the slider is moved:*/
    window.addEventListener("mousemove", this.slideMove.bind(this));
  }

  slideFinish(): void{
    this.clicked = 0;
  }

  /*
  No caso de movimento do DIV com id de "slide", o evento é disparado sempre que o mouse é movido.
  */
  slideMove(e: any): void{
    var pos;

    this.img=document.getElementsByClassName("img-comp-overlay")[0];

    if (this.clicked == 1) 
    {


      e = (e.changedTouches) ? e.changedTouches[0] : e;
      /*get the x positions of the image:*/

      this.a = this.img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      this.x = e.pageX - this.a.left;
      /*consider any page scrolling:*/
      this.x = this.x - window.pageXOffset;
      pos= this.x;

      if (this.pos < 0) pos = 0;
      if (this.pos > this.w) pos = this.w;
      this.img.style.width = this.x + "px";
      this.slider.style.left = this.img.offsetWidth - (this.slider.offsetWidth / 2) + "px";    
    }
  }
  
  //(): void{}
  //(): void{}


  comparar() : void {

    this.img = this.el.nativeElement.querySelector('.img-comp');
    var element= document.getElementById('botao_comparar') as HTMLElement;
    element.style.display = "none";

  }


  
}
