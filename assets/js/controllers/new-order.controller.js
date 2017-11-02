angular
  .module('motorlineApp')
  .controller('NewOrderController', NewOrderController);

  NewOrderController.$inject = ['$http', '$state'];

  function NewOrderController($http, $state) {
    var vm = this;

    vm.order = {
      customer: {},
      vehicle: {},
      products: []
    };

    vm.newProduct = {
      code: '',
      description: '',
      quantity: '',
      price: ''
    };

    vm.search = {
      customer: {
        isActive: false,
        q: '',
        search: function() {
          $http({
            url: 'customers/search?q=' + vm.search.customer.q,
            method: 'GET'
          }).then(function(response) {
            vm.search.customer.customers = response.data;
          });
        },
        customers: []
      },
      vehicle: {
        isActive: false,
        q: '',
        search: function() {
          $http({
            url: 'vehicles/search?q=' + vm.search.vehicle.q,
            method: 'GET'
          }).then(function(response) {
            vm.search.vehicle.vehicles = response.data;
          });
        },
        vehicles: []
      }
    };

    vm.addVehicle = function(id) {
      $http({
        url: 'vehicles/' + id,
        method: 'GET'
      }).then(function(response) {
        vm.order.vehicle = response.data;
        vm.search.customer.customers = vm.order.vehicle.customers;
        vm.search.vehicle.isActive = false;
      });
    };

    vm.addCustomer = function(id) {
      $http({
        url: 'customers/' + id,
        method: 'GET'
      }).then(function(response) {
        vm.order.customer = response.data;
        vm.search.vehicle.vehicles = vm.order.customer.vehicles;
        vm.search.customer.isActive = false;
      });
    };

    vm.addProduct = function() {
      for (var key in vm.newProduct) vm.newProduct[key] = vm.newProduct[key].toUpperCase();
      vm.newProduct.price = vm.newProduct.price.replace(',', '.');
      vm.newProduct.price = parseFloat(vm.newProduct.price).toFixed(2).toString();
      vm.order.products.push(vm.newProduct);
      vm.newProduct = {
        code: '',
        description: '',
        quantity: '',
        price: ''
      };
    };

    vm.submit = function() {
      if (!vm.order.customer.afm) {
        alert("ΚΑΤΑΧΩΡΗΣΗ ΠΕΛΑΤΗ");
        return;
      }
      if (!vm.order.vehicle.plate) {
        alert("ΚΑΤΑΧΩΡΗΣΗ ΑΥΤΟΚΙΝΗΤΟΥ");
        return;
      }

      var date = new Date();
      vm.order.date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);

      $http({
        url: 'orders/new',
        method: 'POST',
        data: vm.order
      }).then(function(response) {
        $state.go('order', { orderId: response.data });
      });
    };
  }
