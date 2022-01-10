export class CompanyBranch {
    public providerId: number | null;
    public companyId: number;
    public branchId: string;
    public allowProposals: boolean;
    public allowSpecialDiscounts: boolean;
    public isRemote: boolean = false;
    public hostUrl: string = null;
    public userName: string = null;
    public hash: string = null;
    public providerName: string = null;
    public registrationHubId: string= null;
    public inheritsPortal: boolean = false;
    public inheritsPortalPP: boolean = false;

}