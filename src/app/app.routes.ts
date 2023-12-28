import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjetoDetalhesComponent } from './components/projeto-detalhes/projeto-detalhes.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path:"projeto/:id",
        component:ProjetoDetalhesComponent
    }
];
