import { Component, OnInit, ViewChild } from '@angular/core'
import { ProductosService } from 'src/app/services/productos.service'
import { Producto } from '../../models/Producto'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ['Nombre', 'Stock', 'Acciones'];
  dataSource = new MatTableDataSource();

  productos: any = []

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  selProducto: Producto = {
    cod: undefined,
    nombre: undefined,
    precio: undefined,
    stock: undefined
  }


  constructor(private productosService: ProductosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProductos()
    // setTimeout(() => this.dataSource.paginator = this.paginator)
  }

  getProductos() {
    this.productosService.getProductos().subscribe(
      (res: any) => {
        console.log(res)
        this.productos = res[0]
        this.dataSource = new MatTableDataSource(this.productos)
        this.dataSource.paginator = this.paginator
      },
      err => console.error(err)
    )
  }

  addProducto() {
    this.productosService.addProducto(this.selProducto).subscribe(
      (res: any) => {
        this.getProductos()
        this.dataSource.paginator = this.paginator
        this.snackBar.open(`Producto "${this.selProducto.nombre}" añadido exitosamente`, '', { duration: 3000 })
        this.clear()
      },
      err => console.error(err)
    )
  }

  selectProducto(producto: Producto) {
    this.selProducto = producto
  }

  deleteProducto(producto: Producto) {
    this.productosService.deleteProducto(producto.cod).subscribe(
      (res: any) => {
        this.getProductos()
        this.dataSource.paginator = this.paginator
        this.snackBar.open(`Producto "${this.selProducto.nombre}" eliminado exitosamente`, '', { duration: 3000 })
        this.clear()
      },
      err => console.error(err)
    )
  }

  clear() {
    this.selProducto = { cod: undefined, nombre: undefined, precio: undefined, stock: undefined }
  }

}
