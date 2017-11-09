angular
  .module('motorlineApp')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'index',
        url: '/',
        templateUrl: 'assets/templates/index.html'
      })
      .state({
        name: 'customers',
        url: '/customers',
        templateUrl: 'assets/templates/customers.html'
      })
      .state({
        name: 'customer',
        url: '/customer/:customerId',
        templateUrl: 'assets/templates/customer.html'
      })
      .state({
        name: 'new-customer',
        url: '/customer/new',
        templateUrl: 'assets/templates/new-customer.html'
      })
      .state({
        name: 'edit-customer',
        url: '/customer/update/:customerId',
        templateUrl: 'assets/templates/edit-customer.html'
      });

    $stateProvider
      .state({
        name: 'vehicles',
        url: '/vehicles',
        templateUrl: 'assets/templates/vehicles.html'
      })
      .state({
        name: 'vehicle',
        url: '/vehicle/:vehicleId',
        templateUrl: 'assets/templates/vehicle.html'
      })
      .state({
        name: 'new-vehicle',
        url: '/vehicle/new',
        templateUrl: 'assets/templates/new-vehicle.html'
      })
      .state({
        name: 'edit-vehicle',
        url: '/vehicle/update/:vehicleId',
        templateUrl: 'assets/templates/edit-vehicle.html'
      });

    $stateProvider
      .state({
        name: 'new-order',
        url: '/order/new',
        templateUrl: 'assets/templates/new-order.html'
      })
      .state({
        name: 'orders',
        url: '/orders',
        templateUrl: 'assets/templates/orders.html'
      })
      .state({
        name: 'order',
        url: '/orders/:orderId',
        templateUrl: 'assets/templates/order.html'
      });

    $stateProvider
      .state({
        name: 'new-invoice',
        url: '/invoice/new',
        templateUrl: 'assets/templates/new-invoice.html'
      })
      .state({
        name: 'invoice',
        url: '/invoice/:invoiceId',
        templateUrl: 'assets/templates/invoice.html'
      })
      .state({
        name: 'invoices',
        url: '/invoices',
        templateUrl: 'assets/templates/invoices.html'
      });

    $stateProvider
      .state({
        name: 'new-customer-full',
        url: '/new-customer-full',
        templateUrl: 'assets/templates/new-customer-full.html'
      });

    $urlRouterProvider.otherwise('/');
  });
