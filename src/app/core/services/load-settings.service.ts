import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFramework, AppSettings } from '../framework/GlobalFramework';
import { CommonUtils } from 'app/shared/common.utils';


@Injectable({
  providedIn: 'root'
})
export class LoadSettingsService {
public onLoaded: Subject<any> = new Subject<any>();
constructor(private http: HttpClient) { }
public loadSettings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      var headers = new HttpHeaders;
      headers = headers.append('pragma', 'no-cache');
      headers = headers.append('cache-control', 'no-cache');
      headers = headers.append('Content-Type', 'application/json');
    
      this.http.get('/assets/appsettings.json', { headers: headers, responseType: 'json'}).toPromise().then((data: any) => {
        let protocol = "";
        if (data.protocol) { protocol = data.protocol; }
        
        GlobalFramework.AppSettings = new AppSettings();
        GlobalFramework.AppSettings.testMode = (data.testMode == true);
        GlobalFramework.AppSettings.hubName = data.hubName;
        if (data.version) {
          GlobalFramework.AppSettings.version = data.version;
        } else {
          GlobalFramework.AppSettings.version = "1";
        }
        if (!protocol || protocol == "" || protocol == "app" || protocol == null) {
            GlobalFramework.AppSettings.hermesAPIUrl = `/${data.hermesAPIUrl}/`;  
            GlobalFramework.AppSettings.hermesHubUrl = `/${data.hermesHubUrl}/`;  
            GlobalFramework.AppSettings.hermesHubBaseUrl = `/${data.hermesHubBaseUrl}/`;  

        } else {
            GlobalFramework.AppSettings.hermesAPIUrl = `${protocol}://${data.hermesAPIUrl}/`;  
            GlobalFramework.AppSettings.hermesHubUrl = `${protocol}://${data.hermesHubUrl}/`;  
            GlobalFramework.AppSettings.hermesHubBaseUrl = `${protocol}://${data.hermesHubBaseUrl}/`;  
        }
        if (protocol == "app" && !CommonUtils.isNullOrWhitespace(data.app)) { GlobalFramework.AppSettings.hermesAPIUrl = `${GlobalFramework.AppSettings.hermesAPIUrl}${data.app}/`}
          
        GlobalFramework.AppSettings.hermesAPIUrl_Clients = `${GlobalFramework.AppSettings.hermesAPIUrl}api/clients/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Applications = `${GlobalFramework.AppSettings.hermesAPIUrl}api/proposals/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Auth = `${GlobalFramework.AppSettings.hermesAPIUrl}api/auth/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Consumers = `${GlobalFramework.AppSettings.hermesAPIUrl}api/consumers/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Documents = `${GlobalFramework.AppSettings.hermesAPIUrl}api/documents/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Production = `${GlobalFramework.AppSettings.hermesAPIUrl}api/production/`;
        GlobalFramework.AppSettings.hermesAPIUrl_ePos = `${GlobalFramework.AppSettings.hermesAPIUrl}api/epos/`;
        GlobalFramework.AppSettings.hermesAPIUrl_QuotationAuto = `${GlobalFramework.AppSettings.hermesAPIUrl}api/quotationauto/`;
        GlobalFramework.AppSettings.hermesAPIUrl_QuotationData = `${GlobalFramework.AppSettings.hermesAPIUrl}api/quotationdata/`;
        GlobalFramework.AppSettings.hermesAPIUrl_B2CModule = `${GlobalFramework.AppSettings.hermesAPIUrl}api/b2cmodule/`;
        GlobalFramework.AppSettings.hermesAPIUrl_Admin = `${GlobalFramework.AppSettings.hermesAPIUrl}api/admin/`;
          
        GlobalFramework.AppSettings.googleAPIKey = data.googleAPIKey;
        GlobalFramework.AppSettings.hermesCommunitySpId = data.hermesCommunitySpId;
        this.onLoaded.next(null);
          resolve(null);
        });

    });
  

  }

}
