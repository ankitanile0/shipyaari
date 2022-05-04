import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";
declare var $:any;
const url1 = 'assets/js/app.min.js';
const url2 = 'assets/js/scripts.js';
const url3 = 'assets/bundles/apexcharts/apexcharts.min.js';
const url4 = 'assets/bundles/dropzonejs/min/dropzone.min.js';
const url5 = 'assets/js/page/multiple-upload.js';
const url6 = 'assets/js/page/index.js';
const url7 = 'assets/js/custom.js';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  
})
export class LayoutComponent implements OnInit {

  loadAPI: Promise<any>;
  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise((resolve) => {
      //this.loadScript();
      for(let i = 1; i <= 7; i++) {
        this.loadScript(i);
      }
  });
  }

  /* 
  <script type="text/javascript" src="assets/js/app.min.js"></script>
    <script type="text/javascript" src="assets/js/scripts.js"></script>
  <script type="text/javascript" src="assets/bundles/apexcharts/apexcharts.min.js"></script>
  <script type="text/javascript" src="assets/bundles/dropzonejs/min/dropzone.min.js"></script>
  <script type="text/javascript" src="assets/js/page/multiple-upload.js"></script>
  <script type="text/javascript" src="assets/js/page/index.js"></script>
  <script type="text/javascript" src="assets/js/custom.js"></script>
  */

  public loadScript(id) {
    let node = document.createElement('script');
    node.src = eval('url'+id);
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
}

}
