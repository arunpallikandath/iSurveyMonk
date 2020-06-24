import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {SignupUser} from '../models/signupuser.model';
import {FirebaseService} from './firebase.service';
import {user} from 'firebase-functions/lib/providers/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  organizationRef;

  constructor(firebaseService: FirebaseService) {
    firebaseService.initializeFirebase();
  }

  public addContact(signupUser: SignupUser) {
    const db = firebase.firestore();
    const createdDate = {createdAt: firebase.firestore.FieldValue.serverTimestamp()};
    const signupUserWithDate = {...signupUser, ...createdDate};
    return db.collection('master_enquiries').add(signupUserWithDate);
  }

  public getUserInfo(userId) {
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('master_users').doc(userId).get()
        .then((masterUserSnapshot) => {
          console.log(masterUserSnapshot);
          if (masterUserSnapshot) {
            if (masterUserSnapshot.get('role') === 'masteradmin'){
              const fullName = masterUserSnapshot.get('fullName') || 'Anonymous';
              const role = masterUserSnapshot.get('role') || 'Anonymous';
              resolve({name: fullName, role});
            } else {
              const organization = masterUserSnapshot.get('organization');
              const organizationRef =  db.collection(organization);
              organizationRef.get()
                  .then(orgSnapshot => {
                    if (!orgSnapshot.empty) {
                      const orgDoc =  orgSnapshot.docs[0];
                      console.log(userId);
                      orgDoc.ref.collection('users').doc(userId).get().then((userSnapshot) => {
                        console.log(userSnapshot);
                        if (userSnapshot) {
                          const fullName = userSnapshot.get('fullName') || 'Anonymous';
                          const role = userSnapshot.get('role') || 'Anonymous';
                          console.log(fullName);
                          resolve({name: fullName, role});
                        } else {
                          reject();
                        }
                      });
                    } else {
                      reject();
                    }
                  });
            }
          } else {
            reject();
          }
        });
    });
  }

  public getAllEnquiries() {
    const db = firebase.firestore();
    const contactsRef =  db.collection('master_enquiries');
    return contactsRef.get();
  }

  public deleteEnquiry(docId) {
    const db = firebase.firestore();
    return db.collection('master_enquiries').doc(docId).delete();
  }

  public getAllOrganisationUsers(organizationName) {
    const db = firebase.firestore();
    const organizationRef =  db.collection(organizationName);
    return organizationRef.get()
      .then(querySnapshot => {
        if(!querySnapshot.empty) {
          return querySnapshot.docs[0];
        }
      });

  }
}
