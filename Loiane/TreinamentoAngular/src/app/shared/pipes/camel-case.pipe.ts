import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let values = value.split(' ');
    let result = '';

    for(let v of values)
    {
      result += this.capitalize(v) + ' ';
    }

    return result;
  }

  private capitalize(value: string): string {
    return value.substr(0,1).toUpperCase() + value.substr(1).toLowerCase();
  }

}
