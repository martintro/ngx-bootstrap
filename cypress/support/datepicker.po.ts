import { BaseComponent } from './base.component';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerLastOpened = 'bs-datepicker-container:last';
  daterangepickerLastOpened = 'bs-daterangepicker-container:last';
  datepickerDays = '[bsdatepickerdaydecorator]';
  bsconfigAttr = 'ng-reflect-bs-config';
  formOutput = '.code-preview';

  exampleDemosArr = {
    basic: 'demo-datepicker-basic',
    customFormat: 'demo-date-picker-custom-format',
    themes: 'demo-datepicker-color-theming',
    locales: 'demo-datepicker-change-locale',
    minMax: 'demo-datepicker-min-max',
    disabled: 'demo-datepicker-disabled',
    forms: 'demo-datepicker-forms',
    reactiveForms: 'demo-datepicker-reactive-forms',
    placement: 'demo-datepicker-placement'
  };
}
