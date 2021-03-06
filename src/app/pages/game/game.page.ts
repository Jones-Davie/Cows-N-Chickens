import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  
  //init variables
  private user : User;
  private digits = 4;
  private minDigits : number = 4;
  private maxDigits : number = 8;

  private theNumber: number[] = [];
  private theGuess: number[] = [];
  
  private gameStart = false;
  private gameOver = false;
  private guessedOnce = false;

  private numCows : number = 0;
  private numChickens: number = 0;
  private totalGuesses : number = 0;
  private totalChickens: number = 0;
  private totalCows : number = 0;

  private previousGuesses = [];
  
  constructor( private userService : UserService ) {

   }

  ngOnInit() {
    //get the user information from the userService
    this.user = this.userService.getUser();

  }

  //generate random number based on the digit input
  generateNumber () {

    for (let i = 0; i < this.digits; i++) {
      let digit = Math.floor(Math.random() * 9);
        this.theNumber.push(digit);
    }
    console.log(this.theNumber); //for test-demo purposes log the number

  }

  //because the ionic <input type="number" maxlength="{{digits}}" is broken, this workaround is needed
  checkLength (event: KeyboardEvent) : void {
    if (this.gameStart && event.keyCode != 13 ) {
      let userGuess = (<HTMLInputElement> document.getElementById("userInput")).value;
      if (userGuess.length > this.digits ) {
        (<HTMLInputElement> document.getElementById("userInput")).value = userGuess.slice(0, -1)
      }
    }
  }


  //check the user input for correct values and act accordingly
  onKeydown(event: KeyboardEvent): void {

    //before the game starts the user has to input a number of digits to guess
    if (!this.gameStart) {
     
      let digitInput = ((<HTMLInputElement> document.getElementById("inputDigits")).value);
      let digit = parseInt(digitInput);
     
      //check the input vs the min-max digits of the game
      if ( event.keyCode === 13 && digit <= this.maxDigits && digit >= this.minDigits ) {
        this.digits = digit;
        this.generateNumber(); //generate number
        this.gameStart = true;
      }
    }

    //check if the game has started and enough numbers have been inputted to check the users guess
    if (this.gameStart) {

      let userGuess = (<HTMLInputElement> document.getElementById("userInput")).value;
    
      if (event.keyCode === 13 && userGuess.length == this.digits) {
        
        this.pushTheGuess( userGuess );
        this.checkGuess();
      }
    }
  }

  //convert userGuess to array
  pushTheGuess ( userGuess ) {
    
    this.resetTheGuess();

    for ( let i = 0; i < this.digits; i++ ) {
      let guessNumber = parseInt(userGuess.charAt(0));
      this.theGuess.push(guessNumber);
      userGuess = userGuess.slice(1);
    }
  }

  //check the users guess against the random number      
  checkGuess() { 

    this.resetCows();
    this.resetChickens();
    
    let tempNumber = this.theNumber.slice();  //make a copy of the number
    let tempGuess = this.theGuess.slice(); //make a copy of the Guess
    let tempStats = this.checkCows( tempNumber, tempGuess ); //filter the cows from the number and the users guess

    //check if the game is over after checking for cows
    if ( this.numCows == this.digits ) {
      
      this.setGameOver();
    
    } else { //else count the chickens in the remaining number
      
      this.checkChickens( tempStats ); 
      this.setGuessedOnce();
      this.addTotalGuess();
    }

    (<HTMLInputElement> document.getElementById("userInput")).value = "" ; //reset imput field
    
   }

   //check for Cows if the numbers are the same at specific index and filter them when found
  checkCows ( tempNumber, tempGuess ) {
    
      for ( let i = 0; i < this.digits ; i++ ) {
        if ( this.theNumber[i] == this.theGuess[i]) {
        this.addCows();
        this.addTotalCows();
        tempNumber[i] = null;
        tempGuess[i] = null;
      }
    }

    return { tempNumber, tempGuess }
  }

  //check for Chickens if the number is also in the array and filter them when found
  checkChickens ( tempStats ) {
    
    let tempNumber = tempStats.tempNumber;
    let tempGuess = tempStats.tempGuess;

    for (let i = 0; i < tempGuess.length; i++ ) {
      for ( let j = 0; j < tempNumber.length; j++ ) {
        if ( tempGuess[i] == tempNumber[j] && tempGuess[i] != null) {
          
          this.addChickens();
          this.addTotalChickens()
          tempGuess[i] = null;
          tempNumber[j] = null;
        }
      }
    }
  }

  //adding functions
  addCows () {
    this.numCows++;
  }
  
  addChickens () {
    this.numChickens++;
  }

  addTotalCows () {
    this.totalCows++;
  }

  addTotalChickens () {
    this.totalChickens++;
  }

  addTotalGuess () {
    this.totalGuesses++;
  }

  //setting functions
  setGameOver() {
    this.gameOver = !this.gameOver;
  }

  setGuessedOnce() {
    this.guessedOnce = !this.guessedOnce;
  }

  setGameStarted() {
    this.gameStart = !this.gameStart;
  }

  //resetfunctions
  resetTheGuess () {
    this.theGuess = [];
  }

  resetCows () {
    this.numCows = 0;
  }

  resetChickens () {
    this.numChickens = 0;
  }

  resetTotalCows () {
    this.totalCows = 0;
  }

  resetTotalChickens () {
    this.totalChickens = 0;
  }

  resetTotalGuesses () {
    this.totalGuesses = 0;
  }

  //play again and reset everything
  playAgain () {

    this.setGameStarted();
    this.setGameOver();
    this.setGuessedOnce();

    this.resetTheGuess();
    
    this.resetTotalCows();
    this.resetTotalChickens();
    this.resetTotalGuesses();

  }

}
