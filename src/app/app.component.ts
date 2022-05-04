import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	 constructor(
    private loader:LoaderService
  ) { }
	 
	Loader:any;
  title = 'Shipyaari-ui';
}
