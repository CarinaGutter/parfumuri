'use strict';

// Define the `perfumecatApp` module
const app= angular.module('perfumecatApp', [
  'ui.router',
  'brandModule',
  'sellerModule'
]);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
   $urlRouterProvider.otherwise('/home')
   $stateProvider
   .state('about', {
            url: '/about',
            templateUrl:'views/about.html',
        })
    .state('login', {
            url: '/login',
            templateUrl:'views/login.html',
            controller: 'loginController'
        })
    .state('brands', {
            url : '/brands',
            templateUrl : 'views/brands.html',
            controller : 'brandController'
        })
    .state('brandDetails', {
            url: '/brands/:id',
            templateUrl:'views/brand-details.html',
            controller: 'brandDetailsController'
        })
    .state('sellerDetails', {
            url: '/sellers/:id',
            templateUrl:'views/seller-details.html',
            controller: 'sellerDetailsController'
        })
    .state('home', {
            url: '/home',
            templateUrl:'views/home.html'
   })
}])