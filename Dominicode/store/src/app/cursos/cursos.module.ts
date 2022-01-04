import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosComponent } from './cursos.component';
import { CursosDetalheComponent } from './cursos-detalhe/cursos-detalhe.component';
import { MeuSegundoComponent } from './meu-segundo/meu-segundo.component';

@NgModule({
  declarations: [
    CursosComponent,
    CursosDetalheComponent,
    MeuSegundoComponent

  ],
  imports:
  [
    CommonModule,
    FormsModule
  ],
  exports: [
    CursosComponent,
    CursosDetalheComponent
  ],
})
export class CursosModule {}
