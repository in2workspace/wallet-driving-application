import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http:HttpClient) { }


  public executeQR(state:string): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'})

  return this.http.get(
    environment.base_url + '/api/execute-content/get-siop-authentication-request', 
    { headers: headers, params:{state:state}, responseType: 'text'}
  )
  }

  public executeURL(url:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'})
    const options = { headers: headers, redirect : 'follow' };
    return this.http.post(
      environment.base_url + '/api/execute-content/get-siop-authentication-request', 
      url,options)
    }

  public executeVC(state:string,vc:Array<string>): Observable<any> {
    console.log("state",state);
    console.log("vc",vc);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'})
    console.log("url",environment.base_url + '/wallet/execute-content/vp?state='+state)
    return this.http.post(
      environment.base_url + '/api/siop/vp',{vc:[vc]} ,
      { headers: headers, params:{state:state}, responseType: 'text'}
    )
    }
}
