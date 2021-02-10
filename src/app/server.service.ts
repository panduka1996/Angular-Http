import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx'
import { Observable } from "rxjs/observable";

@Injectable()
export class ServerSevice {

    constructor(private http: Http) {

    }

    storeSevrers(servers: any[]) {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        // return this.http.post('https://angular-http-59cac-default-rtdb.firebaseio.com/data.json',
        // servers,
        // { headers: headers });
        return this.http.put('https://angular-http-59cac-default-rtdb.firebaseio.com/data.json',
            servers,
            { headers: headers });
    }

    getServers() {
        return this.http.get('https://angular-http-59cac-default-rtdb.firebaseio.com/data.json')
            .map((response: Response) => {
                const data = response.json();
                for (const server of data) {
                    server.name = 'FETCH_' + server.name;
                }
                return data;
            }).catch((error: Response) => {
                console.log(error);
                return Observable.throw('Something went wrong');
            });
    }

    getAppName() {
        return this.http.get('https://angular-http-59cac-default-rtdb.firebaseio.com/appName.json')
            .map((response: Response) => {
                return response.json();
            })
    }

}