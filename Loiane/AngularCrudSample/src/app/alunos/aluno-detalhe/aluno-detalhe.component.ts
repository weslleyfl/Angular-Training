import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss'],
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {
  public aluno: Aluno;
  private inscricao: Subscription;

  constructor(
    private alunoService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vai ser carregado via Resolver()
    // this.inscricao = this.route.params.subscribe(
    //   (params: any) => {
    //     let id = params['id'];
    //     this.aluno = this.alunoService.getAluno(id);

    //     if (this.aluno === null) {
    //         this.aluno = {};
    //     }
    //   }
    // );

    console.log('Acessando o ngOnInit do AlunoDetalheComponent ');

 // https://medium.com/@evertonwalker123/como-usar-o-resolve-no-angular-b28d6fa8a93e
  this.inscricao = this.route.data.subscribe(
      (info: { aluno: Aluno }) => {

        console.log('Recebendo o obj Aluno do resolver');
        console.log(info);

          if (info !== null) {
            this.aluno = info.aluno;
          } else {
            this.aluno = null;
          }
      });
  }

  editarContato(): void {
    // :id/editar
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
