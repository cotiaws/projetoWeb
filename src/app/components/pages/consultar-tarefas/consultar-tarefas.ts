import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule, /* Funções básicas do Angular */
    RouterLink /* Permite criar links para outras páginas (neste caso, para chamar a página de edição) */
  ],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {

    //Atributo para armazenar as tarefas obtidas da API
    //e exibi-las na página HTML
    tarefas = signal<any[]>([]);    

    /* Declarar um atributo do tipo HttpClient */
    private http = inject(HttpClient);

    /* Função executada ao abrir a página */
    ngOnInit() {
        //Fazendo uma requisição HTTP para o backend (consultar tarefas)
        this.http.get('http://localhost:8081/api/v1/tarefas')
          .subscribe((dados) => { //capturando a resposta do backend
              //armazenar os dados obtidos na variável tarefas
              this.tarefas.set(dados as any[]);
          })
    }

    /* Função para excluir uma tarefa */
    excluirTarefa(id : string) {

      //Abrir uma janela de confirmação
      if(confirm('Deseja realmente excluir esta tarefa?')) {

        //Fazendo uma requisição HTTP para o backend (excluir tarefa)
        this.http.delete('http://localhost:8081/api/v1/tarefas/' + id, { responseType: 'text' })
          .subscribe((resposta) => { //capturando a resposta do backend
              //exibir a resposta do backend
              alert(resposta);
              //executar uma nova consulta no backend
              this.ngOnInit();
          });
      }
    }
}
