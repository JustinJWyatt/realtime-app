import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { HubConnection } from '@aspnet/signalr/dist/esm/HubConnection';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'client';

  public connection: HubConnection;

  ngOnInit() {
    this.connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/hub").build();

    this.connection.on("messageReceived", (username: string, message: string) => {
      console.log(username);
      console.log(message);
    });

    this.connection.start().then(() => console.log('connected')).catch(err => console.log(err));
  }

  sendMessageToChat(){
    this.connection.send("newMessage", "Justin Wyatt", "This is my initial message");
  }
}
