import { Component } from '@angular/core';
import { ApresentacaoComponent } from "../../components/apresentacao/apresentacao.component";
import { ProjetosComponent } from "../../components/projetos/projetos.component";
import { SobreMimComponent } from "../../components/sobre-mim/sobre-mim.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ApresentacaoComponent, ProjetosComponent, SobreMimComponent]
})
export class HomeComponent {

}
