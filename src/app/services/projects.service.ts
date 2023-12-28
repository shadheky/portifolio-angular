import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Project from '../models/project';
import { enviroment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

constructor(private http:HttpClient) { }
private readonly baseUrl = enviroment.apiUrl

findAllLuizProjects() : Observable<Project[]>{
  return this.http.get<Project[]>(this.baseUrl + "/projects/author/Luiz Alberto De Souza Abdoral Lopes")
}

findProjectById(id:string) : Observable<Project>{
  return this.http.get<Project>(this.baseUrl + `/projects/${id}`)
}


}
