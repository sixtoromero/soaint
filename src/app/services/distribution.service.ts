  
import { HttpEventType, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DistributionModel } from '../models/distribution.model';

@Injectable({
    providedIn: 'root',
})
export class DistributionService {

    endPoint = environment.apiURL;

    constructor(private _http: HttpClient) { }

    getdistribution(): Observable<any[]> {        
        return this._http.get<any[]>(`${this.endPoint}/catalog/distribution`);
    }

    insert(item: DistributionModel): boolean {
        let register = JSON.parse(localStorage.getItem('register'));
        register.push(item);
        localStorage.clear();
        localStorage.setItem('register', JSON.stringify(register));
        return true;
    }

    update(item: DistributionModel): boolean {
        //Busco y elimino el registro para luego ser agregado nuevamente.
        
        let register = JSON.parse(localStorage.getItem('register')) as DistributionModel[];
        const resp = register.find(x => x.accessURL === item.accessURL);
        let index = register.indexOf(resp);

        if (index !== -1) {
            register.splice(index, 1);
        }

        register.push(item);

        localStorage.clear();
        localStorage.setItem('register', JSON.stringify(register));

        return true;
    }

    delete(item: DistributionModel): boolean {

        
        let register = JSON.parse(localStorage.getItem('register')) as DistributionModel[];
        const resp = register.find(x => x.accessURL === item.accessURL);
        let index = register.indexOf(resp);

        if (index !== -1) {
            register.splice(index, 1);
        }

        localStorage.clear();
        localStorage.setItem('register', JSON.stringify(register));

        return true;
    }

}


