import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  constructor(private http: HttpClient) { }

//  baseUrl = "http://localhost:9000/";
baseUrl = "https://gbs-backend-eight.vercel.app/";


  getApi(endPoint: any): Observable<any> {
    return this.http.get(this.baseUrl + endPoint).pipe(map((res) => {
      return this.handleNullAndUndefined(res);
    }));
  }

  postApi(endPoint: any, data: any): Observable<any> {
    return this.http
      .post(this.baseUrl + endPoint, data)
      .pipe(map((res) => {
        return this.handleNullAndUndefined(res);
      }));
  }
  putApi(endPoint: any, data: any): Observable<any> {
    return this.http
      .put(this.baseUrl + endPoint, data)
      .pipe(map((res) => {
        return this.handleNullAndUndefined(res);
      }));
  }
  deleteApi(endPoint: any, data: any): Observable<any> {
    return this.http
      .delete(this.baseUrl + endPoint, data)
      .pipe(map((res) => {
        return this.handleNullAndUndefined(res);
      }));
  }

  private handleNullAndUndefined(data: any): any {
    if (data === null || data === undefined) {
      return 'NA';
    } else if (typeof data === 'object') {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = this.handleNullAndUndefined(data[key]);
        }
      }
    }
    return data;
  }
}
