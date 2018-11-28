import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  private connection: signalR.HubConnection;

  ngOnInit(){
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub")
    .build();

    this.connection.start().then(() => console.log('started signalr connection')).catch(err => console.log(err));


  }
}
