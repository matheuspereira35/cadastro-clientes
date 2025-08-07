import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';


@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    CommonModule
],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = '';
  listaCliente: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento'];

  constructor(private service : ClienteService){

  }

  ngOnInit(){
    this.listaCliente = this.service.pesquisarCliente('');
  }

  pesquisar(){
    this.listaCliente = this.service.pesquisarCliente(this.nomeBusca);
  }

}
