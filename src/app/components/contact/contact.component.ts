import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SignupUser} from '../../shared/models/signupuser.model';
import {FirestoreService} from '../../shared/services/firestore.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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


  constructor(private firestore: FirestoreService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.isPostSignup = false;
    this.loading = false;
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      phone: new FormControl(''),
      organization: new FormControl(''),
      reason: new FormControl(''),
      comments: new FormControl('')
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
        organization: this.signupForm.get('organization').value,
        email: this.signupForm.get('email').value,
        phone: this.signupForm.get('phone').value,
        reason: this.signupForm.get('reason').value,
        comments: this.signupForm.get('comments').value,
      };
      this.firestore.addContact(signupUser).then((result) => {
        console.log(result);
        this.http.post('https://us-central1-survey-monk-2020.cloudfunctions.net/sendContactNotification',
            {email: signupUser.email,
              fullName: signupUser.fullName,
              organization: signupUser.organization,
              phone: signupUser.phone,
              status: 'NEW'}
        )
            .subscribe((result) => {
              console.log(result);
            });
        this.isPostSignup = true;
        this.loading = true;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    } else {
      alert('form error');
    }
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  reasonSelected(reason) {
    this.signupForm.controls.reason.setValue(reason);
    this.reasonDropdownButton.nativeElement.classList.remove('is-active');
  }

  reasonDropdownClick(event) {

    this.reasonDropdownButton.nativeElement.classList.toggle('is-active');

    //  this.reasonDropdownButton.nativeElement.classList.remove('is-active');

  }

}
