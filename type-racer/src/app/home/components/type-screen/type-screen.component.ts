import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-type-screen',
  templateUrl: './type-screen.component.html',
  styleUrls: ['./type-screen.component.scss']
})
export class TypeScreenComponent implements OnInit {
  paragraph: any = [
    {
      para: "As much money and life as you could want! The two things most human beings would choose above all - the trouble is, humans do have a knack of choosing precisely those things that are worst for them."
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.splitWord()

    var quoteInputElement = document.getElementById('typeInput')
    const quoteDisplay = document.getElementById('quote')
    
    quoteInputElement.addEventListener('input', () => {
      const arrayQuote = quoteDisplay.querySelectorAll('span')
      var arrayValue = $('#typeInput').val().split('')
      console.log(arrayValue)

      arrayQuote.forEach((characterSpan, index) => {
        var character = arrayValue[index]

        if (character == null) {
          characterSpan.style.color = "#000"
        } else if (character === characterSpan.innerText) {
          characterSpan.style.color = "#3bbb1b";
           
        } else if (character !== characterSpan.innerText) {
          characterSpan.style.color = "#c52121"
        } else {
          characterSpan.style.color = "#000"
        }
      })
    })
  }

  splitWord() {
    var quoteElement = document.getElementById("quote");
    var quote = this.paragraph[0].para

    quote.split('').forEach(char => {
      var charSpan = document.createElement('span')
      // charSpan.style.color = '#3bbb1b'
      charSpan.innerText = char
      quoteElement.appendChild(charSpan)
    })
  }
}
