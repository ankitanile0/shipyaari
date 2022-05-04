import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {
  
    constructor(){
       
    }
    show() {
        var _html = "";
      
        _html ="<div class=\"sbl-circ-bg\"><div class=\"loader\"></div></div>" 
        return _html;
       }

       hide() {
        var _html = "";
      
        _html ="" 
        return _html;
       }

}

