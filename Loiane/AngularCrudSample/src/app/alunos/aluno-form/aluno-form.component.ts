import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { IformCandeactivate } from 'src/app/guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.scss'],
})
export class AlunoFormComponent implements OnInit, OnDestroy, IformCandeactivate {
  public aluno: any = {};
  private inscricao: Subscription;
  private formMudou: boolean = false;

  constructor(
    private alunoService: AlunosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => {
      let id = params['id'];
      this.aluno = this.alunoService.getAluno(id);

      if (this.aluno === null) {
        this.aluno = {};
      }
    });
  }

  onInput(): void {
    this.formMudou = true;
    console.log('Mudou');
  }

  podeDesativar(): boolean {
    return this.podeMudarRota();
  }

  private podeMudarRota(): boolean {
    if (this.formMudou && this.confirmarSaidaPagina() === false) {
      // confirm('Tem certeza que deseja sair dessa página?')
      return false;
    }
    return true;
  }

  private confirmarSaidaPagina(): boolean {
    return confirm('Tem certeza que deseja sair dessa página?');
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
