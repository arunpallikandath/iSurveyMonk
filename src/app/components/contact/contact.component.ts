import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SignupUser} from '../../shared/models/signupuser.model';
import {FirestoreService} from '../../shared/services/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {


  @ViewChild('reasonDropdownButton') reasonDropdownButton: ElementRef;

  public isPostSignup = false;
  submitted = false;
  loading = false;
  signupForm;


  constructor(private firestore: FirestoreService, private router: Router, private http: HttpClient,
              private modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.isPostSignup = false;
    this.loading = false;
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl(''),
      company: new FormControl(''),
      country: new FormControl(''),
      hearFrom: new FormControl(''),
      helpOn: new FormControl(''),
      description: new FormControl('')
    });
    console.log('Contact');
  }

  // conveniencc
  get f() { return this.signupForm.controls; }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.loading = true;
    if (!this.signupForm.invalid) {
      const signupUser: SignupUser = {
        fullName: this.signupForm.get('fullName').value,
        company: this.signupForm.get('company').value,
        country: this.signupForm.get('country').value,
        email: this.signupForm.get('email').value,
        phone: this.signupForm.get('phone').value,
        hearFrom: this.signupForm.get('hearFrom').value,
        helpOn: this.signupForm.get('helpOn').value,
        description: this.signupForm.get('description').value,
      };
      this.firestore.addContact(signupUser).then((result) => {
        console.log(result);
        this.http.post('https://us-central1-survey-monk-2020.cloudfunctions.net/sendContactNotification',
            {email: signupUser.email,
              fullName: signupUser.fullName,
              phone: signupUser.phone,
              country: signupUser.country,
              company: signupUser.company,
              hearFrom: signupUser.hearFrom,
              helpOn: signupUser.helpOn,
              description: signupUser.description,
              status: 'NEW'})
            .subscribe((response) => {
              console.log(response);
            });
        this.isPostSignup = true;
        this.loading = true;
        this.submitted = true;
      }, error => {
        console.log(error);
        this.loading = false;
        this.submitted = false;
      });
    } else {
      this.submitted = false;
      this.loading = false;
      alert('form error');
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    }).then(r => {});
  }


}
