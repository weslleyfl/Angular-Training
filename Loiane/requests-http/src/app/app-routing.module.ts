import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'pesquisa-reativa' },
  // lazy load Angular modules
  { path: 'cursos' , loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule) },

  { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },

  { path: 'upload', loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule) },

  { path: 'pesquisa-reativa', loadChildren: () => import('./reactive-search/reactive-search.module').then(m => m.ReactiveSearchModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
