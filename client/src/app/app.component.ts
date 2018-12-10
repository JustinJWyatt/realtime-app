import { Component } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import Recipient from '../models/Recipient';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public incomingMessages: string[] = [];
  public chatMessage: string = '';
  private connection: signalR.HubConnection;
  public visibleRecipient: Recipient;
  public recipients: Recipient[];

  ngOnInit(){
    this.connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub")
    .build();

    this.connection.start()
                   .then(() => {

                     if(this.recipients.find(x => x.id === 1)){

                        this.recipients.find(x => x.id === 1).online = false;

                     }else{
                        this.recipients.push({
                          id: 1,
                          name: 'username',
                          image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg',
                          online: true,
                          history: []
                        });
                     }
                   })
                   .catch(err => console.log(err));

    this.connection.on("ReceiveMessage", (message: string) => {
        this.incomingMessages.push(message);
    });

    this.connection.invoke('GetOnline', (online: number[]) => {

      //get data

      online.map(id => {
        //populate recipients based on id
      })
    });
  }

  onKeyUp(event: any){
    this.chatMessage = event.target.value;
  }

  sendChatMessage(): void {
    this.connection.invoke('SendMessage', this.chatMessage)
                   .then(() => { this.chatMessage = ''})
                   .catch(err => console.log(err));
  }

}
