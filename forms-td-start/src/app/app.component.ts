import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;

  defaultQuestion: string = 'pet';
  answer: string = '';
  genders: string[] = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: '',
  };

  submitted: boolean = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    /*  this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    }) */

    // Abordagem mais indicada pra alterar um unico valor
    this.signupForm.form.patchValue({ userData: { username: suggestedName } });
  }

  /* onSubmit(form: NgForm) {
    console.log(form.value);
  } */

  onSubmit() {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // Podemos passar o mesmo objeto que em setValue para redefinir o formulario para
    // um estado em especifico
    this.signupForm.reset();
    alert('Submitted!');
  }
}
