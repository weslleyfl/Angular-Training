import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';

const customerRoutes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)], // forChild por ser um modulo de funcionalidade
  exports: [RouterModule]
})
export class CustomersRoutingMdule { }
