angular
  .module('motorlineApp')
  .controller('InvoiceController', InvoiceController);

  InvoiceController.$inject = ['$http', '$stateParams'];

  function InvoiceController($http, $stateParams) {
    var vm = this;

    vm.invoice = {
      products: []
    };

    $http({
      url: 'invoices/' + $stateParams.invoiceId,
      method: 'GET'
    }).then(function(response) {
      vm.invoice = response.data;
      vm.invoice.date = moment(vm.invoice.date).format('D/M/YYYY m:h');
      vm.invoice.totalPrice = 0;
      vm.invoice.products.forEach(function(product) {
        vm.invoice.totalPrice += parseFloat(product.price);
        product.price = parseFloat(product.price).toFixed(2).toString().replace('.', ',');
      });
      vm.invoice.totalPrice = vm.invoice.totalPrice.toFixed(2).toString().replace('.', ',') + "€";
    });
  }
