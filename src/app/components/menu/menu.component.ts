import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() activedMenu?:string
  menuIsShowed:boolean = true;
  timeoutFecharMenu:any = null;
  timeoutAnimacao:any = null;
  animationClass = 'slidedown'

  constructor() {}
  
  ngOnInit() {
    this.activedMenu = window.location.href.split('#')[1] ? window.location.href.split('#')[1] : 'home';
    this.esconderMenu();

  }

  trocarMenu(menu: menus) {
      this.activedMenu = menu;
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
    this.timeoutAnimacao =  setTimeout(() => {
      this.animationClass = 'slideup'
      this.timeoutFecharMenu = setTimeout(() => {
        this.menuIsShowed = false;
      }, 450);
    }, 1000);
  }

  teste(event:any) {

  }
}



type menus = 'home' | 'projetos' | 'perfil';
