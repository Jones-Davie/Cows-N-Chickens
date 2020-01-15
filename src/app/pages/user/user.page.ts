import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  private birthDate : Date = new Date;
  private userName : String = "";

  constructor(
    private userService : UserService
    ) {}


  ngOnInit() {
    
  }

  setUser ( form ) {

    let user: User = new User();

    user.userName = form.value.userName;
    user.birthDate = new Date (form.value.birthDate);
    this.userService.setUser(user);
    
  }

}
