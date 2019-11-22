import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class WebShare extends LightningElement {
    handleClick(){
        if (navigator.share) {
            navigator.share({
              title: 'WebShare API Demo',
              url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
            }).then(() => {
                const evt = new ShowToastEvent({
                    title: 'Record Update',
                    message: 'Application is loaded ',
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            })
            .catch(e => {
                // window.console.error(e)
                const evt = new ShowToastEvent({
                    title: 'Application Error',
                    message: 'Error:' + JSON.stringify(e),
                    variant: 'error',
                    mode: 'dismissable'
                });
                this.dispatchEvent(evt);
            });
          } else {
            const evt = new ShowToastEvent({
                title: 'Application Warning',
                message: 'No navigator.share ',
                variant: 'warning',
                mode: 'pester'
            });
       this.dispatchEvent(evt);
          }
    }
}