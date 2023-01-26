import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeEdit'
})
export class TimeEditPipe implements PipeTransform {

  transform(timeStamp: number): string {

    if (timeStamp === 0) {
      return '00:00';
    } else {
      let hours:any = new Date(timeStamp).getHours();
      let minutes:any = new Date(timeStamp).getMinutes();
      
      if (hours < 10) {
        hours = '0' + hours
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      return hours + ':' + minutes;
    }


  }

}
