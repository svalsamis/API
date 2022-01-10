export class dxGridHelper {
    constructor() {
        this.operationDescriptions = {
            'between': 'από - εως',
            'contains': 'περιέχει',
            'endsWith': 'καταλήγει σε',
            'equal': 'ίσον',
            'greaterThan': 'μεγαλύτερο από',
            'greaterThanOrEqual': 'μεγαλύτερο ή ίσο από',
            'lessThan': 'μικρότερ',
            'lessThanOrEqual': 'μικρότερο ή ίσο από',
            'notContains': 'δεν περιέχει',
            'notEqual': 'διάφορο από',
            'startsWith': 'αρχίζει με'
        }
    }
    public loadText: string = 'Φόρτωμα δεδομένων ...';
    public operationDescriptions: any = {};
    public searchText = "αναζήτηση ...";
    public headerTexts = {cancel: 'Ακυρο', ok: 'Εφαρμογή'}
}
