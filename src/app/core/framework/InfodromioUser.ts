import { CompanyBranch } from "./CompanyBranch";
import { PortalProfileSetting } from "./PortalProfileSettings";
import { RemoteCompany } from "./RemoteCompany";

export class InfodromioUser {
    public userId: number;
    public userName: string;
    public displayName: string;
    public lastName: string;
    public firstName: string;
    public eMail: string;
    public IdrKey: string;
    public token: string;
    public Ip: string;
    public salespointKey: string;
    public salespointId: string;
    public portalId: number;
    public roles: Array<string> = [];
    public productionCode: string;
    public parentAccount: string;
    public isConsumer: boolean;
    public isSalesPointAdmin: boolean;
    public isUnderwriter: boolean;
    public isPortalAdmin: boolean;
    public isPartnerAdmin: boolean;
    public isAccounting: boolean;
    public isSystemAdmin: boolean;
    public HermesProductCode: string;
    public strApps: string;
    public strSettings: string;
    public logoBackground: string;
    public companyCode: string;
    public parentAccountId: number;
    public parentAccountName: string;
    public parentAccountProductionCode: string;
    public region: string;
    public city: string;
    public postalCode: string;
    public street: string;
    public streetNumber: string;
    public phones: string;
    public fax: string;
    public web: string;
    public avatarUrl: string;
    public initials: string;
    public mobilePhone: string;
    public defaultQuotationCategory: string = 'BASE';
    public quotationCategories: Array<any>;
    public portalName: string;
    public childrenPartners: Array<any> = [];
    public serialNumber: string = null;
    public quotationViewPreference_19: string = "panel";
    public quotationViewPreference_17: string = "panel";
    public quotationViewPreference_15: string = "panel";
    public quotationViewPreference_00_1: string = "panel";
    public quotationViewPreference_16: string = "panel";
    public GEMH: string;
    public chamberId: Number;
    public MAE: string;
    public chamber: string;
    public registry: String;
    public portalProfileSettings: Array<PortalProfileSetting> = [];
    public PData: string;
    public QuotationOnly: boolean;
    public isGlobalUser: boolean;
    public remoteCompanies: Array<RemoteCompany> = [];
    
    // public providersUsers: Array<any> = [];
    public companiesAndBranches: Array<CompanyBranch> = [];
    public companyIds: Array<number> = [];
    public ownedSalesPointId: number;
    public portalMyHermesStatus: number;
    public portalB2CStatus: number;
    public SalespointIsOwner: boolean;
    public portalHubId: string;
    public SalespointAllowDesigner: boolean = false;
    public status: string;
    public isInRole(role: string): boolean {
        const res = this.roles.find(fn => fn.toLowerCase() === role.toLowerCase());
        if (res) {return true; }
        return false;
    }
    public  allowApp(appKey: string): boolean {
        if (this.strApps && this.strApps.trim() !== '') {
            let char = ',';
            if (this.strApps.includes(';')) {
                char = ';';
            }
            const apps = this.strApps.split(char);                
            appKey = appKey.toLowerCase();
            this.strApps = this.strApps.replace(' ', '');
            const app = apps.find(fn => fn.toLowerCase().startsWith(`${appKey}=`));
            if (app) {
                const parts = app.split('=');
                if (parts.length > 1) {
                    if (parts[1] === '1') {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
}

 