import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { SHA512 } from 'crypto-js';
import { getgid } from 'process';
import { AppSettings, GlobalFramework } from '../framework/GlobalFramework';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  headers: HttpHeaders;
  constructor(private userSrv: UserService) { 
    userSrv.user$.subscribe(() => {
      this.headers = this.doCreateHeaders();
    });
  }
  public getHeaders() {
    return this.doCreateHeaders();
  }
  public get AppSettings(): AppSettings {
    return GlobalFramework.AppSettings;
  }
  getHeadersObject(headers: any) {
    let res = headers;
    if (!res) { res = {}; }
    // res['Content-Type'] = 'application/json';
    this.headersArray.forEach(fn => {
            res[fn.name] = fn.value;
    });
    return res;
  }
  public headersArray: Array<any> = [];
  doCreateHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    let salespointId = GlobalFramework.CurrentUser.salespointId || 0;
    let userId = GlobalFramework.CurrentUser.userId || 0;
    let token = GlobalFramework.CurrentUser.token;
    let portalId = GlobalFramework.CurrentUser.portalId.toString();
    let sessionId = GlobalFramework.AppSettings.sessionId;
    let hubCId = this.AppSettings.hubCId;
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('salesPointId', salespointId.toString());
    headers = headers.set('userId', userId.toString());
    headers = headers.set('token', token);
    headers = headers.set('portalServiceId', portalId);
    headers = headers.set('idrKey', token);
    headers = headers.set('sessionId', sessionId);
    headers = headers.set('requestGUID', "null");
    
    headers = headers.set('hubCId', hubCId);
    headers = headers.set('hermesAppProfile', 'B2B');
    
    const key = salespointId.toString() + userId.toString() + GlobalFramework.CurrentUser.token + GlobalFramework.CurrentUser.portalId.toString();
    const hash = SHA512(key).toString();
    const hKey = hash.toLowerCase();

    headers = headers.set('hkey', hKey);
    this.headersArray = [];
    headers.keys().forEach((k) => {
            this.headersArray.push({name: k, value: headers.get(k)});
    });    
    return headers;
 }
}
