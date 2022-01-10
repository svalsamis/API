import { Injectable } from '@angular/core';
import { ConnectionState } from 'app/modules/admin/example/example.component';
import { resolve } from 'dns';
import { BroadcastEventListener, ConnectionStatus, IConnectionOptions, ISignalRConnection, SignalR, SignalRConfiguration, SignalRConnection } from 'ng2-signalr';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'

})

export class SignalRHelperService {

  constructor(private signalR: SignalR) { 
    
  }

  createHubConnection(url: string, hub: string = "eventhub"): Promise<HubConnection> {
    return new Promise<HubConnection>((resolve, reject) => {
      let config = this.createConfiguration(url, hub);
      let conX = this.signalR.createConnection(config);
      let con = new HubConnection(conX);
      con.clientIdSub.subscribe(
        (hubCId) => {
          resolve(con);
        });
    });
    
    
  }
  createConfiguration(url: string, hub: string ="eventhub"): IConnectionOptions {
    return {
      hubName: hub,
      url: url,
      executeEventsInZone: true,
      executeStatusChangeInZone: true,
      executeErrorsInZone: true,

    }
    
  }

}

export class ChannelEvent {
  Name: string;
  ChannelName: string;
  Timestamp: Date;
  Data: any;
  Json: any;
  isPrivateEvent: boolean;
  controller: string;
  requestId: number;
  error: RemoteError;
  providerId: number;
  command: string;

  constructor() {
      this.Timestamp = new Date();
  }

}
export class RemoteError {
  errorLogId: number;
  errorMessage: string;
  errorDetail: string;
}
export class HubConnection {
  public connection: ISignalRConnection;
  public clientIdSub = new Subject<string>();
  public hubCId: string;  
  public _connectionstatus: ConnectionState;
  public connectionstatus: Observable<ConnectionState>;
  public onEvent = new Subject<ChannelEvent>();
  private _onEvent: Subscription;
  private listeners: Array<BroadcastEventListener<any>> = [];
  public constructor(connection: SignalRConnection) {
    this.connection = connection;
     connection.errors.subscribe((error: any) => {
       console.log(error);
     });
     
     connection.start().then(con => {
        this.connection = con;
        con.listenFor("OnEvent").subscribe((ev: ChannelEvent) => {
          if (ev.Name == "client.conid") {
            this.hubCId = ev.Data;
            this.clientIdSub.next(this.hubCId);
          }
        });
        con.invoke("subscribe","user").then(res => {
          
        });
     })
    //  connection.status.subscribe((s: ConnectionStatus) => {
    //     this.connectionstatus = of(s.value);
    //     if (this.isConnected()) {
    //       this.connection.invoke("subscribe", "user");
    //     }
    //  }, (error) => {
    //    console.log(error);
    //  });
    //  connection.listenFor("OnEvent").subscribe((event: ChannelEvent) => {
    //   if (event.Name == "client.conid") {
    //     this.clientIdSub.next(event.Data);
    //     return;
    //   }
    //  });
    //  connection.start().catch(err => {

    //  });


  }
  
  isConnected(): boolean {
    return this._connectionstatus && 
      (this._connectionstatus == ConnectionState.Connected ||
        this._connectionstatus == ConnectionState.Reconnected)
  }
  
  stop() {
    if (this.connection) {
      this.connection.stop();
    }
  }
  startListening(eventName: string) {
    var listener = this.listeners.find(fn => fn.event && fn.event == eventName);
    if (listener) {
      if (listener.isStopped) {
        listener = this.connection.listenFor(eventName);
      }
    } else {
        listener = this.connection.listenFor(eventName);
        this.listeners.push(listener);
    }
    listener.subscribe((event: ChannelEvent) => {
      if (!event.error) {
        this.onEvent.next(event.Data);
      } else {
        this.onEvent.error(event.error);
      }
      
      
    });
  }
  stopListening(eventName: string) {
    let listener = this.listeners.find(fn => fn.event == eventName);
    if (listener) {
      this.connection.stopListening(listener);
    }
    this.listeners = this.listeners.filter(fn => fn.event != eventName);

    
  }
}
