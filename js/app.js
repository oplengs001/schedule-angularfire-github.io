angular.module('myApp', [ 'myApp.controllers', 'myApp.routes','firebase','ngDialog'])


.run(function(ngDialog,$rootScope) {


        ngDialog.open({ template: 'firstDialog', className: 'ngdialog-theme-default' , showClose: false });
$rootScope.ngDialog = ngDialog;

});