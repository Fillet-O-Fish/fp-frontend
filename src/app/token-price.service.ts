import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Nft } from './classes/nfts';
import axios from 'axios';

const instance = axios.create();

@Injectable({
  providedIn: 'root'
})
export class TokenPriceService {

  // apiToken = 'aA0UJ4DSkCH2FhnRf3XzlZxfc1XHDdpcoDxbYjQKM0EeqZwQqV5uGOPCfqKVkygv'
  // url = 'https://deep-index.moralis.io/api/v2/'
  url = 'https://fp-backend-go.herokuapp.com'

  constructor(private http: HttpClient) { }

  getPrice(contractAddr: String): Observable<any> {

    var options = {
      contractAddr:contractAddr
    }

    var url = this.url + "/seedPrice"
    return this.http.post(url, options);
  }


  getSeedBalance(contractAddr: String): Observable<any> {

    var options = {
      address:contractAddr
    }

    var url = this.url + "/seedBalance"
    return this.http.post(url, options);
  }

  getFlowerList (contractAddr: String){
    var options = {
      address:contractAddr
    }

    var url = this.url + "/nftList"
    return this.http.post(url, options);
  }

  // getFlowerDetails(contractAddr: String){
  //   var options = {
  //     tokenId:contractAddr
  //   }

  //   var url = this.url + "/api/getFlowerDetails"
  //   return this.http.post(url, options);
  // }

}
