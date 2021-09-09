(function ($) {
  'use strict';

  function app() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents() {
        const $submitButton = $('[data-js="submit"]');
        $submitButton.on('click', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();

        const $carTable = $('[data-js="car-table"] tbody');
        $carTable.get().appendChild(app().createNewCar());
      },

      createNewCar: function createNewCar() {
        const tr = document.createElement('tr');

        const tdImage = document.createElement('td');
        const image = document.createElement('img');
        image.src = $('[data-js="image"]').get().value;

        const tdBrandModel = document.createElement('td');
        tdBrandModel.textContent = $('[data-js="brand-model"]').get().value;

        const tdYear = document.createElement('td');
        tdYear.textContent = $('[data-js="year"]').get().value;

        const tdLicensePlate = document.createElement('td');
        tdLicensePlate.textContent = $('[data-js="license-plate"]').get().value;

        const tdColor = document.createElement('td');
        tdColor.textContent = $('[data-js="color"]').get().value;

        tdImage.appendChild(image);
        tr.appendChild(tdImage);
        tr.appendChild(tdBrandModel);
        tr.appendChild(tdYear);
        tr.appendChild(tdLicensePlate);
        tr.appendChild(tdColor);

        return tr;
      },

      companyInfo: function companyInfo() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'company.json');
        ajax.send();

        ajax.addEventListener('readystatechange', () => {
          if (ajax.readyState === 4 && ajax.status === 200) {
            const data = JSON.parse(ajax.responseText);

            const $companyName = $('[data-js="companyName"]');
            const $companyPhone = $('[data-js="companyPhone"]');

            $companyName.get().textContent = data.name;
            $companyPhone.get().textContent = data.phone;
          }
        });
      },
    };
  }

  app().init();
})(DOM);
