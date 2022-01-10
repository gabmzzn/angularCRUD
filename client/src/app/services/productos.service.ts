import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Producto } from '../models/Producto'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URI = 'https://ferreteria-pi.herokuapp.com/'

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get(`${this.API_URI}/productos`)
  }

  getUnProducto(cod: any) {
    return this.http.get(`${this.API_URI}/productos/${cod}`)
  }

  addProducto(producto: Producto) {
    return this.http.post(`${this.API_URI}/productos`, producto)
  }

  updateProducto(cod: any, producto: Producto) {
    return this.http.put(`${this.API_URI}/productos/${cod}`, producto)
  }

  deleteProducto(cod: any) {
    return this.http.delete(`${this.API_URI}/productos/${cod}`)
  }

}
