/*
Prototype Applicaiton for the IGV/VSV Digital Angle Encoder
Tool User App.

Author: Rachel King
Company: General Electric
Team: Outage Tooling -- Field Force Automation

*/

var app = {

    //Application Constructor
    initialize: function(){
      this.bindEvents();
  },

  //Bind Event Listeners [startup]
  bindEvents: function(){
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  //deviceready Event Handler
  onDeviceReady: function () {
    app.receivedEvent('deviceready')
  },

  //update DOM on Received Event -- Basically select style elements
  //  from CSS based on something
  receivedEvent: function(id){
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
    app.buttonResponse()
  },

  //can do some work with passing button id, and then calling with
  //that id passed to the method

  /*
  Perfoms functions of buttons when click event occurs
  V0: prints message to confirm execution
  */
  buttonResponse: function()
  {
    var deviceButton = document.getElementById('connectButton');
    deviceButton.addEventListener('click', function()
    {
      app.printMsg('connectButton');

      // app.emulateDevice();
      bluetoothSerial.list( function(results)
      {
        console.log("Bluetooth is enabled");
        app.clear();
        app.display(JSON.stringify(results));

      }, function(error)
      {
        console.log("Bluetooth is *not* enabled");
        app.display(JSON.stringify(error));
      }
);

}

, false);

    var resultsButton = document.getElementById('dataButton');
    resultsButton.addEventListener('click', function()
    {
      app.printMsg('dataButton');
    }, false);

  },

  /*
  Dummy function to print values
  Written as part of testing for calling functions within a parent function
  Obviously a javascript ~newb~ !
  */
  printMsg: function(things)
  {
    console.log(things);
  },

  display: function(message) {
      // var display = document.getElementById("message"), // the message div
      //     lineBreak = document.createElement("br"),     // a line break
      //     label = document.createTextNode(message);     // create the label
      //
      // display.appendChild(lineBreak);          // add a line break
      // display.appendChild(label);              // add the message node
      console.log('success');
  },

  emulateDevice: function()
  {
    bluetoothSerial.register(function(buf) {
         //buf.input is the data that was received via bluetoothSerial.write
         //buf.output is data that will be transmitted via a bluetoothSerial.read or subscribe
         //Do processing here
         buf.input = ""
    });

    //Function emulates a Bluetooth device echoing back input

    var echoProxy = function(buf) {
      if (buf && buf.input) {
        console.log("Received: " + buf.input);
        buf.output = buf.input + "\n";
        buf.input = ""; // clear input
      }
      return buf;
    }
    bluetoothSerial.register(echoProxy);
  },

  display: function(message) {
      var display = document.getElementById("message"), // the message div
          lineBreak = document.createElement("br"),     // a line break
          label = document.createTextNode(message);     // create the label

      display.appendChild(lineBreak);          // add a line break
      display.appendChild(label);              // add the message node
  },
  /*
  clears the message div:
  */
  clear: function() {
      var display = document.getElementById("message");
      display.innerHTML = "";
  }
};
