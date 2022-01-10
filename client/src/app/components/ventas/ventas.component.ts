import { Component, OnInit, ViewChild } from '@angular/core'
import { Factura } from '../../models/Factura'
import { VentasService } from '../../services/ventas.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ['Fecha', 'Apellido', 'Nombre', 'Monto'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  facturas: any = []

  factura: Factura = {
    id: undefined,
    apellido: undefined,
    nombre: undefined,
    fecha: undefined,
    monto: undefined
  }

  constructor(private ventasService: VentasService) { }

  ngOnInit(): void {
    this.getFacturas()
    this.dataSource.paginator = this.paginator
  }

  getFacturas() {
    this.ventasService.getFacturas().subscribe(
      (res: any) => {
        this.facturas = res[0]
        this.dataSource = new MatTableDataSource(this.facturas)
        this.dataSource.paginator = this.paginator
      },
      err => console.error(err)
    )
  }
}
