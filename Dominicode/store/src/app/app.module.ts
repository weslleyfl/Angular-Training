import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosModule } from './cursos/cursos.module';
import { MeuPrimeiroComponent } from './meu-primeiro/meu-primeiro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { MeuFormModule } from './meu-form/meu-form.module';
import { CicloComponent } from './ciclo/ciclo.component';

@NgModule({
  declarations:[
    AppComponent,
    MeuPrimeiroComponent,
    DataBindingComponent,
    CicloComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CursosModule,
    BrowserAnimationsModule,
    MeuFormModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
