import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private stompClient!: Client;
  private messageSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS('http://localhost:8083/ws');
    this.stompClient = new Client({
      webSocketFactory: () => ws,
      debug: (str) => { console.log(str); }
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.activate();
    }
  }

  getMessages() {
    return this.messageSubject.asObservable();
  }

}
