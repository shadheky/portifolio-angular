import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import Project from '../../models/project';
import { NgIf } from '@angular/common';
import { TecnologiasScrollbarComponent } from "../tecnologias-scrollbar/tecnologias-scrollbar.component";

@Component({
    selector: 'app-projeto-detalhes',
    templateUrl: './projeto-detalhes.component.html',
    styleUrls: ['./projeto-detalhes.component.css'],
    standalone: true,
    imports: [NgIf, TecnologiasScrollbarComponent, RouterLink]
})
export class ProjetoDetalhesComponent implements OnInit {

  projeto?:Project
  estado:{projeto:boolean, tecnologias:boolean} = {
    projeto: true,
    tecnologias:false
  }


  constructor( private route:ActivatedRoute, private projectService:ProjectsService ) { }

  ngOnInit() {
    const idPath = this.route.snapshot.paramMap.get('id')
    const pathValue = idPath === null ? "" : idPath;

    this.findProjectById(pathValue);

  }


  irParaAbaProjetos(event:any) {
    this.estado.projeto = true;
    this.estado.tecnologias = false;

    this.removerOpcaoAtiva();
    event.target.classList.add('opcao-selecionada');
  }

  irParaAbaTecnologias(event:any) {
    this.estado.projeto = false;
    this.estado.tecnologias = true;

    this.removerOpcaoAtiva();
    event.target.classList.add('opcao-selecionada');
  }

  removerOpcaoAtiva() {
    document.querySelectorAll('.opcao-selecionada').forEach( x => x.classList.remove('opcao-selecionada'))
  }

  //#region 
  //Métodos de acesso as apis

  findProjectById(id:string){
    this.projectService.findProjectById(id).subscribe({
      next: (projeto:Project) => {
        this.projeto = projeto
      }
    })
  }

  //#endregion

}
