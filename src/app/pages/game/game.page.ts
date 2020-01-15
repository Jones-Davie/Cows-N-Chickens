import { Component, OnInit } from '@angular/core';
import { Guess } from '../game/classes/guess'

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  
  //init variables
  private digits = 4;
  private theNumber: number[] = [];
  private theGuess: number[] = [];
  private numCows : number = 0;
  private numChickens: number = 0; 
  private totalChickens: number;
  private totalCows : number;
  private numHits : number;
  private previousGuesses = [];
  
  constructor() {
    this.generateNumber();
   }

  ngOnInit() {
    
  }

  //generate random number based on the digit input
  generateNumber () {
    for (let i = 0; i < this.digits; i++) {
      let digit = Math.floor(Math.random() * 9);
        this.theNumber.push(digit);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    let userGuess = (<HTMLInputElement> document.getElementById("userInput")).value;
  
    if (event.keyCode === 13 && userGuess.length == this.digits) {
      
      this.pushTheGuess( userGuess );
      this.checkGuess();
    }
  }

  //convert userGuess to array
  pushTheGuess ( userGuess ) {
    this.theGuess = [];

    for ( let i = 0; i < this.digits; i++ ) {
      let guessNumber = parseInt(userGuess.charAt(0));
      this.theGuess.push(guessNumber);
      userGuess = userGuess.slice(1);
    }
  }


  //check the users guess against the random number      
  checkGuess() { 
    this.numCows = 0;
    this.numChickens = 0;
    let tempNumber = this.theNumber.slice();  //make a copy of the number

    tempNumber = this.checkCows(tempNumber); //filter the cows from the number and the users guess
    this.checkChickens( tempNumber ); //count the chickens in the remaining number

   }

   //check for Cows if the numbers are the same at specific index and filter them when found
  checkCows ( tempNumber ) {
      
      for ( let i = 0; i < this.digits ; i++ ) {
        if ( this.theNumber[i] == this.theGuess[i]) {
        this.numCows++;
        this.theGuess[i] = null;
        tempNumber[i] = null;
      }
    } 

    return tempNumber
  }

  //check for Chickens if the number is also in the array and filter them when found
  checkChickens ( tempNumber ) {
    for (let i = 0; i < this.theGuess.length; i++ ) {
      for ( let j = 0; j < this.theNumber.length; j++ ) {
        if ( this.theGuess[i] == this.theNumber[j]) {
          this.numChickens++;
          this.theGuess[i] = null;
        }
      }
    }
  }

}
