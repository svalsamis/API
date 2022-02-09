import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { InfodromioUser } from '../framework/InfodromioUser';
import { GlobalFramework } from '../framework/GlobalFramework';
import { GlobalService } from '../services/global-service.service';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<InfodromioUser> = new ReplaySubject<InfodromioUser>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: InfodromioUser)
    {
        // Store the value
        GlobalFramework.CurrentUser = value;
        
        this._user.next(value);
    }

    get user$(): Observable<InfodromioUser>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<InfodromioUser>
    {
        return of(GlobalFramework.CurrentUser).pipe(tap((user) => { this._user.next(user);}));
        
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: InfodromioUser): Observable<any>
    {
        return of(GlobalFramework.CurrentUser).pipe(tap((user) => { this._user.next(user);}));
        // return this._httpClient.patch<User>('api/common/user', {user}).pipe(
        //     map((response) => {
        //         this._user.next(response);
        //     })
        // );
    }
}
