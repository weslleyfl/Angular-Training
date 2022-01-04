import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursosDetalheComponent } from './cursos-detalhe/cursos-detalhe.component';
import { CursosComponent } from './cursos.component';

const cursosRoutes: Routes = [
  { path: '', component: CursosComponent },
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent },
  { path: ':id', component: CursosDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)], // forChild por ser um modulo de funcionalidade
  exports: [RouterModule]
})
export class CursosRoutingModule { }
