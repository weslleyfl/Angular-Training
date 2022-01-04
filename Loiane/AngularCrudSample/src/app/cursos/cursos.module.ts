import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosRoutingModule } from './cursos.routing.module';
//import { RouterModule } from '@angular/router';

import { CursosComponent } from '../cursos/cursos.component';
import { CursosDetalheComponent } from './cursos-detalhe/cursos-detalhe.component';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { FormsModule } from '@angular/forms';
import { CursosService } from './servicos/cursos.service';



@NgModule({
  declarations: [
    CursosComponent,
    CursosDetalheComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CursosRoutingModule
    //RouterModule
  ],
  exports: [],
  providers: [CursosService]
})
export class CursosModule { }


