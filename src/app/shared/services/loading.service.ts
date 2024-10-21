import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
 isloading$ = new Subject<boolean>();
  constructor() {

   }

    show():void {
      this.isloading$.next(true);
    }

    hide():void {
      this.isloading$.next(false);
    }


}
