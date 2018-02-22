import { AccordionPo } from '../support/accordion.po';
import { AlertsPo } from '../support/alerts.po';
import { ButtonsPo } from '../support/buttons.po';
import { CarouselPo } from '../support/carousel.po';
import { CollapsePo } from '../support/collapse.po';
import { DatepickerPo } from '../support/datepicker.po';
import { DropdownsPo } from '../support/dropdowns.po';
import { LandingPo } from '../support/landing.po';
import { ModalsPo } from '../support/modals.po';
import { PaginationPo } from '../support/pagination.po';
import { PopoverPo } from '../support/popover.po';
import { ProgressbarPo } from '../support/progressbar.po';
import { RatingPo } from '../support/rating.po';
import { SortablePo } from '../support/sortable.po';
import { TabsPo } from '../support/tabs.po';
import { TimepickerPo } from '../support/timepicker.po';
import { TooltipPo } from '../support/tooltip.po';
import { TypeaheadPo } from '../support/typeahead.po';

describe('Component content displaying test suite', () => {
  const componentsArray = [
    new AccordionPo(),
    new AlertsPo(),
    new ButtonsPo(),
    new CarouselPo(),
    new CollapsePo(),
    new DatepickerPo(),
    new DropdownsPo(),
    new ModalsPo(),
    new PaginationPo(),
    new PopoverPo(),
    new RatingPo(),
    new SortablePo(),
    new TabsPo(),
    new TimepickerPo(),
    new TooltipPo(),
    new TypeaheadPo()
  ];

  it('each page loads and displays it\'s title with link in it and usage example', () => {
    componentsArray.forEach(page => {
      page.navigateTo();

      cy.get(page.titleSel)
        .should('be.visible')
        .and('to.contain', page.pageTitle);

      cy.get(page.titleLinkSel)
        .should('be.enabled')
        .and('have.attr', 'href', page.ghLinkToComponent);

      cy.get(page.usageExSel)
        .should('be.visible')
        .and('to.contain', page.titleDefaultExample);

      cy.get(page.usageExCodeSel)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  describe('Simple accordion', () => {
    const basicDemo = accordion.exampleDemosArr.basic;

    it('panels open content at first click', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .click();

      cy.get('@firstPanel')
        .should('have.class', accordion.openClass);

      accordion.getAccordionPanel(basicDemo, 1).as('secondPanel')
        .click();
      accordion.getAccordionPanel(basicDemo, 3).as('fourthPanel')
        .click();

      cy.get('@secondPanel')
        .should('have.class', accordion.openClass);
      cy.get('@fourthPanel')
        .should('have.class', accordion.openClass);
    });

    it('after double click panels are closed', () => {
      accordion.getAccordionPanel(basicDemo, 0).as('firstPanel')
        .dblclick();
      accordion.getAccordionPanel(basicDemo, 1).as('secondPanel')
        .dblclick();

      cy.get('@firstPanel')
        .should('not.to.have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.to.have.class', accordion.openClass);
    });
  });

  describe('Disabled accordion', () => {
    const disabledDemo = accordion.exampleDemosArr.disabled;

    it('first panel can be disabled or enabled', () => {
      accordion.clickByText(disabledDemo, accordion.buttonEnableDisable);

      accordion.getAccordionPanel(disabledDemo, 0).as('firstPanel').find(accordion.disabledPanelText)
        .should('to.be.exist');

      accordion.clickByText(disabledDemo, accordion.buttonEnableDisable);

      cy.get('@firstPanel').find(accordion.disabledPanelText)
        .should('not.to.be.exist');
    });
  });

  // describe.only('Dynamic accordion', () => {
  //   const dynamicDemo = accordion.exampleDemosArr.dynamicAccGroup;
  //
  // });

  describe('Dynamic body content', () => {
    const dynamicBody = accordion.exampleDemosArr.dynamicBody;

    it('items in first collapse-panel can be added dynamic', () => {
      accordion.getAccordionPanel(dynamicBody, 0).as('dynamicItemsPanel').click();

      cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
        .should('have.length', 3);

      accordion.clickByText('@dynamicItemsPanel', accordion.buttonAddItem);

      cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
        .should('have.length', 4);
    });
  });

  describe('Manual toggle', () => {
    const manualToggle = accordion.exampleDemosArr.manualToggle;

    it('last panel can be controlled by toggler button', () => {
      accordion.clickByText(manualToggle, accordion.buttonPanelToggler);

      accordion.getAccordionPanel(manualToggle, 2).as('dynamicPanel')
        .should('not.have.class', accordion.openClass);

      accordion.clickByText(manualToggle, accordion.buttonPanelToggler);

      cy.get('@dynamicPanel')
        .should('have.class', accordion.openClass);
    });
  });

  describe('Open only one at a time', () => {
    const onePanelDemo = accordion.exampleDemosArr.oneAtATime;

    it('closeOthers property sets as true - only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').check();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@thirdPanel').click()
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('not.have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.have.class', accordion.openClass);
    });

    it('closeOthers property sets as false - not only one panel can be opened at a time', () => {
      cy.get(onePanelDemo).find('input').uncheck();

      accordion.getAccordionPanel(onePanelDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(onePanelDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@thirdPanel').click()
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('have.class', accordion.openClass);
      cy.get('@secondPanel')
        .should('not.have.class', accordion.openClass);
    });
  });

  describe('Styling accordion', () => {
    const stylingDemo = accordion.exampleDemosArr.styling;

    it('first and third panel contains customClass style', () => {
      const stylesPanel = ['rgb(91, 192, 222)', 'rgb(255, 255, 255)'];
      const stylePanelBody = 'rgb(51, 122, 167)';

      accordion.getAccordionPanel(stylingDemo, 0).children(accordion.panelCard).as('firstPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@firstPanel').find(accordion.panelBody)
        .should('to.have.css', 'background-color', stylePanelBody);

      accordion.getAccordionPanel(stylingDemo, 2).children(accordion.panelCard).as('thirdPanel')
        .should('to.have.css', 'background-color', stylesPanel[0])
        .and('to.have.css', 'color', stylesPanel[1]);
      cy.get('@thirdPanel').find(accordion.panelBody)
        .should('to.have.css', 'background-color', stylePanelBody);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = accordion.exampleDemosArr.config;

    it('example opens only one panel at a time', () => {
      accordion.getAccordionPanel(configDemo, 0).as('firstPanel').click()
        .should('have.class', accordion.openClass);
      accordion.getAccordionPanel(configDemo, 1).as('secondPanel')
        .should('not.have.class', accordion.openClass);
      accordion.getAccordionPanel(configDemo, 2).as('thirdPanel')
        .should('not.have.class', accordion.openClass);

      cy.get('@secondPanel').click()
        .should('have.class', accordion.openClass);
      cy.get('@firstPanel')
        .should('not.have.class', accordion.openClass);
      cy.get('@thirdPanel')
        .should('not.have.class', accordion.openClass);
    });
  });
});

describe('Alerts page test suite', () => {
  const alerts = new AlertsPo();

  beforeEach(() => alerts.navigateTo());

  describe('Basic alert', () => {
    const basicDemo = alerts.exampleDemosArr.basic;

    it('success, info, warning and danger types of alerts are displayed', () => {
      const alertTypes = [
        'alert-success',
        'alert-info',
        'alert-warning',
        'alert-danger'
      ];

      alertTypes.forEach(type => cy.get(`${ basicDemo } .${ type }`)
        .should('be.visible'));
    });
  });

  describe('Link color', () => {
    const linkDemo = alerts.exampleDemosArr.link;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    it('links can be provided by class alert-link', () => {
      alertTypes.forEach(type => cy.get(`${ linkDemo } .${ type }`).find(alerts.linkClass)
        .should('have.attr', 'href', '#'));
    });
  });

  describe('Additional content', () => {
    const contentDemo = alerts.exampleDemosArr.content;

    it('alert with additional content contains html elements', () => {
      cy.get(contentDemo).find(alerts.alertClass)
        .should('to.have.descendants', 'h4')
        .and('to.have.descendants', 'p')
        .and('to.have.descendants', alerts.heading);
    });
  });

  describe('Dismissing alert', () => {
    const dismissingDemo = alerts.exampleDemosArr.dismissing;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];

    it('alerts can stop being dismissible', () => {
      cy.get(dismissingDemo).find(alerts.alertClass).last().as('dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, alerts.buttonToggler);
      cy.get('@dismissAlert')
        .should('not.to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, alerts.buttonToggler);
      cy.get('@dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);
    });

    it('alerts can all be closed and then resetting to default state', () => {
      alertTypes.forEach(type =>
        cy.get(`${ dismissingDemo } .${ type } ${alerts.dismissOption}`).click());

      alertTypes.forEach(type => cy.get(`${ dismissingDemo } .${ type }`)
        .should('not.to.exist'));

      alerts.clickByText(dismissingDemo, alerts.buttonReset);
      alertTypes.forEach(type => cy.get(`${ dismissingDemo } .${ type }`)
        .should('to.exist'));
    });
  });

  describe('Dynamic html', () => {
    const dynamicHtml = alerts.exampleDemosArr.dynamicHtml;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];

    it('each alert contains style and content from component', () => {
      alertTypes.forEach(type => cy.get(`${ dynamicHtml} .${ type }`)
        .should('be.visible')
        .and('to.have.descendants', alerts.textWrapper));
    });
  });

  describe('Dynamic content', () => {
    const dynamicContent = alerts.exampleDemosArr.dynamicContent;
    const dynamicAlertText = [
      'You successfully read this important alert message.',
      'Now this text is different from what it was before. Go ahead and click the button one more time',
      'Well done! Click reset button'
    ];

    it('alert\'s content can be changed dynamicly', () => {
      dynamicAlertText.forEach(text => {
        cy.get(dynamicContent).find(alerts.alertClass)
          .should('to.contain', text);
        cy.get(dynamicContent).find('button').click();
      });
    });
  });

  describe('Global styling', () => {
    const globalStyle = alerts.exampleDemosArr.globalStyling;
    const stylesColors = [
      'rgb(123, 31, 162)', // violet
      'rgb(74, 20, 140)', // indigo
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(globalStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Component level styling', () => {
    const componentStyle = alerts.exampleDemosArr.localStyling;
    const stylesColors = [
      'rgb(0, 150, 136)', // dark cyan
      'rgb(0, 105, 92)', // mosque
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(componentStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = alerts.exampleDemosArr.config;
    const alertTypes = [
      'alert-success',
      'alert-info'
    ];

    it('each alert contains added config', () => {
      alertTypes.forEach(type => cy.get(`${ configDemo } .${ type }`)
        .should('be.visible'));
    });
  });
});

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();

  const buttonNames = [
    'Left',
    'Middle',
    'Right'
  ];

  beforeEach(() => buttons.navigateTo());

  describe('Basic single button', () => {
    const basicBtn = buttons.exampleDemosArr.basic;

    it('example contains only enabled button', () => {
      cy.get(` ${ basicBtn } ${ buttons.buttonSel }`)
        .should('to.be.enabled');
    });
  });

  describe('Checkbox', () => {
    const checkboxDemo = buttons.exampleDemosArr.checkbox;

    it('checkboxes can be checked or unchecked', () => {
      cy.get(`${ checkboxDemo } ${ buttons.output }`).as('output')
        .should('to.contain', `"${buttonNames[1].toLowerCase()}": true`);
      buttons.clickByText(checkboxDemo, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${button.toLowerCase()}": false`);

        buttons.clickByText(checkboxDemo, button);
        cy.get('@output')
          .should('to.contain', `"${button.toLowerCase()}": true`);
      });
    });
  });

  describe('Custom checkbox value', () => {
    const customCheckboxVal = buttons.exampleDemosArr.customCheckboxVal;

    it('examples contains output, which can be changed by click on output', () => {
      const defaultVal = '1';
      const afterClickVal = '0';

      cy.get(` ${ customCheckboxVal } ${ buttons.output }`).as('header')
        .should('to.contain', defaultVal);

      cy.get(` ${ customCheckboxVal } ${ buttons.buttonSel }`).click();
      cy.get('@header')
        .should('to.contain', afterClickVal);
    });
  });

  describe('Checkbox with Reactive Form', () => {
    const checkboxWithForm = buttons.exampleDemosArr.checkboxWithForms;

    it('checkboxes can be checked or unchecked and its\' states are displayed at reactive form', () => {
      cy.get(` ${ checkboxWithForm } ${ buttons.output }`).as('output')
        .should('to.contain', `"${buttonNames[1].toLowerCase()}": true`);
      buttons.clickByText(checkboxWithForm, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${button.toLowerCase()}": false`);

        buttons.clickByText(checkboxWithForm, button);
        cy.get('@output')
          .should('to.contain', `"${button.toLowerCase()}": true`);
      });
    });
  });

  describe('Radio buttons', () => {
    const radioCheck = buttons.exampleDemosArr.radioBtn;

    it('checked radio button created with ngModel is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names and classes
      cy.get(radioCheck).eq(0).as('radio').find('.btn-group').first().as('radioNgModel');

      buttonNames.forEach(name => {
        buttons.clickByText('@radioNgModel', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });

    it('checked radio buttons created with btnRadioGroup is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioCheck).eq(0).as('radio').find(`${ buttons.btnRadioGroupSel}`).as('checkBtnRadioGroup');

      buttonNames.forEach(name => {
        buttons.clickByText('@checkBtnRadioGroup', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });
  });

  describe('Uncheckable radio', () => {
    const radioUncheck = buttons.exampleDemosArr.radioBtn;

    it('uncheckable radio buttons can be checked or unchecked', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioUncheck).eq(1).as('radioUncheck').find(`${ buttons.btnRadioGroupSel}`).as('uncheckBtnRadio');

      buttonNames.forEach(name => {
        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.contain', name);

        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.be', null);
      });
    });
  });

  describe('Radio with Reactive Forms', () => {
    const radioWithForm = buttons.exampleDemosArr.radioBtnWithForms;

    it('radio example should dynamicly update reactive form', () => {
      const btns = ['A', 'B', 'C'];

      btns.forEach(radio => {
        buttons.clickByText(radioWithForm, radio);

        cy.get(`${ radioWithForm } ${ buttons.output}`)
          .should('to.contain', radio);
      });
    });
  });

  describe('Disabled Buttons', () => {
    const disabled = buttons.exampleDemosArr.disabled;

    it('disabled buttons examples contains button, that can be disabled', () => {
      cy.get(disabled).contains('Button').as('btnForDisabling')
        .should('to.be.enabled');
      buttons.clickByText(disabled, 'Enable/Disable');

      cy.get('@btnForDisabling')
        .should('not.to.be.enabled');
    });
  });
});

describe('Carousel page test suite', () => {
  const carousel = new CarouselPo();

  beforeEach(() => carousel.navigateTo());

  describe('Basic demo', () => {
    const basic = carousel.exampleDemosArr.basic;

    it('demo example contains slides, indicators, left and right controls', () => {
      cy.get(basic).find(carousel.carouselClass)
        .should('to.have.descendants', carousel.indicatorClass)
        .and('to.have.descendants', carousel.itemClass)
        .and('to.have.descendants', carousel.leftControl)
        .and('to.have.descendants', carousel.rightControl);
    });
  });
});

describe('Collapse demo page test suite', () => {
  const collapse = new CollapsePo();

  beforeEach(() => collapse.navigateTo());

  describe('Basic demo', () => {
    const basic = collapse.exampleDemosArr.basic;

    it('contains togler and content, that could be collapsed', () => {
      const toglerText = 'Toggle collapse';

      cy.get(`${basic} ${collapse.collapseClass}`)
        .should('to.have.class', collapse.showIndicator);

      collapse.clickByText(basic, toglerText);
      cy.get(`${ basic } ${ collapse.collapseClass }`)
        .should('not.to.have.class', collapse.showIndicator);
    });
  });
});

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Basic demo', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('basic date- and daterangepicker can be opened by click on input', () => {
      cy.get(`${ basic } ${ datepicker.datepickerInput }`).click();
      cy.get(datepicker.datepickerLastOpened)
        .should('to.be.visible');

      cy.get(`${ basic } ${ datepicker.daterangepickerInput }`).click();
      cy.get(datepicker.daterangepickerLastOpened)
        .should('to.be.visible');
    });
  });

  describe('Custom date format', () => {
    const customFormat = datepicker.exampleDemosArr.customFormat;

    it('by default, today\'s date is displayed at first output in format YYYY-MM-DD', () => {
      const expectedDate = Cypress.moment(new Date()).format('YYYY-MM-DD');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).first()
        .should('have.value', `${ expectedDate }`);
    });

    it('by default, today\'s date is displayed at second output in format MM/DD/YYYY', () => {
      const expectedDate = Cypress.moment(new Date()).format('MM/DD/YYYY');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).eq(1)
        .should('have.value', `${ expectedDate }`);
    });

    it('by default, third output have date format MMMM Do YYYY,h:mm:ss a', () => {
      const expectedConfig = {dateInputFormat: 'MMMM Do YYYY, h:mm:ss a'};

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).eq(2)
        .should('to.have.attr', datepicker.bsconfigAttr, `${ expectedConfig }`);
    });
  });

  describe('Reactive forms', () => {
    const reactiveForms = datepicker.exampleDemosArr.reactiveForms;
    const currentDate = new Date();

    it('chosen in datepicker date can be displayed in reactive form', () => {
      const expectedDate = Cypress.moment(currentDate).format('YYYY-MM-DD');

      cy.get(`${ reactiveForms } ${ datepicker.datepickerInput }`).click();
      cy.get(`${ datepicker.datepickerLastOpened }  ${ datepicker.datepickerDays }`)
        .contains(currentDate.getDate()).click();

      cy.get(`${ reactiveForms } ${ datepicker.formOutput }`)
        .should('to.contain', `"date": "${ expectedDate }`);
    });
  });
});

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => dropdowns.navigateTo());

  describe('Single button dropdowns', () => {
    const singleBtn = dropdowns.exampleDemosArr.singleButton;

    it('single button dropdown is shown after click on toggler', () => {
      const togglerText = 'Button dropdown';
      const showIndicator = 'show';

      dropdowns.clickByText(singleBtn, togglerText);
      cy.get(singleBtn).find('.dropdown-menu').as('dropdownMenu')
        .should('to.have.class', showIndicator);

      dropdowns.clickByText(singleBtn, togglerText);
      cy.get('@dropdownMenu')
        .should('not.to.have.class', showIndicator);
    });
  });

  describe('Trigger by tag \<\a\>', () => {
    const triggerTag = dropdowns.exampleDemosArr.triggerByTag;

    it('dropdowns can be triggered by tag a', () => {
      cy.get(triggerTag).children('span').as('triggerTag')
        .should('not.to.have.descendants', '.dropdown-menu');

      cy.get('@triggerTag').children('a').as('link').click();
      cy.get('@triggerTag').children('.dropdown-menu').as('dropdownMenu')
        .should('to.have.class', 'show');

      cy.get('@link').click();
      cy.get('@dropdownMenu')
        .should('not.to.have.class', 'show');
    });
  });

  describe('Split button dropdowns', () => {
    const splitBtn = dropdowns.exampleDemosArr.splitButton;

    it('dropdown could have split button', () => {
      const buttonText = 'Action';
      const showIndicator = 'show';

      dropdowns.clickByText(splitBtn, buttonText);
      cy.get(splitBtn).children('.btn-group').as('splitButton').children('.dropdown-menu')
        .should('not.to.have.class', showIndicator);

      cy.get('@splitButton').children('.dropdown-toggle').click();
      cy.get('@splitButton').children('.dropdown-menu')
        .should('to.have.class', showIndicator);
    });
  });

  describe('Disabled menu', () => {
    const disabled = dropdowns.exampleDemosArr.disabledMenu;

    it('dropdown button can be disabled', () => {
      const btnEnableDisable = 'Enable/Disable';

      dropdowns.clickByText(disabled, btnEnableDisable);
      cy.get(disabled).find('.dropdownToggle')
        .should('not.to.be.enabled');
    });
  });
});

describe('Landing Page test suite', () => {
  const landing = new LandingPo();

  beforeEach(() => landing.navigateTo());

  describe('Content', () => {
    it('successfully loads and displays logo, info buttons, description and advantages', () => {
      cy.get('.logo')
        .should('be.visible');
      cy.get('.header-info')
        .should('be.visible');
      cy.get('.content-logo')
        .should('be.visible');
      cy.get('.slogan')
        .should('be.visible');
      cy.get('.descr')
        .should('be.visible');
      cy.get('.version')
        .should('be.visible');
      cy.get('.advantages')
        .should('be.visible');
    });

    it('footer contains links to valor gh account, contributors, MIT, Creative Commons and to Bootstrap', () => {
      cy.get('footer p').as('footer').eq(0).children('a').eq(0)
        .should('have.attr', 'href', landing.teamUrl);
      cy.get('@footer').eq(0).children('a').eq(1)
        .should('have.attr', 'href', landing.contributorsUrl);
      cy.get('@footer').eq(1).children('a').eq(0)
        .should('have.attr', 'href', landing.mitLicenseUrl);
      cy.get('@footer').eq(1).children('a').eq(1)
        .should('have.attr', 'href', landing.crCommonsUrl);
      cy.get('@footer').eq(2).children('a')
        .should('have.attr', 'href', landing.originalBsUrl);
    });
  });

  describe('Navigation buttons', () => {
    it('Get started button redirects to Getting Started page', () => {
      const buttonText = 'Get started';
      const searchedUrl = '/getting-started';

      landing.clickByText('.btn', buttonText);

      cy.url()
        .should('include', searchedUrl);
    });

    it('Github button is enabled and contains link to ngx-bootstrap repo', () => {
      const buttonText = 'Github';

      cy.get('.btn').contains(buttonText)
        .should('be.enabled')
        .and('have.attr', 'href', landing.githubUrl);
    });

    it('Info buttons in header are enabled and contains links to slack, github and stackoverflow', () => {
      cy.get('.header-list li a').as('infoButton').eq(0)
        .should('be.enabled')
        .and('have.attr', 'href', landing.stackoverflowUrl);
      cy.get('@infoButton').eq(1)
        .should('be.enabled')
        .and('have.attr', 'href', landing.githubUrl);
      cy.get('@infoButton').eq(2)
        .should('be.enabled')
        .and('have.attr', 'href', landing.slackUrl);
    });
  });
});

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();

  beforeEach(() => modals.navigateTo());

  describe('Service examples', () => {

    describe('Template modal', () => {
      const templateModal = modals.exampleDemosArr.serviceTemplate;

      it('template service modal can be opened by click on button and closed by backdrop-click', () => {
        const buttonText = 'Create template modal';

        modals.clickByText(templateModal, buttonText);
        cy.get('modal-container')
          .should('to.be.visible');

        cy.get('modal-container').click();
        cy.get('modal-container')
          .should('not.to.be.visible');
      });
    });

    describe('Component modal', () => {
      const componentModal = modals.exampleDemosArr.serviceComponent;

      it('component service modal can be opened by click on button and closed by clicking Close button', () => {
        const buttonText = 'Create modal with component';
        const modalCloseBtn = 'Close';

        modals.clickByText(componentModal, buttonText);
        cy.get('modal-container')
          .should('to.be.visible');

        modals.clickByText('modal-content', modalCloseBtn);
        cy.get('modal-container')
          .should('not.to.be.visible');
      });
    });
  });

  describe('Directive examples', () => {

    describe('Static modal', () => {
      const staticModal = modals.exampleDemosArr.directiveStatic;

      it('directive static modal can be closed by clicking Close button', () => {
        const buttonText = 'Static modal';

        modals.clickByText(staticModal, buttonText);
        cy.get('.modal-content')
          .should('to.be.visible');

        cy.get(staticModal).find('.modal-header').find('.close').click();
        cy.get('.modal-content')
          .should('not.to.be.visible');
      });
    });

    describe('Child modal', () => {
      const childModals = modals.exampleDemosArr.directiveChild;

      it('directive child modal can be closed by backdrop click', () => {
        const buttonText = 'Open child modal';

        modals.clickByText(childModals, buttonText);
        cy.get('.modal-content')
          .should('to.be.visible');

        cy.get(childModals).find('.modal').click();
        cy.get('.modal-content')
          .should('not.to.be.visible');
      });
    });
  });
});

describe('Pagination demo page test suite', () => {
  const pagination = new PaginationPo();

  beforeEach(() => pagination.navigateTo());

  describe('Pager example', () => {
    const pager = pagination.exampleDemosArr.pager;

    it('active page can be changed by clicking toggler buttons', () => {
      const prevBtn = 'Previous';
      const nextBtn = 'Next';

      pagination.clickByText(pager, prevBtn);
      cy.get(pager).find('.pagination').children('.active')
        .should('to.contain', '3');

      pagination.clickByText(pager, nextBtn);
      cy.get(pager).find('.pagination').children('.active')
        .should('to.contain', '4');
    });
  });
});

describe('Popover demo page test suite', () => {
  const popover = new PopoverPo();

  beforeEach(() => popover.navigateTo());

  describe('Basic popover', () => {
    const basicPopover = popover.exampleDemosArr.basic;

    it('basic popover appears after clicking on trigger button', () => {
      const buttonText = 'Live demo';

      popover.clickByText(basicPopover, buttonText);
      cy.get(basicPopover).should('to.have.descendants', 'popover-container');
    });
  });
});

describe('Progressbar demo page test suite', () => {
  const progressbar = new ProgressbarPo();

  beforeEach(() => progressbar.navigateTo());

  describe('Configuring defaults', () => {
    const configured = progressbar.exampleDemosArr.config;

    it('preconfigured progressbar contains styles and value from config', () => {
      cy.get(`${ configured } progressbar`).as('progressbarConf')
        .should('to.have.attr', 'type', 'danger')
        .and('to.have.attr', 'max', '150');

      cy.get('@progressbarConf').find('bar')
        .should('to.have.class', 'progress-bar-animated')
        .and('to.have.class', 'progress-bar-striped')
        .and('to.have.class', 'progress-bar-danger')
        .and('to.have.attr', 'aria-valuenow', '136');
    });
  });
});

describe('Rating demo page test suite', () => {
  const rating = new RatingPo();

  beforeEach(() => rating.navigateTo());

  describe('Basic example', () => {
    const basic = rating.exampleDemosArr.basic;

    it('basic rating example contains readonly rating with preconfigured values', () => {
      cy.get(basic).children('rating').as('rating')
        .should('to.be.visible')
        .and('not.to.be.enabled');
      cy.get('@rating').children('span')
        .should('to.have.attr', 'aria-valuemax', '10')
        .and('to.have.attr', 'aria-valuenow', '7');

      cy.get(basic).find('.card-block')
        .should('to.have.text', 'Rate: 7 ');
    });
  });
});

describe('Sortable demo page test suite', () => {
  const sortable = new SortablePo();

  beforeEach(() => sortable.navigateTo());

  describe('Basic', () => {
    const basic = sortable.exampleDemosArr.basic;

    it('sortable items are placed at two sortable-wrappers', () => {
      cy.get(`${ basic } .sortable-wrapper`).as('wrapper').eq(0)
        .should('to.have.descendants', '.sortable-item');
      cy.get('@wrapper').eq(1)
        .should('to.have.descendants', '.sortable-item');
    });
  });
});

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();

  beforeEach(() => tabs.navigateTo());

  describe('Configuring defaults', () => {
    const configDemo = tabs.exampleDemosArr.config;

    it('configuring defaults example contains preconfigured tabs', () => {
      cy.get(configDemo).find('.nav-pills').children('.nav-item').as('pills').eq(0)
        .should('to.have.class', 'active');
      cy.get('@pills').eq(1)
        .should('not.to.have.class', 'active');

      cy.get('@pills').eq(1).click();
      cy.get(configDemo).find('.nav-pills').children('.nav-item').as('pills').eq(0)
        .should('not.to.have.class', 'active');
      cy.get('@pills').eq(1)
        .should('to.have.class', 'active');
    });
  });
});

describe('Timepicker demo page test suite', () => {
  const timepicker = new TimepickerPo();

  beforeEach(() => timepicker.navigateTo());

  describe('Meridian example', () => {
    const meridian = timepicker.exampleDemosArr.meridian;
    const togglerText = '12H / 24H';

    it('first click on 12/24 toggler removes AM/PM button', () => {
      cy.get(meridian).find('.btn-default').as('am/pm')
        .should('to.exist');
      timepicker.clickByText(meridian, togglerText);
      cy.get('@am/pm')
        .should('not.to.exist');
    });
  });
});

describe('Tooltip demo page test suite', () => {
  const tooltip = new TooltipPo();

  beforeEach(() => tooltip.navigateTo());

  describe('Basic tooltip', () => {
    const basic = tooltip.exampleDemosArr.basic;

    it('basic tooltip appears after hovering on trigger button', () => {
      cy.get(basic).as('basicDemo').children('.btn').focus();
      cy.get('@basicDemo')
        .should('to.have.descendants', 'bs-tooltip-container');
    });
  });
});

describe('Typeahead demo page test suite', () => {
  const typeahead = new TypeaheadPo();

  beforeEach(() => typeahead.navigateTo());

  describe('Reactive forms', () => {
    const reactiveForm = typeahead.exampleDemosArr.reactiveForms;

    it('reactive forms typeahead appears after focus at input', () => {
      cy.get(reactiveForm).as('reactiveForm').find('input').focus();
      cy.get('@reactiveForm')
        .should('to.have.descendants', 'typeahead-container');
    });
  });
});
