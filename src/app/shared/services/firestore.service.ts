import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {SignupUser} from '../models/signupuser.model';
import {FirebaseService} from './firebase.service';
import {user} from 'firebase-functions/lib/providers/auth';
import {GlobalsService} from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  organizationRef;

  constructor(firebaseService: FirebaseService, private globals: GlobalsService) {
    firebaseService.initializeFirebase();
  }

  public addContact(signupUser: SignupUser) {
    const db = firebase.firestore();
    const createdDate = {createdAt: firebase.firestore.FieldValue.serverTimestamp()};
    const signupUserWithDate = {...signupUser, ...createdDate};
    return db.collection('master_enquiries').add(signupUserWithDate);
  }

  public getUserInfo() {
    const userId = window.localStorage.getItem('loginId');
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
              this.globals.setOrganization(organizationRef);
              organizationRef.get()
                  .then(orgSnapshot => {
                    if (!orgSnapshot.empty) {
                      const orgDoc =  orgSnapshot.docs[0];
                      console.log(userId);
                      orgDoc.ref.collection('users').doc(userId).get().then((userSnapshot) => {
                        console.log(userSnapshot);
                        if (userSnapshot) {
                          const fullName = userSnapshot.get('fullName') || '';
                          const role = userSnapshot.get('role') || '';
                          console.log(fullName);
                          resolve({name: fullName, role, organization});
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

  public getCompanyRef(organizationName) {
    const db = firebase.firestore();
    const organizationRef =  db.collection(organizationName);
    return organizationRef.get()
      .then(querySnapshot => {
        if(!querySnapshot.empty) {
          return querySnapshot.docs[0];
        }
      });
  }

  public getCompanySubscribedDomains() {
    const companyRef =  this.globals.getOrganization();
    return companyRef.get()
        .then(querySnapshot => {
          if(!querySnapshot.empty) {
            return querySnapshot.docs[0].get('domains');
          }
        });
  }

  public getUserSubscribedDomains(userId) {
    return new Promise((resolve, reject) => {
      const companyRef =  this.globals.getOrganization();

      companyRef.get()
          .then(querySnapshot => {
            if(!querySnapshot.empty) {
              const userRef =  querySnapshot.docs[0].ref.collection('users').doc(userId);
              querySnapshot.docs[0].ref.collection('survey_assignments').get().then(surveyAssignments => {
                if (!surveyAssignments.empty) {
                  console.log(surveyAssignments);
                  resolve(surveyAssignments.doc().where('user', '==',userRef ).get('domain'));
                }
              });
            }
          });
    });

  }

  public saveSurveyAssignments(domains, userId) {
    const companyRef =  this.globals.getOrganization();
    return companyRef.get()
        .then(querySnapshot => {
          if(!querySnapshot.empty) {
            const userToUpdateRef = querySnapshot.docs[0].ref.collection('users').doc(userId);
            userToUpdateRef.set({surveys: domains}, {merge: true}).then((result) => {
              console.log('Document successfully written!');
            }).catch(error => {
              console.error('Error writing document: ', error);
            });

          }
        });
  }
}
