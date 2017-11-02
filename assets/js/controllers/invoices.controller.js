angular
  .module('motorlineApp')
  .controller('InvoicesController', InvoicesController);

  InvoicesController.$inject = ['$http'];

  function InvoicesController($http) {
    var vm = this;

    vm.invoices = [];

    vm.q = '';
    vm.search = function() {
      if (!vm.q) return;
      $http({
        url: 'invoices/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.invoices = response.data;
        vm.invoices.forEach(function(order) {
          order.date = new Date(order.date).toDateString();
        });
      });
    };

    var pickerFrom = new Pikaday({ field: document.getElementById('datepicker-from') });
    var pickerTo = new Pikaday({
      field: document.getElementById('datepicker-to'),
      setDefaultDate: true,
      defaultDate: new Date(new Date().getTime() + (86400000))
    });

    vm.searchByDate = function() {
      var from = new Date(document.getElementById('datepicker-from').value);
      var to = new Date(document.getElementById('datepicker-to').value);

      if (!from.getTime() || !to.getTime()) {
        alert('ΕΠΙΛΕΞΤΕ ΑΠΟ - ΕΩΣ');
        return;
      }

      from = from.getUTCFullYear() + '-' +
        ('00' + (from.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + from.getUTCDate()).slice(-2) + ' ' +
        ('00' + from.getUTCHours()).slice(-2) + ':' +
        ('00' + from.getUTCMinutes()).slice(-2) + ':' +
        ('00' + from.getUTCSeconds()).slice(-2);

      to = to.getUTCFullYear() + '-' +
        ('00' + (to.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + to.getUTCDate()).slice(-2) + ' ' +
        ('00' + to.getUTCHours()).slice(-2) + ':' +
        ('00' + to.getUTCMinutes()).slice(-2) + ':' +
        ('00' + to.getUTCSeconds()).slice(-2);

      $http({
        url: 'invoices/search?from=' + from + '&to=' + to,
        method: 'GET'
      }).then(function(response) {
        vm.invoices = response.data;
        vm.invoices.forEach(function(order) {
          order.date = new Date(order.date).toDateString();
        });
      });
    };

    $http({
      url: 'invoices',
      method: 'GET'
    }).then(function(response) {
      vm.invoices = response.data;
      vm.invoices.forEach(function(order) {
        order.date = new Date(order.date).toDateString();
      });
    });
  }
