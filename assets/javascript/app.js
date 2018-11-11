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
        var rowButton = childSnapshot.val().id;
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
                $("<td>").text(""),
                $("<td>").append("<button>", rowButton, "</button"),
                
            )

        );


    })
  