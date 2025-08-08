import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';


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
    CommonModule,
],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = '';
  listaCliente: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento', 'acoes'];
  snack: MatSnackBar = inject(MatSnackBar);


  constructor(
    private service: ClienteService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.listaCliente = this.service.pesquisarCliente('');
  }

  pesquisar(){
    this.listaCliente = this.service.pesquisarCliente(this.nomeBusca);
  }

  preparaEditar(id: string){
    this.router.navigate(['/cadastro'], { queryParams: {"id": id} });
  }

  preparaDeletar(cliente: Cliente){
    cliente.deletando = true
  }

  deletar(cliente: Cliente){
    this.service.deletar(cliente);
    this.listaCliente = this.service.pesquisarCliente('')
    this.mostrarMensagem("Deletado com sucesso!")
  }

  mostrarMensagem(mensagem: string){
    this.snack.open(mensagem, "Ok");
  }
}
