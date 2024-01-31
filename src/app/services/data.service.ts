import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ebsiFlag: boolean = false;
  private did: string = '';
  private didSubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  sendDid(did: string) {
    this.didSubject.next(did);
  }

  listenDid(): Observable<any> {
    return this.didSubject.asObservable();
  }

  getDid() {
    return this.http.get(environment.wca_url + environment.walletUri.ebsi_did_uri, { responseType: 'text' }).pipe(
      map((data) => {
        return data.toString()
      }),
      catchError((err) => {
        throw "Err";
      })
    )
  }

}
