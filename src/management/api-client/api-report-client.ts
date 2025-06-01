import axios from "axios"
import { ResponseErrorApi } from "../../error/response-error-api";

export class ApiReportClient  {
    static async sendApiClient(url:string|null,pesan:string){
        if(url === null){
            throw new ResponseErrorApi(400,"report tidak terkirim")
        }
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${url}?${pesan}`,
            headers: { }
        }
        axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
        console.log(error);
        });
    }
}