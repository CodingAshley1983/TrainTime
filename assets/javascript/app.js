  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDXjdWEE0AdhIG036TUkmpgPNmCa4KaNq8",
    authDomain: "train-time-16fd2.firebaseapp.com",
    databaseURL: "https://train-time-16fd2.firebaseio.com",
    projectId: "train-time-16fd2",
    storageBucket: "train-time-16fd2.appspot.com",
    messagingSenderId: "930054439072"
  };
  firebase.initializeApp(config);

  
  var dataRef = firebase.database();

  // Initial Values
  

  // Capture Button Click
  $("#submit").on("click", function(event) {
    event.preventDefault();

    
    //  logic for storing and retrieving the most recent user.
   
    var name = $("#train-name-input").val().trim();
     var destination = $("#destination-input").val().trim();
    var time = $("#train-time-input").val();
     var frequency = $("#frequency-input").val();
    var newTrain={
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    }
    console.log(newTrain)
    // Code for the push
    dataRef.ref().push(newTrain);
    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#train-time-input").val("")
    $("#frequency-input").val("")



    
  });

    dataRef.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val()); 
       
        var trainName = childSnapshot.val().name; 
        var destination = childSnapshot.val().destination; 
        var frequency= childSnapshot.val().frequency; 
        var firstTrain= childSnapshot.val().time;

       

        $(".tbody").append(
            $("<tr>").append(
                $("<td>").text(trainName), 
                $("<td>").text(destination),
                $("<td>").text(frequency),
                $("<td>").text(firstTrain),
                $("<td>").text("")
               
                
            ))

         });

    

            //Want to display current time and have it auto-refresh every minute
var datetime = null,
date = null;

var update = function () {
date = moment(new Date())
datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};
function calculate(sv) {

    var firstTime= sv.startTime
    var tFrequency = sv.frequency;
    
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    
    // Minute Until Train
    var tMinAway = tFrequency - tRemainder;
    
    // Next Train
    var nxtTrain = moment().add(tMinAway, "minutes");
    console.log("Minutes away:", nxtTrain);
    
    };

$(document).ready(function(){
datetime = $('#current-time')
update();
setInterval(update, 1000);
});





