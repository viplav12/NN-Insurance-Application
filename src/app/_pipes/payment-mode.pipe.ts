import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'paymentMode',
  pure: false
})

export class PaymentModePipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) {}

    transform(value: any, currency: string, term: string): any {
        const amount = this.currencyPipe.transform(value, currency);
        let mode = '';
        switch (term) {
            case 'monthly':
                mode = 'p/m';
                break;
            case 'yearly':
                mode = 'p/y';
                break;
            default:
                mode = 'p/m';
        }
        return amount + ' ' + mode;
    }
}

@NgModule({
    declarations: [ PaymentModePipe ],
    exports: [ PaymentModePipe ]
  })
export class PaymentModePipeModule {}
