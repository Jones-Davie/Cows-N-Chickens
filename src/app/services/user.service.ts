declare var require: any;

import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  //private require: any;
  user : User = new User();
  private uuidv4 = require('uuid/v4');


  //set a active user
  setUser ( user ) {
    
    this.user.userName = user.userName;
    this.user.userBirthDate = user.userBirthDate;
    
    this.user.userAge = this.generateAge( user.userBirthDate );
    this.user.userID = this.uuidv4();

  }

  //generate age based on birthdate and current date
  generateAge ( birthDate : Date ) {

    let today = new Date();
    let age = today.getFullYear() - this.user.userBirthDate.getFullYear();
    let month = today.getMonth() - this.user.userBirthDate.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < this.user.userBirthDate.getDate())) 
    {
        age--;
    }

    return age 
  }

  getUser () {

    return this.user;
  }



  
}
