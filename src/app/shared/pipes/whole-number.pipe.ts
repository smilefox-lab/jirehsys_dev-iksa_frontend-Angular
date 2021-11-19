import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wholeNumber'
})
export class WholeNumberPipe implements PipeTransform {

  transform(value: any, arg: string|number): string {
    return null;
  }

}
