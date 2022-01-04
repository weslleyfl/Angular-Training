import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
// import { AppRoutes } from './app.routing';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursosDetalheComponent } from './cursos/cursos-detalhe/cursos-detalhe.component';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';
// import { CursosModule } from './cursos/cursos.module';
// import { AlunosModule } from './alunos/alunos.module';
// import { CustomersModule } from './customers/customers.module';
import { FormsModule } from '@angular/forms';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    //CursosComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    PaginaNaoEncontradaComponent
    //CursosDetalheComponent,
    //CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    //CursosModule,
    //AlunosModule,
    //CustomersModule,
    AppRoutingModule
    //AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
