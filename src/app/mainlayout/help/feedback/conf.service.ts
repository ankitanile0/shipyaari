import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('./modules.json');
  }

}