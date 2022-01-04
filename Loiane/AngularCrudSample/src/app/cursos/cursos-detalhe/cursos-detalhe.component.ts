import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../servicos/cursos.service';

@Component({
  selector: 'app-cursos-detalhe',
  templateUrl: './cursos-detalhe.component.html',
  styleUrls: ['./cursos-detalhe.component.scss'],
})
export class CursosDetalheComponent implements OnInit, OnDestroy {
  public id: number;
  private inscricao: Subscription;
  public curso: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursosService
  ) {
    //this.id = this.route.snapshot.params['id'];
    //console.log(this.route);
  }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.id = params['id'];

      this.curso = this.cursoService.getCurso(this.id);

      if (this.curso == null) {
        this.router.navigate(['/cursos/naoEncontrado']);
      }
    });
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
