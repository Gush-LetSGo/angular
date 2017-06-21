var myApp = angular.module("myApp", ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/PageTab");

     $stateProvider
        .state("PageTab", {
            url: "/PageTab",
            templateUrl: "tpls/PageTable.html"
        })
        .state("Page1", {
            url:"/Page1",
            templateUrl: "tpls/Page1.html"
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "tpls/Page2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "tpls/Page3.html"
        });
});