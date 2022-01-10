import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Factura } from '../models/Factura'

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  API_URI = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getFacturas() {
    return this.http.get(`${this.API_URI}/ventas`)
  }

  getUnFactura(id: number) {
    return this.http.get(`${this.API_URI}/ventas/${id}`)
  }

  addFactura(producto: Factura) {
    return this.http.post(`${this.API_URI}/ventas`, producto)
  }

  updateFactura(id: number, producto: Factura) {
    return this.http.put(`${this.API_URI}/ventas/${id}`, producto)
  }

  deleteFactura(id: any) {
    return this.http.delete(`${this.API_URI}/ventas/${id}`)
  }

}