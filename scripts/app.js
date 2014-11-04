angular.module('mardy', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider// These rules tell Angular which HTML file to load into the <div ng-view></div> area in index.html.
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/bits', {
        templateUrl: 'views/bits_and_bats.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });