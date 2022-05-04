import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  move_top()
  {
  	var num:number = 2000;
  	var num1:number = 2000;
  	var count:number =2000;
  	for(let i:number = 0; i < count; i++)
  	{ 
  		setTimeout(() =>{
  			num--;
  		   num1--;
  		   window.scrollTo(num, num1);
  	    })
  	}
  }

}
