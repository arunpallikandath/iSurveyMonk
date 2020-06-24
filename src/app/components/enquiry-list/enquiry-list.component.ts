import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';


@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss'],
})
export class EnquiryListComponent implements OnInit {

  allEnquires = [];
  hasError = false;
  errorText = 'Unexpected error. Please try again or contact administrator'

  constructor(private fStore: FirestoreService) {

  }

  ngOnInit(): void {
    this.hasError = false;
    this.loadEnquiries();
  }

  private loadEnquiries() {
    this.fStore.getAllEnquiries().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docId = {docId: doc.id}
        this.allEnquires.push({...doc.data(), ...docId});
      });
    }, error => {
      console.log(error);
      this.hasError = true;
      this.errorText = 'Insufficient permission. Please contact administrator';
      this.allEnquires = [];
    });
  }

  deleteEnquiry(docId: string) {
    this.fStore.deleteEnquiry(docId).then(() => {
      this.allEnquires = this.allEnquires.filter((enquiry) => enquiry.docId !== docId);
      console.log('Deleted successfull');
    });
  }

  setupDemo() {

  }
}
