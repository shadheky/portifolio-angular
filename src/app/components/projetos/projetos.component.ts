import { Component, OnInit } from '@angular/core';
import Project from '../../models/project';
import { ProjectsService } from '../../services/projects.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf], 
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css',
  
})
export class ProjetosComponent implements OnInit {

  projetos:Project[] = []
  
  constructor(private projectsService:ProjectsService){ }
  
  ngOnInit() {
    this.FindAllLuizPorjects()
  }

 
  //#region 
  // Métodos de comunicação com api
  FindAllLuizPorjects() {
    try {
      this.projectsService.findAllLuizProjects().subscribe(
        {
          next: (res) => {
            this.projetos = res;
          },
          error: () => {            
          }
        }
      );
      
    }catch(err) {

    }
  }
  //#endregion

}

