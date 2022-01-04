import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosGuard } from '../guards/alunos.guard';
import { AlunosDeactivateGuard } from '../guards/alunos-deactivate.guard';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

// const alunosRoutes: Routes = [
//   { path: 'alunos', component: AlunosComponent },
//   { path: 'alunos/novo', component: AlunoFormComponent },
//   { path: 'alunos/:id/editar', component: AlunoFormComponent },
//   { path: 'alunos/:id', component: AlunoDetalheComponent }

// ];

// Criando rotas filhas
const alunosRoutes: Routes = [
  {path: '', component: AlunosComponent,
  canActivateChild: [AlunosGuard],
  children: [ // componente pai -- colocar <router-outlet></router-outlet> no pai
      { path: 'novo', component: AlunoFormComponent },  // componentes filhos
      { path: ':id',
        component: AlunoDetalheComponent,
        resolve: {
          aluno: AlunoDetalheResolver
        }
      },
      { path: ':id/editar',
        component: AlunoFormComponent,
        canDeactivate: [AlunosDeactivateGuard]
      }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)], // forChild por ser um modulo de funcionalidade
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
