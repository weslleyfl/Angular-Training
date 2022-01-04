import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { DiretivaNgifComponent } from './diretiva-ngif/diretiva-ngif.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FundoAmareloDirective } from './shared/diretivas/fundo-amarelo.directive';
import { DiretivasCustomizadasComponent } from './diretivas-customizadas/diretivas-customizadas.component';
import { HighlightMouseDirective } from './shared/diretivas/highlight-mouse.directive';
import { HightlightDirective } from './shared/diretivas/hightlight.directive';
import { NgElseDirective } from './shared/diretivas/ng-else.directive';
import { HeroesComponent } from './hero/heroes/heroes.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './shared/pipes/camel-case.pipe';
import { SettingsService } from './shared/servicos/settings.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    DiretivaNgifComponent,
    FundoAmareloDirective,
    DiretivasCustomizadasComponent,
    HighlightMouseDirective,
    HightlightDirective,
    NgElseDirective,
    HeroesComponent,
    ExemplosPipesComponent,
    CamelCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  // providers: [ { provide: LOCALE_ID, useValue: 'pt-BR' } ],
  providers: [
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
