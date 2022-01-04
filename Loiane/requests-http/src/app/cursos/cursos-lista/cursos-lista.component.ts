import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Cursos2Service } from '../cursos2.service';


@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true,
})
export class CursosListaComponent implements OnInit {

  public cursos$: Observable<Curso[]> | undefined;
  errorMsg: string = '';
  error$ = new Subject<boolean>();

  deleteModalRef?: BsModalRef;

  // Fazendo uma referencia a uma variavel/atributo que esta no html/template
  @ViewChild('deleteModal', { static: true }) deleteModal: any;

  cursoSelecionado!: Curso;

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService ) {}

  ngOnInit() {
    this.onRefresh();
  }

  public onRefresh() {
    this.cursos$ = this.service.list().pipe(
      //tap(console.log)
      catchError((error) => {
        console.error('Erro recebido no cliente: ', error);
        this.errorMsg = error;
        //this.error$.next(true);
        this.handleError();
        return of([]);
      })
    );

    // this.service.list()
    // .pipe(
    //   catchError(error => empty())
    // )
    // .subscribe(
    //   dados => {
    //     console.log(dados);
    //   }
    //   // ,error => console.error(error),
    //   // () => console.log('Obserservable completo!')
    // );
  }

  // Metodo do Modal - Quando o usuario confirmar a deleçao, chamo o serviço de remover
  public onConfirmDelete() {

    this.service.remove(this.cursoSelecionado.id)
      .subscribe(
        (success) => {
          this.onRefresh();
          this.deleteModalRef?.hide();
        },
        (error) => {
          console.log('Erro onConfirmDelete ', error);
          this.deleteModalRef?.hide();
        }
      )
  }

  // Metodo do Modal
  public onDeclineDelete() {
    this.deleteModalRef?.hide(); // hide() vai fechar o popUp
  }



  public onEdit(id : number) {
    // Using relative paths
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  public onDelete(curso: Curso) {
    // this.cursoSelecionado = curso;
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    // Escutando o resultado do Subject -- EventEmitter
    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?');

    // Removo aqui se clicou em Ok
    result$?.asObservable()
    .pipe(
      take(1), // Vai abrir o modal so uma vez
      // O resulado aqui é true ou false
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
    )
    .subscribe( // retorno do observable service.remove()
      success => {
        this.onRefresh();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.');
      }
    );

  }

  public handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }
}
