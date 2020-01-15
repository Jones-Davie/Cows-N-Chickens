import { Component, OnInit } from '@angular/core';
import { Guess } from '../game/classes/guess';
import { GameStatsService } from '../../services/game-stats.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  
  //init variables
  private digits : number = 4;

  private theNumber: number[] = [];
  private theGuess: number[] = [];
  
  private gameOver = false;
  private guessed = false;

  private numCows : number = 0;
  private numChickens: number = 0;
  private totalGuesses : number = 0;
  private totalChickens: number = 0;
  private totalCows : number = 0;
  private numHits : number = 0;

  private previousGuesses = [];
  
  constructor() {
    this.generateNumber(); //generate number
   }

  ngOnInit() {
    
  }

  //generate random number based on the digit input
  generateNumber () {
    for (let i = 0; i < this.digits; i++) {
      let digit = Math.floor(Math.random() * 9);
        this.theNumber.push(digit);

        console.log(this.theNumber);
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
    this.guessed = true;
    this.totalGuesses++;

    (<HTMLInputElement> document.getElementById("userInput")).value = "" ; //reset imput field
    
   }

   //check for Cows if the numbers are the same at specific index and filter them when found
  checkCows ( tempNumber ) {
      
      for ( let i = 0; i < this.digits ; i++ ) {
        if ( this.theNumber[i] == this.theGuess[i]) {
        this.numCows++;
        this.totalCows++;
        this.theGuess[i] = null;
        tempNumber[i] = null;
      }
    }

    if ( this.numCows == this.digits ) {
      this.gameOver = true;
    }

    return tempNumber
  }

  //check for Chickens if the number is also in the array and filter them when found
  checkChickens ( tempNumber ) {
    for (let i = 0; i < this.theGuess.length; i++ ) {
      for ( let j = 0; j < this.theNumber.length; j++ ) {
        if ( this.theGuess[i] == this.theNumber[j]) {
          this.numChickens++;
          this.totalChickens;
          this.theGuess[i] = null;
        }
      }
    }
  }

  reLoad() {
    window.location.reload();
  }
}
