
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, ViewEncapsulation } from '@angular/core';
import { ChannelEvent, HubConnection, SignalRHelperService } from 'app/core/services/signalR-helper.service';
import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { BroadcastEventListener, SignalR, SignalRConnection } from 'ng2-signalr';
import { format } from 'path';


import { combineLatest, forkJoin, from, Observable, of, Subject } from 'rxjs';
import { count, map, switchMap, tap } from 'rxjs/operators';

@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent
{
    connection: HubConnection;
    /**
     * Constructor
     */
    hubConnection: HubConnection;
    constructor(private http: HttpClient, private signalRHelper: SignalRHelperService, private signalR: SignalR)
    {
        
        
        
    }
    testCount() {
        let all_nums = of(1,7,5,10,10,20);
        let final_val = all_nums.pipe(count());
        final_val.subscribe(x=>console.log("The count is " + x));
    }
    testUsingSubjects() {
        const subject_test = new Subject();
        subject_test.subscribe({
            next: (v) => console.log(v)
        });
        subject_test.subscribe({
            next: (v) => console.log(v)
        })
        let final_val = of(1,2,3,4,5,6,7,8);
        final_val.subscribe(subject_test);
    }
    title = '';
    data: any;
    view: Observable<string>;
    quotes: Observable<any> = of([]);
    testAjaxRequest() {
            this.view = of("AJAX");
            this.title = "Using RxJs with angular";
            let a = this.getData();
    }
    getData() {
        const response = 
        this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(res => {
            this.data = res;
        });
        
    }
    _quotes = [];
    createQuotes() {
        this._quotes = [];
        var sub = new Subject();
        let calls = [];
        for (let i=1; i<=20; i++) {
            this._quotes.push({id: i, delay: null, value: null});
        }
        
    }
    testHermesRequest() {
        this.view = of("HERMES_MULTI");
        this._quotes = [];
        var sub = new Subject();
        let calls = [];
        for (let i=1; i<=20; i++) {
            this._quotes.push({id: i, delay: null, value: null});
            calls.push(this.http.get("http://hermes.test:64696/api/test/testMultiCall?id="+i));
        }
        this.quotes = of(this._quotes)
        
        // forkJoin(calls).subscribe(results => {

        // })
        combineLatest(
            calls
                .map(req => req
                    .pipe(
                        tap((response: any) => {
                            let q = this._quotes.find(fn => fn.id == response.id); 
                            if (q) { 
                                q.delay = response.delay;
                                q.value = response.value;
                            }
                        })
                    )
                )
        ).subscribe();
        // sub.subscribe({
        //     next: (data: any) => {
        //         this.http.get("http://hermes.test:64696/api/test/testMultiCall?id="+data.id).subscribe((response: any) => {
        //         data.delay = response.delay;
        //         data.value = response.value;
                    
        //         });
        //     },
        //     complete: () => {
        //         sub.unsubscribe();
        //     }
        
        // });
        
        this._quotes.forEach(fn => {
            sub.next(fn);
        });
        sub.complete();
        
    }
    
    
    // connectToSignalR(): Promise<boolean> {
    //     return new Promise<boolean>((resolve, reject) => {
    //         if (this.conX && (this.connectionState == ConnectionState.Connected || this.connectionState == ConnectionState.Reconnected)) {
    //             resolve(true);
    //             return;
    //         } 
    //         this.conX =this._signalR.createConnection();
    //         this.conX.start();
    //         this.conX.status.subscribe(s => {
    //             this.connectionState = s.value;
    //             if (s.value == ConnectionState.Connected || s.value == ConnectionState.Reconnected) {
    //                 this.conX.listenFor("OnEvent").subscribe((data: any) => {
    //                     if (data.Name == "client.conid") {
    //                         this._clientId = data.Data;
    //                         this.clientId = of(this._clientId);
    //                     }
    //                 });
    //                 this.conX.invoke("subscribe", "user");
                    
    //             } 
    //         });
    //     })
        
        
    // }
    hermesAPIUrl: string = "http://hermes.test:64696/"
    
    testSignalR() {
        this.createQuotes();
        this.quotes = of(this._quotes);
        this.view = of("HERMES_MULTI");
        if (!this.hubConnection) {
            this.signalRHelper.createHubConnection(this.hermesAPIUrl + "signalr").then(
                (con: HubConnection) => {
                    this.hubConnection = con;
                    con.startListening("OnQuote");
                    this.subscribeToHubEvent();
                }
            )
        } else {
            
            this.hubConnection.startListening("OnQuote");
            this.subscribeToHubEvent();
        }
        
        
    }
    subscribeToHubEvent() {
        this.hubConnection.onEvent
        .subscribe(
            (data:any) => {
                const q = data;
                let _q = this._quotes.find(fn => fn.id == q.id);
                if (_q) {
                    _q.delay = q.delay;
                    _q.value = q.value;
                    _q.message = q.message;
                }
            },
            (error) => {

            }
        );
        const url = `${this.hermesAPIUrl}api/test/testMultiSignalR?clientId=${this.hubConnection.hubCId}`;
        this.http.get(url).toPromise().catch(err => {
            console.error(err);
        });
    }
}

export enum ConnectionState {
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3,
    Reconnected = 4,
    Disconnected = 5
 
 }

