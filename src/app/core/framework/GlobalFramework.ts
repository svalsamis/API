import { FuseMockApiUtils } from "@fuse/lib/mock-api";
import { InfodromioUser } from "./InfodromioUser";

export class AppSettings {
    public hermesAPIUrl: string;
    public hermesHubUrl: string;
    public hermesHubBaseUrl: string;
    public hermesAPIUrl_browserHelper: string;
    public hermesAPIUrl_Login: string;
    public hermesAPIUrl_Auth: string;
    public hermesAPIUrl_QuotationAuto: string;
    public hermesAPIUrl_QuotationData: string;
    public hermesAPIUrl_Applications: string;
    public hermesAPIUrl_Gateway: string;
    public hermesAPIUrl_QuotationLife: string;
    public hermesAPIUrl_Consumers: string;
    public hermesAPIUrl_Clients: string;
    public hermesAPIUrl_SystemAdmin: string;
    public hermesAPIUrl_Documents: string;
    public hermesAPIUrl_QuotationFire: string;
    public hermesAPIUrl_QuotationBoat: string;
    public hermesAPIUrl_QuotationForeigner: string;
    public hermesAPIUrl_QuotationTravel: string;
    public hermesAPIUrl_Production: string;
    public hermesAPIUrl_Invoices: string;
    public hermesAPIUrl_Shop: string;
    public hermesAPIUrl_ePos: string;
    public hermesAPIUrl_SMS: string;
    public hermesAPIUrl_Library: string;
    // public hermesAPIUrl_HermesHub: string;
    public hermesAPIUrl_B2CModule: string;
    public hermesAPIUrl_Admin: string;
    public hermesAPIUrl_Chat: string;
    public build: string;
    public CommonControllerUrl: string;
    public hubName: string;
    public routeOnly: boolean;
    public hermesSignalAPIUrl: string = null;
    public permitSocial: boolean = true;
    public permitAD: boolean = false;
    public allowFBLogin: boolean = true;
    public allowTWLogin: boolean = true;
    public allowGLLogin: boolean = true;
    public allowRememberMe: boolean = true;
    public allowReminder: boolean = true;
    public promptUrl: string = null;
    public promptMessage: string = null;
    public displayPromptMessage: boolean = false;
    public appProfile: string;
    public showWelcome: boolean = false;
    public googleAPIKey: string;
    public testMode: boolean = false;
    public version: string = "1";
    public hermesCommunitySpId: number = 102;
    public sessionId: string;
    public hubCId: string;
    constructor() {
        this.hubCId = FuseMockApiUtils.guid();
    }

}


export class GlobalFramework {
    public static AppSettings = new AppSettings();
    public static CurrentUser: InfodromioUser;
}