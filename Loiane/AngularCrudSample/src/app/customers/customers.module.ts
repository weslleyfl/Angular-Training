import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingMdule } from './customers.routing.module';
import { CustomersComponent } from './customers.component';

// const routes: Routes = [
//   { path: '', component: CustomersComponent }
// ];

@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingMdule
  ]
})
export class CustomersModule { }
