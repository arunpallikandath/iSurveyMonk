import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {SignupUser} from '../models/signupuser.model';
import {FirebaseService} from './firebase.service';
import {user} from 'firebase-functions/lib/providers/auth';
import {GlobalsService} from './globals.service';
import * as moment from "moment";

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
      return new Promise((resolve, reject) => {
          const companyRef =  this.globals.getOrganization();
          companyRef.get()
              .then(querySnapshot => {
                  if(!querySnapshot.empty) {
                      resolve(querySnapshot.docs[0].ref.collection('domains'));
                  }
              });

      });
  }

  public getUserSubscribedDomains(userId) {
    return new Promise((resolve, reject) => {
      const companyRef =  this.globals.getOrganization();
      const userAssignments = []
      companyRef.get()
          .then(querySnapshot => {
            if(!querySnapshot.empty) {
              const userRef =  querySnapshot.docs[0].ref.collection('users').doc(userId);
              querySnapshot.docs[0].ref.collection('survey_assignments').where('user', '==', userRef).get().then(surveyAssignments => {
                  console.log(surveyAssignments);
                if (!surveyAssignments.empty) {
                  surveyAssignments.forEach(async (assignDocu) => {
                    let assignment = assignDocu.data();
                      console.log('dfdfdf');
                    if(assignment.domain) {
                        userAssignments.push({...assignment, id: assignDocu.id});
                    }
                  });
                  resolve(userAssignments);
                }
              });
            }
          });
    });
  }

  public saveSurveyAssignments(assignments, userId) {
    const companyRef =  this.globals.getOrganization();
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      companyRef.get()
          .then(querySnapshot => {
            if(!querySnapshot.empty) {
                console.log(querySnapshot.docs[0].id);
              const surveyAssignmentsRef = querySnapshot.docs[0].ref.collection('survey_assignments')
              assignments.forEach((assignment) => {
                console.log(querySnapshot.docs[0].get('companyCode'));
                assignment.user = db.doc(querySnapshot.docs[0].get('companyCode') + '/' + querySnapshot.docs[0].id + '/users/' + userId)
                  console.log(assignment);
                if(assignment.id) {
                    surveyAssignmentsRef.doc(assignment.id).set(assignment, {merge: true}).then((result) => {
                        console.log('Document successfully written!');
                    }).catch(error => {
                        console.error('Error writing document: ', error);
                    });
                } else {
                    surveyAssignmentsRef.add(assignment).then((result) => {
                        console.log('Document added!');
                    }).catch(error => {
                        console.error('Error adding document: ', error);
                    });
                }

              });
            }
          });
    });
  }

  public saveSurveyAssignmentTestDetails(assignmentId, questionAnswers) {
    const companyRef =  this.globals.getOrganization();
      const testDetails = {testDetails: {
              lastSavedOn: moment().format('MM/DD/YYYYTHH:mm:ss'), status: 'SAVE', questionAnswers: questionAnswers}}
      console.log(testDetails)
    return new Promise((resolve, reject) => {
      companyRef.get()
          .then(querySnapshot => {
            if(!querySnapshot.empty) {
              const assignmentDoc =  querySnapshot.docs[0].ref.collection('survey_assignments').doc(assignmentId);
              assignmentDoc.set(testDetails, {merge: true}).then((result) => {
                console.log('Document successfully written!');
              }).catch(error => {
                console.error('Error writing document: ', error);
              });
            }
          });
    });
  }

    public submitSurveyAssignmentTestDetails(assignmentId, questionAnswers) {
        const companyRef =  this.globals.getOrganization();
        const testDetails = {testDetails: {
                lastSavedOn: moment().format('MM/DD/YYYYTHH:mm:ss'), status: 'SUBMIT', questionAnswers: questionAnswers}}
        console.log(testDetails)
        return new Promise((resolve, reject) => {
            companyRef.get()
                .then(querySnapshot => {
                    if(!querySnapshot.empty) {
                        const assignmentDoc =  querySnapshot.docs[0].ref.collection('survey_assignments').doc(assignmentId);
                        assignmentDoc.set(testDetails, {merge: true}).then((result) => {
                            console.log('Document successfully written!');
                        }).catch(error => {
                            console.error('Error writing document: ', error);
                        });
                    }
                });
        });
    }

  public getQuestionsAndOptionsForAssignment(assignmentId) {
    return new Promise((resolve, reject) => {
      const companyRef =  this.globals.getOrganization();
      companyRef.get()
          .then(querySnapshot => {
            if (!querySnapshot.empty) {
              const assignmentDoc =  querySnapshot.docs[0].ref.collection('survey_assignments').doc(assignmentId)
              if(assignmentDoc) {
                assignmentDoc.get().then(assignment => {
                  assignment.data().domain.get().then(domain => {
                    const db = firebase.firestore();
                    const domainRef = db.collection('master_domains')
                    domainRef.doc(domain.id).get().then((domainSnapshot) => {
                      //Fetch questions
                     const promise1 =  domainSnapshot.ref.collection('questions').get();

                      // Fetch options
                      const promise2 = domainSnapshot.get('optionsRef').get();
                      //
                      Promise.all([promise1, promise2]).then((values) => {
                          const surveyQuestions = [];
                          values[0].forEach(question => {
                            surveyQuestions.push(question.data());
                          });

                          const optionsArray = []
                          values[1].ref.collection('options').get().then((options) => {
                            options.forEach((option) => {
                              optionsArray.push(option.data())
                            });
                            resolve({questions: surveyQuestions, options: optionsArray});
                          });
                        console.log(values);
                      });
                      //
                    });
                  });
                })
              }
            }
          });
    });
  }
}
