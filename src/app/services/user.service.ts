import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private user : User;
  private uuidv4 = require('uuid/v4');


  setUser ( user ) {
    
    this.user = new User();

    this.user.userName = user.userName;
    this.user.birthDate = new Date (user.birthDate);
    
    this.user.age = this.generateAge( user.birthDate );
    this.user.userID = this.uuidv4();

  }

  generateAge ( birthDate : Date ) {

    let today = new Date();
    let age = today.getFullYear() - this.user.birthDate.getFullYear();
    let month = today.getMonth() - this.user.birthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < this.user.birthDate.getDate())) 
    {
        age--;
    }

    return age 
  }

  getUser () {
    return this.user;
  }



  
}
