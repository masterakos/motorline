<!DOCTYPE html>
<html lang="el">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <?php foreach($assets['css'] as $asset) { ?>
<?='<link rel="stylesheet" href="assets/' . $asset . '">'?>

  <?php } ?>
</head>
<body ng-app="motorlineApp" ng-controller="AppController as vm">
  <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item brand-text" ui-sref="index">Motorline Service</a>
        <div class="navbar-burger burger" data-target="navMenu"><span></span><span></span><span></span></div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" ng-class="{'is-active': vm.currentPath == 'customers'}" ui-sref="customers">ΠΕΛΑΤΕΣ</a>
          <a class="navbar-item" ng-class="{'is-active': vm.currentPath == 'vehicles'}" ui-sref="vehicles">ΑΥΤΟΚΙΝΗΤΑ</a>
          <a class="navbar-item" ng-class="{'is-active': vm.currentPath == 'orders'}" ui-sref="orders">ΕΡΓΑΣΙΕΣ</a>
          <a class="navbar-item" ng-class="{'is-active': vm.currentPath == 'invoices'}" ui-sref="invoices">ΤΙΜΟΛΟΓΙΑ</a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">
            Γενικά
          </p>
          <ul class="menu-list">
            <li>
              <ul>
                <li><a ui-sref="new-customer-full" ng-class="{'is-active': vm.currentPath == 'new-customer-full'}">Νέα Καταχώρηση Πελάτη</a></li>
                <!-- <li><a ui-sref="customers">Αναζήτηση</a></li> -->
              </ul>
            </li>
          </ul>
          <p class="menu-label">
            Πελάτες
          </p>
          <ul class="menu-list">
            <li>
              <ul>
                <li><a ui-sref="new-customer" ng-class="{'is-active': vm.currentPath == 'new-customer'}">Νέος Πελάτης</a></li>
                <!-- <li><a ui-sref="customers">Αναζήτηση</a></li> -->
              </ul>
            </li>
          </ul>
          <p class="menu-label">
            Αυτοκίνητα
          </p>
          <ul class="menu-list">
            <li>
              <ul>
                <li><a ui-sref="new-vehicle" ng-class="{'is-active': vm.currentPath == 'new-vehicle'}">Νέο Αυτοκίνητο</a></li>
                <!-- <li><a ui-sref="vehicles">Αναζήτηση</a></li> -->
              </ul>
            </li>
          </ul>
          <p class="menu-label">
            Εργασίες
          </p>
          <ul class="menu-list">
            <li>
              <ul>
                <li><a ui-sref="new-order" ng-class="{'is-active': vm.currentPath == 'new-order'}">Νέα Εργασία</a></li>
                <!-- <li><a>Αναζήτηση</a></li> -->
              </ul>
            </li>
          </ul>
          <p class="menu-label">
            Τιμολόγια
          </p>
          <ul class="menu-list">
            <li>
              <ul>
                <li><a ui-sref="new-invoice" ng-class="{'is-active': vm.currentPath == 'new-invoice'}">Νέο Τιμολόγιο</a></li>
                <!-- <li><a>Αναζήτηση</a></li> -->
              </ul>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column is-9">
        <ui-view></ui-view>
      </div>
    </div>
  </div>

<?php foreach($assets['js'] as $asset) { ?>
  <?='<script src="assets/' . $asset . '"></script>'?>

<?php } ?>
</body>
</html>
