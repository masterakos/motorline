angular
  .module('motorlineApp')
  .controller('OrderController', OrderController);

  OrderController.$inject = ['$stateParams', '$http'];

  function OrderController($stateParams, $http) {
    var vm = this;

    vm.order = {
      customer: {},
      vehicle: {},
      products: []
    };

    $http({
      url: 'orders/' + $stateParams.orderId,
      method: 'GET'
    }).then(function(response) {
      vm.order = response.data;
      vm.order.date = moment(vm.order.date).format('h:m D/M/YYYY');
      vm.order.productsFinal = 0;
      vm.order.products.forEach(function(product) {
        return vm.order.productsFinal += parseFloat(product.price);
      });
      vm.order.productsFinal = vm.order.productsFinal.toFixed(2).replace('.', ',') + '€';
    });

  }
