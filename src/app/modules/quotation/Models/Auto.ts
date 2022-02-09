import { IRisk } from './IRisk';

export class Auto implements IRisk {
    public riskCode: string;
    public branch: string = "19";
    public Plate: string;
    public UsageId: number;
}
