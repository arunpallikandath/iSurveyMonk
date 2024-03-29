import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {SignupUser} from '../models/signupuser.model';
import {FirebaseService} from './firebase.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {falseIfMissing} from 'protractor/built/util';
import {tap} from 'rxjs/operators';
import {GlobalsService} from './globals.service';


@Injectable()
export class CanActivateAuthGuard implements CanActivate {
  constructor( private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log(this.auth.loggedIn.subscribe((val) => console.log(val)));
    return this.auth.loggedIn$;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new Subject<boolean>();
  public loggedIn$ = this.loggedIn.asObservable();

  constructor(firebaseService: FirebaseService, private router: Router, private globals: GlobalsService) {
    firebaseService.initializeFirebase();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        window.localStorage.setItem('loginId', user.uid);
        this.loggedIn.next(true);
      } else {
        window.localStorage.removeItem('loginId');
        this.loggedIn.next(false);
        this.router.navigate(['/']);
      }
    });
  }

  signUp(email: string, password, userProfile: SignupUser) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
      })
      .catch((error) => {
        console.log('Error:' + error);
    });

  }

  authenticate(email: string, password: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            console.log(result);
            window.localStorage.setItem('loginId', result.user.uid);
            this.loggedIn.next( true);
            resolve(result);
          }, error => {
            window.localStorage.removeItem('loginId');
            this.loggedIn.next( false);
            reject();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  logout() {
    return firebase.auth().signOut();
  }
}
