import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {AuthService} from '../../shared/services/auth.service';
import {FirestoreService} from '../../shared/services/firestore.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactComponent} from '../../components/contact/contact.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted = false;
  loading = false;
  loginError = false;
  loginErrorMessage: string;

  smLoginForm = new FormGroup({
    smUsername: new FormControl('', [Validators.required]),
    smPassword: new FormControl('', [Validators.required]),
  });

  constructor(private menuCtrl: MenuController, private auth: AuthService,
              private router: Router, private fireStore: FirestoreService,
              private modalCtrl: ModalController) {
    menuCtrl.enable(false).then((value) => {

    });
  }

  get f() { return this.smLoginForm.controls; }

  ngOnInit() {
    this.loading = false;
    this.loginError = false;

  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false).then((value) => {

    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.smLoginForm.invalid) {
      this.loading = true;
      return false ;
    }

    this.auth.authenticate(this.smLoginForm.get('smUsername').value,
        this.smLoginForm.get('smPassword').value).then((result) => {
      if (result && result.user && result.user.uid) {
        console.log(result.user);
        this.fireStore.getUserInfo().then((userInfo: any) => {
          console.log(userInfo.role);
          let homepage = '/';
          switch (userInfo.role) {
            case 'surveyadmin':
              homepage = 'survey-admin-home';
              break;
            case 'masteradmin':
              homepage = 'master-admin-home';
              break;
            case 'surveytaker':
              homepage = 'survey-taker-home';
              break;
            default:
              homepage = '/';
          }
          this.loading = false;
          this.router.navigate([homepage]).then((afternav) => {
            console.log(afternav)   ;
          });
        }, error => {
          console.log(error);
          this.loading = false;
        });

      } else {
        console.log('Authentication error');
        this.loading = false;
      }

    }, error => {
      this.loginErrorMessage = 'Invalid username password.';
      this.loginError = true;
      this.loading = false;
      console.log(error);
    });


  }

  async signUp() {
    const modal = await this.modalCtrl.create({
      component: ContactComponent,
      cssClass: 'modal-contact',
      backdropDismiss: false
    });
    return await modal.present();
  }
}
