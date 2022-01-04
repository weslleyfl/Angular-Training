import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Cidade } from '../shared/models/cidade';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';

// https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/
@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  // Data Drive - Formularios reativos
  //formulario: FormGroup; // esta na classe base

  estados : EstadoBr[];
  cidade: Cidade[];
  cidades: Cidade[];
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private fb: FormBuilder,
    private cepService: ConsultaCepService,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private verificaEmailService: VerificaEmailService
    ) {
      super();
     }

  ngOnInit(): void {

    // The individual form controls are now collected within a group.
    // this.formulario = new FormGroup({
    //   firstName: new FormControl(''),
    //   lastName: new FormControl(''),
    //   userName: new FormControl(''),
    //   city: new FormControl(''),
    //   state: new FormControl(''),
    //   zip: new FormControl(''),
    //   invalidCheck: new FormControl('')
    // });

     /// 1 forma formBuilder
    // this.formulario = this.fb.group({
    //   "firstName": ["", Validators.required],
    //   "lastName":["", Validators.required]
    //});

   // Para testar o serviço
   // this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    this.dropdownService.getEstadosBr()
    .subscribe((dados) => {
      this.estados = dados
    });

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    /// 2 forma formBuilder com subGroups
    this.formulario = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastName: ['', Validators.required],
      userName: [''],
      address: this.fb.group({ // Create a nested group
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', [Validators.required, FormValidations.cepValidator]],
        estado: ['']
      }),
      invalidCheck: [''],
      aliases: this.fb.array([ // Creating dynamic forms array - adiciono um controle (input)
        this.fb.control('')
      ]),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      inlineCheckbox1: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks(), // Creating dynamic forms array com metodo - adiciono valor
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      nome: [null]
    });

    // Para usar um evento reativo inves de colocar um envento no input tipo: (blur)="consultaCEP()
    this.formulario.get('address.zip').statusChanges
    .pipe(
      distinctUntilChanged(), //RxJs Only emit when the current value is different than the last
      tap(value => console.log('status CEP:', value)),
      switchMap(status => status === 'VALID' ? // switchMap - switch to a new observable - concatena o observable anterior e emite um novo
        this.cepService.consultaCEP(this.formulario.get('address.zip').value)
        : of({})
      )
    ).subscribe(dados => dados ? this.populaDadosForm(dados) : {});

    this.formulario.get('address.state').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : of({})),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
        tap(console.log)
      ).subscribe(cidades => this.cidades = cidades);

  }

  buildFrameworks() {
    const values = this.frameworks.map(x => new FormControl(false));

    return this.fb.array(values, FormValidations.requiredMinCheckbox(1));
  }

  requiredMinCheckbox2(min = 1) {
    const validator = (formArray: FormArray) => {
      // programaçao estruturada
      /*
      const values = formArray.controls;
      let totalChecked = 0;
      for (let index = 0; index < values.length; index++) {
        const element = values[index];
        if (element.value) {
          totalChecked += 1;
        }
      } */

      // progrmaça funcional
      const totalChecked = formArray.controls
      .map(v => v.value)
      .reduce((total, current) => current ? total + current : total, 0 );

      return totalChecked >= min ? null : {required: true} // retorno de objecto {}
    }

    return validator;
  }

  // public onSubmit() {
    // console.log("reactive form submitted");
    // console.log(this.formulario.value);
    // console.log(this.formulario);

    // passou para o submit da classe base - o codigo abaixo

    // // Fazendo uma copia do valores do formulario para a variavel valueSubmit
    // let valueSubmit = Object.assign({}, this.formulario.value);

    // valueSubmit = Object.assign(valueSubmit, {
    //   frameworks: valueSubmit.frameworks
    //   .map((v, i) => v ? this.frameworks[i] : null)
    //   .filter(v => v !== null)
    // });

    // console.log('Valor do submit ', valueSubmit);


    // if (this.formulario.valid) {

      // const campos = this.formulario.value;
      // // console.log(campos.address.zip);

      // this.http.post<any>('https://httpbin.org/post', JSON.stringify(campos))
      // .subscribe(dados => {
      //   console.log(dados);
      //   // Limpando o formulario formGroup
      //   //this.formulario.reset();
      //   this.resetar();
      // },
      // (error: any) => alert(error.message));

      // obter valor do formulario
      // this.formulario.get(campo).valid;

      // if(campos.address.zip != null || campos.address.zip !== undefined) {

      //   this.cepService.consultaCEP(campos.address.zip)
      //       .subscribe((dados) => {
      //         console.log(dados);
      //       });
      // }

  //   } else {
  //     console.log('formulario invalido');
  //     this.verificaValidacoesForm(this.formulario);
  //   }

  // }

  submit() {

    // Codigo especifico para este componente fica aqui

    console.log(this.formulario);
    // Fazendo uma copia do valores do formulario para a variavel valueSubmit
    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v, i) => v ? this.frameworks[i] : null)
      .filter(v => v !== null)
    });

    console.log('Valor do submit ', valueSubmit);

    const campos = this.formulario.value;

    this.http.post<any>('https://httpbin.org/post', JSON.stringify(campos))
    .subscribe(dados => {
      console.log(dados);
      // Limpando o formulario formGroup
      //this.formulario.reset();
      this.resetar();
    },
    (error: any) => alert(error.message));

  }

  // Use the getter syntax to create an aliases class property to retrieve the alias's form array control from the parent form group.
  get aliases() {
    return this.formulario.get('aliases') as FormArray;
  }

  // Define a method to dynamically insert an alias control into the alias's form array. The FormArray.push() method inserts the control as a new item in the array.
  addAlias(){
    this.aliases.push(this.fb.control(''));
  }

  // verificaValidacoesForm(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach((campo) => {
  //     console.log(campo);
  //     const controle = formGroup.get(campo);
  //     controle.markAsDirty();

  //     if (controle instanceof FormGroup) {
  //       this.verificaValidacoesForm(controle);
  //     }

  //   });
  // }

  // verificaEmailInvalio() {
  //   if(this.formulario.get('email').errors) {
  //     return this.formulario.get('email').errors['email']
  //   }
  // }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? { emailInvalido: true } : null)
      );
  }

  // public resetar(): void {
  //   this.formulario.reset();
  // }

  private resetaDadosForm() {
    this.formulario.patchValue({
      address:{
        state: null,
        zip: null,
        estado: null
      },
    });
  }

  updateProfile() {
    this.formulario.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  public consultaCEP(): void {
    // Nova variável "cep" somente com dígitos.
    let cep = this.formulario.get('address.zip').value;

    cep = cep.replace(/\D/g, '');

    if(cep != null && cep !== '') {

      this.resetaDadosForm();

      this.cepService.consultaCEP(cep).subscribe((dados: any) => {
        console.log(dados);
        this.populaDadosForm(dados);
      });
    }

   }

  private populaDadosForm(dados) {

    this.formulario.patchValue({
      address: {
        zip: dados.cep,
        city: dados.localidade,
        state: dados.uf,
        estado: dados.uf
      }
    });

    // console.log(dados);

    this.formulario.get('userName').setValue('@WeslleyLopes');

   }

  public setarCargo() {
   const cargo =  { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
   this.formulario.get('cargo').setValue(cargo);
  }

  public compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel)
                        : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

}
