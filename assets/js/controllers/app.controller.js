angular
  .module('motorlineApp')
  .controller('AppController', AppController);

  AppController.$inject = ['$rootScope'];

  function AppController($rootScope) {
    var vm = this;

    vm.currentPath = '';

    $rootScope.$watch('stateName', function(val) {
      vm.currentPath = val;
    });
  }
