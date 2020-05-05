import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket;
  
  constructor() {}

  connect(endpoint:string){

    this.socket = io(`${API_URL}/${endpoint}`,{
      reconnection: false
    });
  }

  listen(eventName: string){

    return new Observable((subscriber)=>{

      this.socket.on(eventName,(data) =>{
        subscriber.next(data);
      })

    })

  }


  emit(eventName: string, data : any){
    this.socket.emit(eventName,data);
  }


  close(){

    this.socket.close();

  }

}
