import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProductosComponent } from './components/productos/productos.component'
import { VentasComponent } from './components/ventas/ventas.component'

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
