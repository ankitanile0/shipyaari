export class Toastr {
    type: ToastrType;
    message: string;
    //alertId: string;
   // keepAfterRouteChange: boolean;

    constructor(init?:Partial<Toastr>) {
        Object.assign(this, init);
    }
}

export enum ToastrType {
    Success,
    Error,
    Info,
    Warning
}