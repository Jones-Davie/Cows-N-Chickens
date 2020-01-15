import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  private userBirthDate : Date = new Date;
  private userName : String = "";

  constructor(
    private userService : UserService,
    private router : Router
    ) {}


  ngOnInit() {
    
  }

  //send data from the form to the userService
  setUser ( form ) {

    let user: User = new User();

    user.userName = form.value.userName;
    user.userBirthDate = new Date (form.value.userBirthDate);
    this.userService.setUser(user);

    this.router.navigate(['/game']);

  }

}
