angular
  .module('motorlineApp')
  .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$http'];

  function OrdersController($http) {
    var vm = this;

    vm.orders = [];
    vm.q = '';

    vm.search = function() {
      if (!vm.q) return;
      $http({
        url: 'orders/search?q=' + vm.q,
        method: 'GET'
      }).then(function(response) {
        vm.orders = response.data;
        vm.orders.forEach(function(order) {
          order.date = new Date(order.date).toDateString();
        });
      });
    };

    vm.searchByDate = function() {
      var from = new Date(document.getElementById('datepicker-from').value);
      var to = new Date(document.getElementById('datepicker-to').value);

      if (!from.getTime() || !to.getTime()) {
        alert('ΕΠΙΛΕΞΤΕ ΑΠΟ - ΕΩΣ');
        return;
      }

      from = from.getUTCFullYear() + '-' +
        ('00' + (from.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + (from.getUTCDate() + 1)).slice(-2);

      to = to.getUTCFullYear() + '-' +
        ('00' + (to.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + (to.getUTCDate() + 1)).slice(-2);

      $http({
        url: 'orders/search?from=' + from + '&to=' + to,
        method: 'GET'
      }).then(function(response) {
        vm.orders = response.data;
        vm.orders.forEach(function(order) {
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

    $http({
      url: 'orders',
      method: 'GET'
    }).then(function(response) {
      vm.orders = response.data;
      vm.orders.forEach(function(order) {
        order.date = new Date(order.date).toDateString();
      });
    });
  }
