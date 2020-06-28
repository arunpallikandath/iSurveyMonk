import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  menuItems = [];
  private loggedInUser: string = '';
  private baseOrganization: string;
  private baseOrganizationRef: any;

  constructor() { }

  public getOrganization() {
    console.log(this.baseOrganizationRef);
    return this.baseOrganizationRef;
  }

  public setOrganization(organizationRef) {
    this.baseOrganizationRef = organizationRef;
  }

  public getLoggedInUser() {
    return this.loggedInUser;
  }

  public setLoggedInUser(user) {
    this.loggedInUser = user;
  }
}
