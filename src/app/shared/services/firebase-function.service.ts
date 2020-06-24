import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {FirebaseService} from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFunctionService {

  constructor(firebaseService: FirebaseService) {
    firebaseService.initializeFirebase();
  }


}
