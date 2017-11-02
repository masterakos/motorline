<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'app/index';

$route['customers'] = 'customers/index';
$route['customers/(:num)'] = 'customers/get/$1';
$route['customers/new'] = 'customers/insert';
$route['customers/search'] = 'customers/search';
$route['customers/delete/(:num)'] = 'customers/delete/$1';
$route['customers/update/(:num)'] = 'customers/update/$1';

$route['vehicles'] = 'vehicles/index';
$route['vehicles/(:num)'] = 'vehicles/get/$1';
$route['vehicles/new'] = 'vehicles/insert';
$route['vehicles/search'] = 'vehicles/search';
$route['vehicles/delete/(:num)'] = 'vehicles/delete/$1';
$route['vehicles/update/(:num)'] = 'vehicles/update/$1';

$route['orders'] = 'orders/index';
$route['orders/(:num)'] = 'orders/get/$1';
$route['orders/new'] = 'orders/insert';

$route['invoices'] = 'invoices/index';
$route['invoice/insert'] = 'invoices/insert';
$route['invoices/(:num)'] = 'invoices/get/$1';

$route['connect/(:num)/(:num)'] = 'app/connect/$1/$2';
$route['disconnect/(:num)/(:num)'] = 'app/disconnect/$1/$2';

$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
