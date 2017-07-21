angular.module('myApp', [ 'myApp.controllers','myApp.routes','firebase','ngDialog','ui.bootstrap'])


.run(function(ngDialog,$rootScope) {


        ngDialog.open({ template: 'firstDialog', className: 'ngdialog-theme-default' , showClose: false });


        $rootScope.openNext = function(){
          ngDialog.close('ngdialog1');
          ngDialog.open({ template: 'secDialog', className: 'ngdialog-theme-default' , showClose: false });
        }



        $rootScope.slides = [
    {
      image: 'sshots/s1.jpg',description: 'Navigation bar will let you choose what type of user you want to be.'
    },
    {
      image: 'sshots/s2.jpg',description: 'click on the available time slots for you to have a request on the Acceptor'
    },
    {
      image: 'sshots/s3.jpg',description: 'Acceptor page indicates real-time online users'
    },
    {
      image: 'sshots/s4.jpg',description: 'Acceptor need to click pending time slots and choose whether to reject or book the request'
    }
  ];
});


