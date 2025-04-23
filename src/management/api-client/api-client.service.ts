import axios from "axios"

export class ApiClient  {
    static async sendApiClient(url:string,perintah:string){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${url}${perintah}`,
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