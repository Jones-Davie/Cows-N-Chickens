import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user : User;
  

  setUser ( user ) {
    
    this.user = new User();

    this.user.userName = user.userName;
    this.user.birthDate = user.birthDate;
    this.user.age = this.generateAge( user.birthDate );
    this.user.userID = uuid.v4();
  }

  generateAge ( birthDate ) {

    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }

    return age
  }

  getUser () {
    return this.user;
  }



  
}
