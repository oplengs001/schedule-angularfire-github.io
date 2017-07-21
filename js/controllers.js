angular.module('myApp.controllers', [])




.controller('MainCtrl',function($scope,$firebase,$rootScope){

    // get # of real time users
  var listRef = new Firebase("https://scheduler-4d462.firebaseio.com/presence/");
  var userRef = listRef.push();
  
  // Add ourselves to presence list when online.
  var presenceRef = new Firebase("https://scheduler-4d462.firebaseio.com/.info/connected");

  //Listeners --------
  presenceRef.on("value", function(snap) {

    if (snap.val()) {
      userRef.set(true);
      userRef.onDisconnect().remove();   // Remove ourselves when we disconnect.
    }
  });
  listRef.on("value", function(snap) {
    $scope.online = snap.numChildren();
  });  
   $rootScope.$on("$routeChangeStart",function (){
   // Remove when routeChanges
   userRef.remove();
  })
  //Listeners --------
  // connect to firebase 
  var ref = new Firebase("https://scheduler-4d462.firebaseio.com/days");  
  var fb = $firebase(ref);
  // sync as object 
  var syncObject = fb.$asObject();
  // three way data binding
  syncObject.$bindTo($scope, 'days');
  

  $scope.showMessage = function(day,time){

   swal({
  title: "Thankyou",
  text:  "You request to have a meeting on \n "+day+" at "+time+" \n Wait for the admin to accept your request",
  type: "success",
  animation: "slide-from-top"
})
  }
  
})

.controller('AccCtrl',function($scope,$firebase){
  
  var listRef = new Firebase("https://scheduler-4d462.firebaseio.com/presence/");
 
  listRef.on("value", function(snap) {
  $scope.$evalAsync(function() {
     $scope.online = snap.numChildren();
  });
  });
  // connect to firebase 
  var ref = new Firebase("https://scheduler-4d462.firebaseio.com/days");  
  var fb = $firebase(ref);
  // sync as object 
  var syncObject = fb.$asObject();
  // three way data binding
  syncObject.$bindTo($scope, 'days');
  // function to set the default data
  $scope.reset = function() {    

    fb.$set({
      monday: {
        name: 'Monday',
        slots: {
          09: {
            time: '9:00am',
            booked: false
          },
          0110: {
            time: '11:00am',
            booked: false
          },
          100: {
            time: '1:00pm',
            booked: false
          },
          300: {
            time: '3:00pm',
            booked: false
          },
          500: {
            time: '5:00pm',
            booked: false
          },
          700: {
            time: '7:00pm',
            booked: false
          }
    	  }
      },
      tuesday: {
        name: 'Tuesday',
        slots: {
          09: {
            time: '9:00am',
            booked: false
          },
          0110: {
            time: '11:00am',
            booked: false
          },
          100: {
            time: '1:00pm',
            booked: false
          },
          300: {
            time: '3:00pm',
            booked: false
          },
          500: {
            time: '5:00pm',
            booked: false
          },
          700: {
            time: '7:00pm',
            booked: false
          }
    	  }
      },
      wednesday: {
        name: 'Wednesday',
        slots: {
          09: {
            time: '9:00am',
            booked: false
          },
          0110: {
            time: '11:00am',
            booked: false
          },
          100: {
            time: '1:00pm',
            booked: false
          },
          300: {
            time: '3:00pm',
            booked: false
          },
          500: {
            time: '5:00pm',
            booked: false
          },
          700: {
            time: '7:00pm',
            booked: false
          }
    	  }
      }
    });    

  };
  
  $scope.showChoice = function(day,slot){

    var day = angular.lowercase(day);
 
  swal({
  title: "",
  text: "What do you want to do?",
  type: "info",
  showCancelButton: true,
  confirmButtonColor: "#F99090",
  cancelButtonText: "Reject!",
  confirmButtonText: "Booked!",
  closeOnConfirm: false,
  closeOnCancel: false
},
function(isConfirm){
  if (isConfirm) {
       swal("", "Schedule booked!", "success");
  $scope.$evalAsync(function() {
      $scope.days[day].slots[slot].booked = true;

  });

  } else {
       swal("", "Schedule Rejected!", "success");
  $scope.$evalAsync(function() {
      $scope.days[day].slots[slot].booked = false;

  });
  }
});
  }


})
