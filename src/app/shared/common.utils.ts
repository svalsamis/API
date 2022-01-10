

import { Subscription } from 'rxjs';
import { isMoment } from 'moment';
import { FormGroup, FormControl, NgForm, AbstractControl, DefaultValueAccessor } from '@angular/forms';
import {addDays, addMonths, addYears} from 'date-fns';


import { FuseMockApiUtils } from '@fuse/lib/mock-api';
import { FuseAlertService } from '@fuse/components/alert';
// declare function addMonthsToDate(toDate, months);
// declare function addDaysToDate(toDate, days);
// declare function addYearsToDate(toDate, years);

export class CommonUtils {
    private static  validChars = ['A', 'B', 'E', 'H', 'I', 'K', 'M', 'N', 'O', 'R', 'T', 'X', 'Y', 'Z',
        'a', 'b', 'e', 'h', 'i', 'k', 'm', 'n', 'o', 'r', 't', 'x', 'y', 'z',
        'Α', 'Β', 'Ε', 'Η', 'Ι', 'Κ', 'Μ', 'Ν', 'Ο', 'Ρ', 'Τ', 'Χ', 'Υ', 'Ζ',
        'α', 'β', 'ε', 'η', 'ι', 'κ', 'μ', 'ν', 'ο', 'ρ', 'τ', 'χ', 'υ', 'ζ',
        'ά',      'έ', 'ή', 'ί',                'ό',                'ύ',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    private static  validPlateLetters = ['Α', 'Β', 'Ε', 'Η', 'Ι', 'Κ', 'Μ', 'Ν', 'Ο', 'Ρ', 'Τ', 'Χ', 'Υ', 'Ζ'];

    private static digitChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


    public static checkUrl(url: any) {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }
    public static isPlateLetter(c) {
        return this.validPlateLetters.includes(c);
        
    }
    
    public static replaceAll(source: string, find: string, replacewith: string = ''): string {
        if (this.isNullOrWhitespace(source)) { return source; }
        if (!find) { return source; }
        return source.split(find).join(replacewith); 
    }
    public static resetSubscription(sub: Subscription) {
        if (sub) { sub.unsubscribe(); }
    }
    public static isNullOrEmptyArray(arr: any) {
        if (!this.hasValue(arr)) {return true;}
        if (arr.length === 0) { return true; }
        return false;
    }
    public static hasValue(value: any): boolean {
        return value != null && value != undefined;
    }
    public static getValueOrDefault(value: any, defaultValue: any): any {
        if (this.hasValue(value)) return value;
        return defaultValue;
    }
    public static isNullOrWhitespace(value: any): boolean {
        var res = value == null || value == undefined;
        if (res === false) {
            return value.toString().trim() === '';
        }
        return res;
    }
    public static clearDate(date: any): Date {
        // if (date instanceof String) {
        //     date = new Date(date.toString());
        // }
        if (isMoment(date)) { 
            date = date.toDate(); 
        }
        const newDate = new Date(date);
        let res = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
        res = new Date(res.getTime() - (res.getTimezoneOffset() * 60000));
        return res;

    }
    
    public static getUniqueName(field: string) {
        let uid = FuseMockApiUtils.guid();
        uid = uid.split('-').join("");
        uid = `${field || ''}${uid}`.trim();
        return uid;
    }
    public static isDigit(char: string) {
        return this.digitChars.includes(char);
    }
    // Διαβάζει από το SessionStorage 
    public static getSessionJson(key: string): any {
        const jObj: string = sessionStorage.getItem(key.toLowerCase());
        let res: any;
        if (jObj) {
            res = JSON.parse(jObj);
        }
        return res;
    }
    public static setSessionJson(key: string, value: any) {
        const jObj = JSON.stringify(value);
        sessionStorage.setItem(key.toLowerCase(), jObj);
    }
    public static toUpperAI(str: string) {
        const greek = ['Ά', 'Έ', 'Ή', 'Ί', 'Ό', 'Ύ', 'Ώ']
        const greekΑΙ = ['Α', 'Ε', 'Η', 'Ι', 'Ο', 'Υ', 'Ω']
        let res = str.toUpperCase();
        for (let i = 0; i <= greek.length - 1; i++) {
            res = res.replace(greek[i], greekΑΙ[i]);
        }
        return res;
    }
    private greekLetters = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω',
    'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];

    private latinLetters = ['A', 'B', 'G', 'D', 'E', 'Z', 'H', 'U', 'I', 'K', 'L', 'M', 'N', 'J', 'O', 'P', 'R', 'S', 'T', 'Y', 'F', 'X', 'C', 'V',
    'a', 'b', 'g', 'd', 'e', 'z', 'h', 'u', 'i', 'k', 'l', 'm', 'n', 'j', 'o', 'p', 'r', 's', 't', 'y', 'f', 'x', 'c', 'v'];

    private numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    public static toGreek(value): string {

        const greek = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω',
                       'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];

        const latin = ['A', 'B', 'G', 'D', 'E', 'Z', 'H', 'U', 'I', 'K', 'L', 'M', 'N', 'J', 'O', 'P', 'R', 'S', 'T', 'Y', 'F', 'X', 'C', 'V',
                       'a', 'b', 'g', 'd', 'e', 'z', 'h', 'u', 'i', 'k', 'l', 'm', 'n', 'j', 'o', 'p', 'r', 's', 't', 'y', 'f', 'x', 'c', 'v'];

        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        let res = value.toUpperCase();
        for (let i = 0; i <= latin.length - 1; i++) {
            res = res.replace(latin[i], greek[i]);
        }

        return res;
    }

    public static toLatin(value): string {

        const greek = ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω',
            'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];

        const latin = ['A', 'B', 'G', 'D', 'E', 'Z', 'H', 'U', 'I', 'K', 'L', 'M', 'N', 'J', 'O', 'P', 'R', 'S', 'T', 'Y', 'F', 'X', 'C', 'V',
            'a', 'b', 'g', 'd', 'e', 'z', 'h', 'u', 'i', 'k', 'l', 'm', 'n', 'j', 'o', 'p', 'r', 's', 't', 'y', 'f', 'x', 'c', 'v'];

        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        let res = value.toUpperCase();
        for (let i = 0; i <= greek.length - 1; i++) {
            res = res.replace(greek[i], latin[i]);
        }

        return res;
    }
    static letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    static digits = "0123456789";
    static symbols = "!@#$%^&*_-+=";
    public static validatePasswordInvalidChar(value: string) {
        if (this.isNullOrWhitespace(value)) return true;
    
        const chars = value.toString().split("");
        let invalidChar = chars.find(c => !`${CommonUtils.letters}${CommonUtils.letters.toLowerCase()}${CommonUtils.digits}${CommonUtils.symbols}`.includes(c));
        if (invalidChar) {
            return false;
        }
        return true;
    }
    public static validatePassword(value: string) {
        if (this.isNullOrWhitespace(value)) return true;
        if (!CommonUtils.validatePasswordInvalidChar(value)) { return false; }
        if (value.length < 8) {return false;}
        const chars = value.toString().split("");
        var letter = chars.find(c => CommonUtils.letters.includes(c));
        var digit = chars.find(c => CommonUtils.digits.includes(c));
        var symbol = chars.find(c => CommonUtils.symbols.includes(c));
        if (!letter || !digit || !symbol) {
            return false;
        }
        return true;
    }
    
    public static validateEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    public static validatePhone_GR(phoneNumber: string, mobile: boolean = false): boolean {
        if (this.isNullOrWhitespace(phoneNumber)) return true;
        let isValid = true;
        const strValue: string = phoneNumber.trim();
        isValid = (strValue.length === 10);
        const len = strValue.length - 1;
        for (let i = 0; i <= len; i++ ) {
            if (CommonUtils.isDigit(strValue.charAt(i)) !== true) {
                isValid = false;
                break;
            }

        }
        if (mobile && isValid) {
            if (!phoneNumber.toString().startsWith("69")) {
                isValid = false;
            }
        }
        return isValid
    }
    public static containsAlphaNumeric(srch): boolean {
        let res: boolean = false;
        if (this.isNullOrWhitespace(srch)) { return false; }
        var sArr = srch.split('');
        for(var i = 0; i < sArr.length; i++) {
                if (isNaN(parseInt(sArr[i]))) {
                     res = true;   
                     break;
                }
        }
        return res;
    }
    public static validateVat(vat: string, lang: string = 'gr'): boolean {
        if (!vat) {
            return null;
            
        } else if (vat.length !== 9) {
            return false;
        
        } else if (this.containsAlphaNumeric(vat)) {
            return false;
        } else {
            vat += '';
            if (!vat || vat.length < 9) { return false; }
            vat = vat.split('').reverse().join('');

            let Num1: any = 0;
            for (let iDigit = 1; iDigit <= 8; iDigit++) {
                const numc = parseInt(vat.charAt(iDigit), null);
                if (isNaN(numc)) { return false; }
                // tslint:disable-next-line:no-bitwise
                Num1 += numc << iDigit;
                if (isNaN(Num1)) { return false; }
            }
            const cat0 = parseInt(vat.charAt(0), null);
            if (isNaN(cat0)) { return false; }
            if ((Num1 % 11) % 10 === parseInt(vat.charAt(0), null)) {
                return true;
            } else {
                return false;
            }
        }
    }
    
    public static calcAge(dateString) {
        if (!dateString) { return 0; }
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    
    public static calcDateDiff(givenDate: Date = new Date(), byOlderDate: Date) {
        if (!givenDate || !byOlderDate) { return 0; }
        // var birthDate = new Date(dateString);
        let age = givenDate.getFullYear() - byOlderDate.getFullYear();
        const m = givenDate.getMonth() - byOlderDate.getMonth();
        if (m < 0 || (m === 0 && givenDate.getDate() < byOlderDate.getDate())) {
            age--;
        }
        return age;
    }

    public static createExtendedPropertiesInstance(properties: string, sep: string) {
        const res = {};
        if (!properties || properties.length === 0) { return res; }
        const props = properties.split(sep);
        props.forEach((p) => {
            const parts = p.split('=');
            if (parts.length > 1) {
                
                res[parts[0]] = parts[1];
            }
        });
        return res;
    }
    public static getExtendedPropertiesString(obj: object, sep: string) {
        let str = '';
        let names: string[]  = [];
        if (CommonUtils.hasValue(obj)) {
            names = Object.getOwnPropertyNames(obj);
            names.forEach((name) => {
                if (!name || name === '') { return; }
                if (obj[name] !== null && obj[name] !== undefined) {
                    if (str.length > 0) { str += sep; }
                    str += `${name}=${obj[name].toString()}`;
                }
    
            });
        }
        
        return str;
    }

    public static createUniqueNamesObject(obj: any): any {
        let names: string[]  = [];
        let res = {};
        if (CommonUtils.hasValue(obj)) {
            names = Object.getOwnPropertyNames(obj);
            names.forEach((name) => {
                if (!name || name === '') { return; }
                res[name]= CommonUtils.getUniqueName(name);
            });
        }
        return res;
    }
    public static getMergedExtendedPropertiesString(obj1: object, obj2: object, sep: string): string {
        let str: string = '';
        let names: string[] = [];
        if (CommonUtils.hasValue(obj1)) {
            names = Object.getOwnPropertyNames(obj1);
        }
        if (CommonUtils.hasValue(obj2)) {
            Object.getOwnPropertyNames(obj2).forEach((name) => {
                const existing = names.find(fn => fn.toLowerCase() === name.toLowerCase());
                if (!existing) {
                    names.push(name);
                }
            });
        }
        names.forEach(name => {
            if (obj2[name]) {
               if (str.length > 0) { str += sep; }
                str += `${name}=${obj2[name].toString()}`;        
            
            } else if (obj1[name]) {
                if (str.length > 0) { str += sep; }
                str += `${name}=${obj1[name].toString()}`;   
            }
        });
        
        
        return str;
    }
    public static createGUID() {
        return FuseMockApiUtils.guid().split('-').join('');

    }

    public static cloneObject(objectToClone: any): any {
        let res: any;
        if (objectToClone) {
            res = JSON.parse(JSON.stringify(objectToClone));

            //==========================================================
            //Μην σβηστεί (Το έκανα για να βρίσκει τα πιθανά circular)
            //==========================================================
            //==========================================================
            //  res = JSON.parse(JSON.stringify(objectToClone, (key, value) => {
            //                          console.log(key);
            //                          return value;
                                    
            // }));
            //==========================================================
            //==========================================================

        }
        return res;
    }
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    public static getRandom(min: number, max: number): number {
        return (Math.random() * (max - min + 1)) + min;
    }
    public static isLeapYear(year) {
        return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
    }

    public static getDaysInMonth(year, month) {
        return [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    public static addYears(date: any, numberOfYears: number) {
        let newDate: Date;
        if (isMoment(date)) {
            newDate = date.toDate();
        } else {
            newDate = date;
        }
        const res =  addYears(newDate, numberOfYears);
        return res;
    }
    public static addMonths(date: any, numberofMonths: number) {
        let newDate: Date;
        if (isMoment(date)) {
            newDate = date.toDate();
        } else {
            newDate = date;
        }
        const res = addMonths(CommonUtils.clearDate(date), numberofMonths);
        return res;
        
    }
    
    public static addDays(date: any, numberofDays: number) {
        var dt = new Date(date);
        const res = addDays(dt, numberofDays);
        return res;
        //return new Date(dt);
        // let newDate: Date;
        // if (isMoment(date)) {
        //     newDate = date.toDate();
        // } else {
        //     newDate = date;
        // }
        // const res = addDaysToDate(CommonUtils.clearDate(date), numberofDays);
        // return res;
        // var dt = date;
        // var n = dt.getDate();
        // dt.setDate(1);
        // dt.setMonth(dt.getMonth() + numberofMonths);
        // dt.setDate(Math.min(n, this.getDaysInMonth(dt.getFullYear(), dt.getMonth())));
        // return dt;
    }

    public static updateObjectFromPrototype(protoType: any, target: any, exclude: string[] = []): void {
        if(!this.hasValue(protoType) || !this.hasValue(target)) { return; }
        if (CommonUtils.hasValue(protoType)) {
            Object.getOwnPropertyNames(protoType).forEach(pname => {
                const pd = Object.getOwnPropertyDescriptor(target, pname);
                if (exclude.findIndex(s => s === pname) !== -1) { return; }
                if (pd && pd.writable !== true) { return; }
                target[pname] = protoType[pname];
    
            });
        }
        
    }
    
    public static validateForm(form: NgForm, names: string[] = null): boolean {
        let res = true;
        if (!form) {return true; }
        const controls = CommonUtils.getFormControls(form, names);
        
        controls.forEach(fn => {
            
            fn.markAsTouched();
            fn.markAsDirty();
            // fn.patchValue()
            fn.updateValueAndValidity({onlySelf: false, emitEvent: true});
            if (fn.invalid) {
              res = false;
            }
        });
        
        return res;
    }

    public static getFormControls(f: NgForm, names: Array<string> = []): Array<AbstractControl> {
        const res = new Array<AbstractControl>();
        
        const lNames = new Array<string>();
        if (names && names.length> 0) {names.forEach(fn => {lNames.push(fn.toLowerCase());});}
        
        if (CommonUtils.hasValue(f) && CommonUtils.hasValue(f.controls)) {
            Object.getOwnPropertyNames(f.controls).forEach(pname => {
                if (lNames && lNames.length > 0) {
                    if (pname && lNames.includes(pname.toLocaleLowerCase())) {
                        const pd = Object.getOwnPropertyDescriptor(f.controls, pname);        
                        res.push(pd.value);
                    }
                } else {
                    const pd = Object.getOwnPropertyDescriptor(f.controls, pname);
                    res.push(pd.value);
                }
                
            });
        }
        
        return res;
    }
    
    public static isNavKey(c: string) {
        const key = c.toLowerCase();
        if (key === 'backspace' || key === 'arrowright' || key === 'arrowleft' || key === 'delete' || key === 'numpadenter' || key.startsWith('shift') || key.startsWith('control') || key.startsWith('alt')) {
            return true;
        }
        return false;
    }
    public static canCharConvertToLatin(c: string): boolean {
        const exists = CommonUtils.validChars.find(fn => fn === c);
        if (exists === undefined || exists == null) {
            return false;
        }  
        return true;
    }
    public static validatePlateNr(plate: string): boolean {
        
        if (!plate || plate === null || plate === '') {
            return true;
        }
         
         const len = plate.length - 1;
         let res = true;
         for ( let i = 0 ; i <= len; i++ ) {
              const c = plate.charAt(i);
              if (CommonUtils.canCharConvertToLatin(c) == false) {
                res = false;
                break;
              }
         }
         return res;
    }
    public static isEmpty(obj: any): boolean {
        return (obj === null || obj === undefined);
    }

    public static sortArray(arr: Array<any>, propertyName: string, desc = false) {
        if (arr === undefined) { return; }
        const m = desc ? -1 : 1;
        return arr.sort((a: any, b: any): number => {
            const x = a[propertyName];
            const y = b[propertyName];
            return (x === y) ? 0 : (x < y) ? -1 * m : 1 * m;

        });
    }

    /**
     * Ταξινομεί έναν πίνακα με βάση περισσότερες από 1 στήλες
     * @param arr Ο πίνακας προς ταξινόμηση
     * @param propertyNames Ο πίνακας των ονομάτων των στηλών που θα χρησιμοποιηθούν στην ταξινόμηση (με μείον μπροστά από το όνομα πχ -name --> φθίνουσα ταξινόμηση)
     * @example sortArrayMultiple([person1, person2, person3], ['name', '-age'])
     */
    public static sortArrayMultiple(arr: Array<any>, propertyNames: Array<string>) {
        const singleComparer = function (propertyName: string) {
            let sortOrder = 1;
            if (propertyName[0] === '-') {
                sortOrder = -1;
                propertyName = propertyName.substr(1);
            }
            return function (a, b) {
                const result = (a[propertyName] < b[propertyName]) ? -1 : (a[propertyName] > b[propertyName]) ? 1 : 0;
                return result * sortOrder;
            };
        };

        const multipleComparer = function (propNames: Array<string>) {
            return function (obj1, obj2) {
                let i = 0, result = 0;
                const numberOfProperties = propNames.length;
                // επιχειρείται ταξινόμηση σε επόμενες στήλες αν η τρέχουσα στήλη είναι ίδια                     
                while (result === 0 && i < numberOfProperties) {
                    result = singleComparer(propNames[i])(obj1, obj2);
                    i++;
                }
                return result;
            };
        };

        return arr.sort(multipleComparer(propertyNames));
    }

    public static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);             
            if (control instanceof FormControl) {             
              control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        
              this.validateAllFormFields(control);            
            }
        });
    }
    public static getTimeAgo(date: Date) {
        const d = new Date();
        
        const UTCSecondNow = (d.getTime() + d.getTimezoneOffset() * 60 * 1000);
        const UTCSeconds = (date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const diff = UTCSecondNow - UTCSeconds;
        return diff;
        

    }
    public static getTimeAgoString(date: Date) {
        let diff = this.getTimeAgo(date);
        let tense = 'πριν';
        if (diff < 0) {
            tense = 'μετά';
            diff = Math.abs(diff);
        }
        if (diff === 0) {
            return 'μόλις τώρα';
        }
        // 365.25 * 24 * 60 * 60 * 1000
        const years = CommonUtils.singular(Math.round(diff / 31557600000), 'χρόνια');
        if (years) {
            return years + tense;
        }
        const months = CommonUtils.singular(Math.round(diff / 2592000000), 'μήνες');
        if (months) {
            return months + tense;
        }
        const days = CommonUtils.singular(Math.round(diff / 86400000), 'ημέρες');
        if (days) {
            return days + tense;
        }
        const hours = CommonUtils.singular(Math.round(diff / 3600000), 'ώρες');
        if (hours) {
            return hours + tense;
        }
        const mins = CommonUtils.singular(Math.round(diff / 60000), 'λεπτά');
        if (mins) {
            return mins + tense;
        }
        const secs = CommonUtils.singular(Math.round(diff / 1000), 'δεύτερα');
        if (secs) {
            return secs + tense;
        }
    }
    public static singular(num, str) {
        let oneString = 'ένα';
        if (num >= 1) {
            if (num === 1) {
                switch (str) {
                    case 'χρόνια':
                         str = 'χρόνο';
                         break;
                    case 'μήνες':
                         str = 'μήνα';
                         break;
                    case 'ημέρες':
                         str = 'ημέρα';
                         oneString = 'μία';
                         break;
                    case 'ώρες':
                         str = 'ώρα';
                         oneString = 'μία';
                         break;
                    case 'λεπτά':
                         str = 'λεπτό';
                         break;
                    case 'δεύτερα':
                         str = 'δεύτερο';
                         break;
                }
                return `${oneString} ${str} `;
            } else {
                return `${num} ${str} `;
            }
        }
        return '';
    }
    fitToParent() {
        
    }
    
    public static toEuro(amount: number): string {
            if (!amount) return '';
            
            return amount.toLocaleString('el-GR', {style:'currency', currencyDisplay:'symbol', currency:'EUR'});
    }
    
    // public static toDateString(date: Date): string {
    //     if (!date) return '';
    //     var options =  {year: 'numeric', month: 'numeric', day: 'numeric' };
    //     return new Date(date).toLocaleDateString('el-GR', options);
    // }
    public static isDeviceSize(shortcut) {
        let w = window.outerWidth;
        switch (shortcut) {
            case 'xs'       : return (w <= 599);
            case 'sm'       : return (w >= 600 && w <= 959);
            case 'md'       : return (w >= 960 && w <= 1279);
            case 'lg'       : return (w >= 1280 && w <= 1919);
            case 'xl'       : return (w >= 1920 && w <= 5000);
            case 'lt-sm'    : return (w <= 599);
            case 'lt-md'    : return (w <= 959);
            case 'lt-lg'    : return (w <= 1279);
            case 'lt-xl'    : return (w <= 1919);
            case 'gt-xs'    : return (w >= 600);
            case 'gt-sm'    : return (w >= 960);
            case 'gt-md'    : return (w >= 1280);
            case 'gt-lg'    : return (w >= 1920);
        }
        return false;
    }

    public static TestingMode(){

       let  res : Boolean = false;
       

       return res;
    }
    
    
    public static popupwindow(url, title, w, h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
    } 
    public static cleanForCompare(value: string) {
        let invalidChars = [];
        value = this.toLatin(value).toLowerCase();
        value = this.replaceAll(value, ' ', '');
        for (var i = 0; i < value.length; i++) {
            if (!this.isCharOrDigit(value[i])) {
                invalidChars.push(value[i]);
            }
        }
        invalidChars.forEach(fn => {
            value = this.replaceAll(value, fn, '');
        });

        return value;
    }
    public static isCharOrDigit(char: string) {

        return this.digitChars.includes(char) || this.isChar(char);
    }
    public static isChar(char: string) {
        let latin = 'abcdefghijklmnopqrstuvwxyz';
        let greek = 'αβγδεζηθικλμνξοπρστυφχψωάέήίόύώ';
        return latin.includes(char) || greek.includes(char);
    }
    
    public static obfuscateString(str: string, startLen: number, endLen:number, char: string = "*"): string {
        if (this.isNullOrWhitespace(str)) { return str; }
        let len = str.length;
        
        let start = str.substr(0, startLen);
        let end = str.substr(len - endLen, endLen);
        let res = start + "".padStart(len-startLen-endLen,char) + end;
        return res;
    }
    public static obfuscateEMail(eMail: string): string {
        let res = eMail;
        if (this.isNullOrWhitespace(eMail)) { return res; }
        let parts = eMail.split("@");
        let domainParts = parts[1].split(".");
        let address = this.obfuscateString(parts[0], 2,1);
        let domain = this.obfuscateString(domainParts[0],1,0);
        res = address + "@" + domain + "." + domainParts[1];
        return res;
    }
    public static obfuscateMobile(mobile: string): string {
        let res = mobile;
        if (this.isNullOrWhitespace(mobile)) { return res; }
        res = this.obfuscateString(mobile,2,3);
        return res;
    }
}



// tslint:disable-next-line:class-name

