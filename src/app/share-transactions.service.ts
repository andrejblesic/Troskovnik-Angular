import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareTransactionsService {

  private messageSource = new BehaviorSubject<any>('default message');
  currentIncomes = this.messageSource.asObservable();

  constructor() { }

  changeIncomes(message) {
    console.log(message);
    this.messageSource.next(message);
  }
}
