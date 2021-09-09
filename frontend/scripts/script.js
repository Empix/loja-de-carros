(function ($) {
  'use strict';

  function app() {
    return {
      init: function init() {
        this.companyInfo();
        this.initEvents();
        this.getCars();
      },

      getCars: function getCars() {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/cars');
        ajax.send();

        ajax.addEventListener('readystatechange', () => {
          if (ajax.readyState === 4 && ajax.status === 200) {
            const cars = JSON.parse(ajax.responseText);

            cars.forEach((car) => {
              app().createNewCar(car);
            });
          }
        });
      },

      initEvents: function initEvents() {
        const $submitButton = $('[data-js="submit"]');
        $submitButton.on('click', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(event) {
        event.preventDefault();

        const inputsValues = app().getValuesFromInputs();

        const ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader(
          'Content-Type',
          'application/x-www-form-urlencoded'
        );
        ajax.send(
          `image=${inputsValues.image}&brand=${inputsValues.brand}&year=${inputsValues.year}&plate=${inputsValues.plate}&color=${inputsValues.color}`
        );

        ajax.addEventListener('readystatechange', () => {
          if (ajax.readyState === 4 && ajax.status === 200) {
            const car = JSON.parse(ajax.responseText);

            app().createNewCar(car);
          }
        });
      },

      getValuesFromInputs: function getValuesFromInputs() {
        return {
          image: $('[data-js="image"]').get().value,
          brand: $('[data-js="brand-model"]').get().value,
          year: $('[data-js="year"]').get().value,
          plate: $('[data-js="license-plate"]').get().value,
          color: $('[data-js="color"]').get().value,
        };
      },

      createNewCar: function createNewCar(data) {
        const tr = document.createElement('tr');

        const tdImage = document.createElement('td');
        const image = document.createElement('img');
        image.src = data.image;

        const tdBrandModel = document.createElement('td');
        tdBrandModel.textContent = data.brand;

        const tdYear = document.createElement('td');
        tdYear.textContent = data.year;

        const tdLicensePlate = document.createElement('td');
        tdLicensePlate.textContent = data.plate;

        const tdColor = document.createElement('td');
        tdColor.textContent = data.color;

        const tdRemove = document.createElement('td');
        const buttonRemove = document.createElement('button');
        buttonRemove.textContent = 'Remover';
        tdRemove.appendChild(buttonRemove);

        buttonRemove.addEventListener('click', function () {
          this.parentNode.parentNode.remove();
        });

        tdImage.appendChild(image);
        tr.appendChild(tdImage);
        tr.appendChild(tdBrandModel);
        tr.appendChild(tdYear);
        tr.appendChild(tdLicensePlate);
        tr.appendChild(tdColor);
        tr.appendChild(tdRemove);

        const $carTable = $('[data-js="car-table"] tbody');
        $carTable.get().appendChild(tr);
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
