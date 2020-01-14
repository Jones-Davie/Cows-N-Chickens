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
  private placeholder: number;
  private theNumber: number[] = [];
  private userGuess : String = "1234";
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
      this.checkGuess();
    }

  //check the users guess against the random number      
  checkGuess() { 
    this.pushTheGuess();

    //check for Cows if the numbers are the same at specific index
    for ( let i = 0; i < this.theNumber.length; i++ ) {
      if ( this.theNumber[i] == this.theGuess[i]) {
        this.numCows++;
        this.theGuess.splice( i , 1 );
      }
    }


    //check for Chickens if the number is also in the array
    for (let i = 0; i < this.theGuess.length; i++ ) {
      for ( let j = 0; j < this.theNumber.length; j++ ) {

        if ( this.theGuess[i] == this.theNumber[j]) {
          this.numChickens++;
          this.theGuess.splice( i , 1 );
        }
      }
    }
   }

  //convert userGuess to array
  pushTheGuess () {

    for ( let i = 0; i < this.digits; i++ ) {
      let guessNumber = parseInt(this.userGuess.charAt(0));
      this.theGuess.push(guessNumber);
      this.userGuess = this.userGuess.slice(1);
    }
  }

}
