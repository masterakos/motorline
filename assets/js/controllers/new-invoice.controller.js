angular
  .module('motorlineApp')
  .controller('NewInvoiceController', NewInvoiceController);

  NewInvoiceController.$inject = ['$state', '$http'];

  function NewInvoiceController($state, $http) {
    var vm = this;

    vm.invoice = {
      products: []
    };

    var picker = new Pikaday({
      field: document.getElementById('datepicker-date'),
      setDefaultDate: true,
      defaultDate: new Date()
    });

    vm.submit = function() {
      var date = new Date();
      vm.invoice.date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);

      $http({
        url: 'invoice/insert',
        method: 'POST',
        data: vm.invoice
      }).then(function(response) {
        $state.go('invoice', { invoiceId: response.data });
      });
    };

    vm.addProduct = function() {
      for (var key in vm.newProduct) vm.newProduct[key] = vm.newProduct[key].toUpperCase();
      vm.invoice.products.push(vm.newProduct);
      vm.newProduct = {
        code: '',
        description: '',
        quantity: '',
        price: ''
      };
    }
  }
