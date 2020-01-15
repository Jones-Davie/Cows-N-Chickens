import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  

  constructor(
    private userService : UserService,
    private user = new User()
    ) {}

  ngOnInit() {
    
  }

  setUser () {

  }

}
