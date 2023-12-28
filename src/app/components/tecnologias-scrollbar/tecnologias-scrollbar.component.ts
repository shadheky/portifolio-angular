import { Component, Input } from '@angular/core';
import Technology from '../../models/Technology';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-tecnologias-scrollbar',
  standalone: true,
  imports: [NgFor, NgIf, NgStyle],
  templateUrl: './tecnologias-scrollbar.component.html',
  styleUrl: './tecnologias-scrollbar.component.css'
})
export class TecnologiasScrollbarComponent {

  @Input() tecnologias:Technology[] = []
  tecnologiaEscolhida:Technology|null = this.tecnologias[0];

  ngOnInit() {
    this.tecnologiaEscolhida = this.tecnologias[0];
  }

  trocarTecnologia(tecnologia:Technology):void{
    this.tecnologiaEscolhida = null
    setTimeout(() => {
      this.tecnologiaEscolhida = tecnologia
      
    }, 1);
  }


}
