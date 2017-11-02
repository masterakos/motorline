Vue.use(VueRouter);
Vue.use(VueResource);

var Customers = {
  template: '<div><ul><li v-for="customer in customers">{{ customer.firstname }}</li></ul></div>',
  data: function() {
    return {
      customers: []
    };
  },
  created: function() {
    var customers = this.customers;
    this.$http.get('customers').then(function(response) {
      customers = response.body;
    });
  }
};

var Dashboard = {
  template: '<div>{{ foo }}</div>',
  data: function() {
    return {
      foo: 'bar'
    };
  }
};

var routes = [
  { name: 'Index', path: '/', component: Dashboard },
  { name: 'Customers', path: '/customers', component: Customers }
];

var router = new VueRouter({
  routes: routes
});

var app = new Vue({
  el: '#app',
  router: router
});
