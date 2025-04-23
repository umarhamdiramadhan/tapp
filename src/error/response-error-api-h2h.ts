export class ResponseErrorApiH2h extends Error {
    constructor(public message:string){
        super(message)
    }

}