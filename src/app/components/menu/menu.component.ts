import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  menuItens:MenuItem[];
  menuIsShowed:boolean = true;
  timeoutFecharMenu:any = null;
  timeoutAnimacao:any = null;
  animationClass = 'slidedown'
  screenHeight:number = 0
  screenWidth:number = 0;
  activedMenu:string = 'home'

  constructor() {
    this.menuItens = this.menu.getMenuItens();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
}

  menu:Menu = new Menu([
    {name:"home", icon:"bi bi-house-door-fill", topMinScroll:0, actived: true},
    {name:"projetos", icon:"bi bi-card-text", topMinScroll:499, actived:false},
    {name:"perfil", icon:"bi bi-person-fill", topMinScroll:1299, actived:false}
    ]);
  
  ngOnInit() {
    this.esconderMenu();
    this.loadScrollEvent();
    this.activedMenu = this.menu.getCurrentActivedMenu().name;
    this.onResize();
  }

  loadScrollEvent() {
    fromEvent(document, 'scroll').subscribe(
      {
        next: () => {
          const scrollPosition = document.querySelector('html')!.scrollTop;
          const menuAtivo = this.menu.getCurrentActivedMenu();
          const menuASerAtivado = this.menu.getMenuItens().sort(
            (a:any, b:any) => {
              if(a.topMinScroll > b.topMinScroll)
                return -1;
      
              if(a.topMinScroll < b.topMinScroll)
                return 1;
      
              return 0;
            }
          ).find( (menu : any) => menu.topMinScroll <= scrollPosition );

          if(menuASerAtivado.name === menuAtivo.name)
            return
          
          this.menu.setActivedMenuByTopMinScroll(scrollPosition);
          this.syncMenuItens();
        }
      }
    );
  }

  trocarMenu(name:string) {
      if(name === this.activedMenu)
        return;

      this.menu.setMenuByName(name);
      this.syncMenuItens();
      this.esconderMenu();
  }

  mostrarMenu() {
    this.animationClass = 'slidedown' 
    this.menuIsShowed = true;

    if(this.timeoutAnimacao !== null) {
      clearTimeout(this.timeoutFecharMenu);
      clearTimeout(this.timeoutAnimacao);
    }
  }

  esconderMenu() {
    if(this.screenWidth <= 600 || this.screenHeight > this.screenWidth){      
      return
    }

    this.timeoutAnimacao =  setTimeout(() => {
      this.animationClass = 'slideup'
      this.timeoutFecharMenu = setTimeout(() => {
        this.menuIsShowed = false;
      }, 450);
    }, 1000);
  }

  syncMenuItens() {
    this.menuItens = this.menu.getMenuItens();
  }


}

interface MenuItem {
  name:string,
  icon:string,
  topMinScroll:number,
  actived:boolean
}

class Menu {
  private menuItens:MenuItem[];
  constructor(menuItens:MenuItem[]) {
    this.menuItens = menuItens;
    this.setMenuToDefault();
  }

  getCurrentActivedMenu() {
    for(let elem of this.menuItens) {
      if(elem.actived)
        return elem;
    }

    this.menuItens[0].actived = true;
    return this.menuItens[0];
  }

  getMenuItens() {
    return JSON.parse(JSON.stringify(this.menuItens));
  }

  setMenuToDefault() {
    for(let index = 0; index < this.menuItens.length; index++) {
        this.menuItens[index].actived = false;
    }
    this.menuItens[0].actived = true;
  }

  setMenuByName(name:string) {

    for(let elem of this.menuItens) {
      elem.actived = false;
    }

    for(let elem of this.menuItens) {
      if( elem.name === name){
        elem.actived = true;
      }
    }
  } 

  setActivedMenuByTopMinScroll(topMinScroll:number){
    this.orderDescMenuItensByTopMinScroll();    
    
    for(let elem of this.menuItens) {
      elem.actived = false;
    }

    for(let elem of this.menuItens) {
      if(elem.topMinScroll <= topMinScroll && !elem.actived){
        elem.actived = true;        
        break;
      }
    }



    this.orderAscMenuItensByTopMinScroll();
  }

  private orderDescMenuItensByTopMinScroll() {
    this.menuItens.sort(
      (a, b) => {
        if(a.topMinScroll > b.topMinScroll)
          return -1;

        if(a.topMinScroll < b.topMinScroll)
          return 1;

        return 0;
      }
    )
  }

  private orderAscMenuItensByTopMinScroll() {
    this.menuItens.sort(
      (a, b) => {
        if(a.topMinScroll < b.topMinScroll)
          return -1;

        if(a.topMinScroll > b.topMinScroll)
          return 1;

        return 0;
      }
    )
  }
}

