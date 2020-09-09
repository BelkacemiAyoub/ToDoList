import { Component } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public tasks = [];

  constructor(private HttpClient: HttpClient) {}

  Submit(form: NgForm) {
    let headers = new HttpHeaders({ Chefing: 'true' });
    if (form.value.Tache.length > 0) {
      this.HttpClient.post(
        'http://localhost:8000/api/create',
        {
          task: form.value.Tache,
        },
        { headers: headers }
      ).subscribe((data) => {
        this.HttpClient.post<any>(
          'http://localhost:8000/api/get',
          {},
          { headers: headers }
        ).subscribe((data) => {
          console.log(data);
          this.tasks = data;
        });
      });
    }
  }

  remove(id) {
    let headers = new HttpHeaders({ Chefing: 'true' });
    this.HttpClient.post<any>(
      'http://localhost:8000/api/delete',
      {
        taskId: id,
      },
      { headers: headers }
    ).subscribe((data) => {
      this.HttpClient.post<any>(
        'http://localhost:8000/api/get',
        {},
        { headers: headers }
      ).subscribe((data) => {
        this.tasks = data;
      });
    });
  }

  update(id) {
    let headers = new HttpHeaders({ Chefing: 'true' });
    this.HttpClient.post<any>(
      'http://localhost:8000/api/update',
      {
        taskId: id,
      },
      { headers: headers }
    ).subscribe((data) => {
      this.HttpClient.post<any>(
        'http://localhost:8000/api/get',
        {},
        { headers: headers }
      ).subscribe((data) => {
        this.tasks = data;
      });
    });
  }

  ngOnInit() {
    let headers = new HttpHeaders({ Chefing: 'true' });
    this.HttpClient.post<any>(
      'http://localhost:8000/api/get',
      {},
      { headers: headers }
    ).subscribe((data) => {
      this.tasks = data;
    });
   
  }
}
