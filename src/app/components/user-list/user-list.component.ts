import { Component, OnInit } from '@angular/core';
import {FirestoreService} from '../../shared/services/firestore.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  hasError = false;
  errorText: string = '';
  allUsers = [];

  constructor(private fStore: FirestoreService, ) { }

  ngOnInit(): void {
    this.hasError = false;
    this.loadUserList();
  }

  private loadUserList() {
    this.fStore.getAllOrganisationUsers(organizationTeam).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docId = {docId: doc.id}
        this.allUsers.push({...doc.data(), ...docId});
      });
    }, error => {
      console.log(error);
      this.hasError = true;
      this.errorText = 'Insufficient permission. Please contact administrator';
      this.allUsers = [];
    });
  }

}
