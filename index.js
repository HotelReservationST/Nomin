// CALLS THE getBooking() TO IMPLEMENT ALL ITS FUNCTION
$(document).ready(function () {
    getBooking(); 
    getAdmin();
    getCottage();
  });

// JavaScript for handling login
$(document).ready(function () {
  // Handle the form submission
  $("#loginForm").submit(function (e) {
      e.preventDefault();

      // Get the entered username and password
      let username = $("#loginUsername").val(); // Update with the appropriate username input ID
      let password = $("#LoginPassword").val(); // Update with the appropriate password input ID

      // Perform an AJAX request to validate the login
      $.post("./php/login.php", {
          username: username,
          password: password
      }, function (data) {
          if (data === "success") {
              // Redirect to clientdashboard.html if login is successful
              window.location.href = "clientDashboard.html";
          } else {
              // Display an error message if login fails
              alert("Login failed. Please check your username and password.");
          }
      });
  });
});

$(document).ready(function () {
  // Handle the form submission
  $("#AdloginForm").submit(function (e) {
      e.preventDefault();

      // Get the entered username and password
      let Username = $("#loginAdminUsername").val(); // Update with the appropriate username input ID
      let Password = $("#LoginAdminPassword").val(); // Update with the appropriate password input ID

      // Perform an AJAX request to validate the login
      $.post("./php/adminlogin.php", {
          Username: Username,
          Password: Password
      }, function (data) {
          if (data === "success") {
              // Redirect to clientdashboard.html if login is successful
              window.location.href = "bookingRecords.html";
          } else {
              // Display an error message if login fails
              alert("Login failed. Please check your username and password.");
          }
      });
  });
});


// THE FUNCTION THAT GETS THE DATA FROM THE INPUT BOXES
function saveBooking(){
let booking_fname = $("#inputfname").val();
let booking_lname = $("#inputlname").val();
let booking_time = $("#inputTime").val();
let booking_date = $("#inputDate").val();
let booking_maxnoguest = $("#inputGuestNo").val();
let booking_contactno = $("#inputContact").val();
let booking_accommodation = $("#inputAcmo").val();

//TRANSFER THE DATA TO saveBooking.php
// Ask for confirmation before adding data
if (confirm("Are you sure you want to add this booking?")) {
$.post("./php/saveBooking.php", // <---THE LOCATION OF THE FILE saveBooking.php
{
    f_name: booking_fname, //<--- ASIGN THE DATA FROM INPUT BOXES TO EACH COLUMNS IN THE DATA BASE
    l_name: booking_lname,
    ttime: booking_time,
    ddate: booking_date,
    maxnoguest:booking_maxnoguest,
    contactno: booking_contactno,
    accommodation: booking_accommodation,
},


function(data){
    alert(data);// <--- TO MAKE NOTIFICATION APPEAR IF A NEW DATA IS ADDED TO THE DATA BASE
    getBooking(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS ADDED
    closeAddBookingOffcanvas();

}
);
}else {
  // If the user cancels, you can provide a message or take other actions if needed
  alert("Adding data canceled.");
}
}
// FUNCTION TO CLOSE THE ADD BOOKING OFFCANVAS
function closeAddBookingOffcanvas() {
  $('#addBookingoffcanvas').offcanvas('hide');
}




// THE FUNCTION THAT GETS THE DATA FROM THE INPUT BOXES
function saveAdmin(){
  let admin_fname = $("#setfname").val();
  let admin_lname = $("#setlname").val();
  let admin_username = $("#setusername").val();
  let admin_pass = $("#setpassword").val();
  
  
  //TRANSFER THE DATA TO saveNewAccount.php
  // Ask for confirmation before adding data
  if (confirm("Are you sure you want to add this new account?")) {
  $.post("./php/saveNewAccount.php", // <---THE LOCATION OF THE FILE saveNewAccount.php
  {
      fname: admin_fname, //<--- ASIGN THE DATA FROM INPUT BOXES TO EACH COLUMNS IN THE DATA BASE
      lname: admin_lname,
      username: admin_username,
      pass: admin_pass,

  },
  
  
  function(data){
      alert(data);// <--- TO MAKE NOTIFICATION APPEAR IF A NEW DATA IS ADDED TO THE DATA BASE
  }
  );
  }else {
    // If the user cancels, you can provide a message or take other actions if needed
    alert("Adding New Account canceled.");
  }
  }



  // THE FUNCTION THAT GETS THE DATA FROM THE INPUT BOXES
function saveClient(){
  let client_Fname = $("#regesterfname").val();
  let client_Lname = $("#regesterlname").val();
  let client_Username = $("#regesterUserName").val();
  let client_Pass = $("#regesterPassword").val();
  
  
  //TRANSFER THE DATA TO saveNewAccount.php
  // Ask for confirmation before adding data
  if (confirm("Are you sure you want to regester this account?")) {
  $.post("./php/saveNewClient.php", // <---THE LOCATION OF THE FILE saveNewAccount.php
  {
      Fname: client_Fname, //<--- ASIGN THE DATA FROM INPUT BOXES TO EACH COLUMNS IN THE DATA BASE
      Lname: client_Lname,
      Username: client_Username,
      Pass: client_Pass,

  },
  
  
  function(data){
      alert(data);// <--- TO MAKE NOTIFICATION APPEAR IF A NEW DATA IS ADDED TO THE DATA BASE
      $('#mdlregistration').modal('hide')
  }
  );
  }else {
    // If the user cancels, you can provide a message or take other actions if needed
    alert("Registration canceled.");
  }
  }



    // THE FUNCTION THAT GETS THE DATA FROM THE INPUT BOXES
function saveCottage(){
  let cottage_image = document.getElementById("inputimage");
  let cottage_name = $("#inputcottage").val();
  let cottage_pax = $("#inputpax").val();
  let cottage_type = $("#inputtype").val();
  let cottage_rate = $("#inputRate").val();
  
  // Check if an image is selected
  if (cottage_image.files.length === 0) {
    alert("Please select an image.");
    return;
  }

  // Create a FileReader to read the selected image
  let reader = new FileReader();

  reader.onload = function () {
    let image_data = reader.result;

  //TRANSFER THE DATA TO saveNewAccount.php
  // Ask for confirmation before adding data
  if (confirm("Are you sure you want to add this data?")) {
  $.post("./php/saveCottage.php", // <---THE LOCATION OF THE FILE saveNewAccount.php
  {
    IImage: image_data,
    CotName: cottage_name, //<--- ASIGN THE DATA FROM INPUT BOXES TO EACH COLUMNS IN THE DATA BASE
    Pax: cottage_pax,
    CotType: cottage_type,
    Price: cottage_rate,

  },
  
  
  function(data){
    getCottage();
      alert(data);// <--- TO MAKE NOTIFICATION APPEAR IF A NEW DATA IS ADDED TO THE DATA BASE
      closeAddCottageOffcanvas();
  }
  );
  }else {
    // If the user cancels, you can provide a message or take other actions if needed
    alert("Data not save.");
  }
  }

   // Read the selected image as a data URL
 reader.readAsDataURL(cottage_image.files[0]);

 // FUNCTION TO CLOSE THE ADD BOOKING OFFCANVAS
function closeAddCottageOffcanvas() {
  $('#addCottageoffcanvas').offcanvas('hide');
}

}



// THE FUNCTION TO POST THE DATA IN THE DATA BASE TO THE HTML TABLE 
function getBooking() {

    $.get("./php/getBooking.php", //<--- THE LINK CONNECTION TO getBooking.php
    
    // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN index.html
    function(data){ 

        console.log(data);
        let bookings = JSON.parse(data);
        let displayData = document.querySelector("#tbDisplayBooking"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking THAT WE SET IN THE HTML TABLE FOUND IN index.html
        let tbContent = "";

        for (let i = 0; i < bookings.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED
            tbContent += `<tr>
            <th>${bookings[i].id}</th> 
            <td>${bookings[i].f_name}</td> 
            <td>${bookings[i].l_name}</td> 
            <td>${bookings[i].ttime}</td>
            <td>${bookings[i].ddate}</td>
            <td>${bookings[i].maxnoguest}</td>
            <td>${bookings[i].contactno}</td>
            <td>${bookings[i].accommodation}</td>
            <td>${bookings[i].booked_timedate}</td>
            <td class="td text-center"><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editBookingModal" onclick="editBooking('${bookings[i].f_name}', '${bookings[i].l_name}', '${bookings[i].ttime}','${bookings[i].ddate}','${bookings[i].maxnoguest}','${bookings[i].contactno}', '${bookings[i].accommodation}',${bookings[i].id},'${bookings[i].booked_timedate}')">
            <img src="icon/pencil.svg" alt="edit" width="23" height="23"> <!-- Edit icon -->
            </button> <button type="button" class="btn btn-outline-warning" onclick="deleteBooking(${bookings[i].id}, 'confirmDelete')">
            <img src="icon/trash.svg" alt="edit" width="23" height="23"> <!-- Delete icon -->
           </button></td> 
           </tr>`;
        }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                  // ↑ THE LAST <td></td> CONTAINS THE BUTTON THAT APPEARS ALONG THE ROW OF DATA UNDER THE ACTION COLUMN WHICH IS THE BUTTON FOR EDITING AND DELETING THE DATA. THE LINE OF CODE ALSO SPECIFI WHICH DATA VALUE SHOULD BE EDITED OR WHICH ROW OF DATA VALUE SHOULD BE DELETED
                  
        displayData.innerHTML = tbContent; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
        
    });

    $.get("./php/getBooking.php", //<--- THE LINK CONNECTION TO getBooking.php
    
     // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN bookingRecords.html
    function(data){ 

        console.log(data);
        let bookings = JSON.parse(data);
        let displayData2 = document.querySelector("#tbDisplayBooking2"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking2 THAT WE SET IN THE HTML TABLE FOUND IN bookingRecords.html
        let tbContent2 = "";

        for (let i = 0; i < bookings.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED 
            tbContent2 += `<tr>
            <td>${bookings[i].f_name}</td> 
            <td>${bookings[i].l_name}</td> 
            <td>${bookings[i].ttime}</td>
            <td>${bookings[i].ddate}</td>
            <td>${bookings[i].maxnoguest}</td>
            <td>${bookings[i].contactno}</td>
            <td>${bookings[i].accommodation}</td>
            <td>
            <button type="button" class="btn btn-outline-danger" onclick="deleteBooking(${bookings[i].id}, 'confirmDelete2')">
            <img src="icon/x-square.svg" alt="edit" width="20" height="20"> Cancel<!-- Cancel icon -->
           </button></td>
          </tr>`;
        }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                  
        displayData2.innerHTML = tbContent2; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
        
    });

}




// THE FUNCTION TO POST THE DATA IN THE DATA BASE TO THE HTML TABLE 
function getAdmin() {

  $.get("./php/getNewAccount.php", //<--- THE LINK CONNECTION TO getBooking.php
  
  // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN index.html
  function(data){ 

      console.log(data);
      let accounts = JSON.parse(data);
      let displayData = document.querySelector("#tbDisplayAccount3"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking THAT WE SET IN THE HTML TABLE FOUND IN index.html
      let tbContent = "";

      for (let i = 0; i < accounts.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED
          tbContent += `<tr>
          <th>${accounts[i].id}</th> 
          <td>${accounts[i].fname}</td> 
          <td>${accounts[i].lname}</td> 
          <td>${accounts[i].username}</td>
          <td>${accounts[i].pass}</td>
          
          <td class="td text-center"><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editAccountModal" onclick="editAccount('${accounts[i].fname}', '${accounts[i].lname}', '${accounts[i].username}','${accounts[i].pass}', ${accounts[i].id})">
          <img src="icon/pencil.svg" alt="edit" width="23" height="23"> <!-- Edit icon -->
          </button> <button type="button" class="btn btn-outline-warning" onclick="deleteAccount(${accounts[i].id})">
          <img src="icon/trash.svg" alt="edit" width="23" height="23"> <!-- Delete icon -->
         </button></td> 
         </tr>`;
      }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                // ↑ THE LAST <td></td> CONTAINS THE BUTTON THAT APPEARS ALONG THE ROW OF DATA UNDER THE ACTION COLUMN WHICH IS THE BUTTON FOR EDITING AND DELETING THE DATA. THE LINE OF CODE ALSO SPECIFI WHICH DATA VALUE SHOULD BE EDITED OR WHICH ROW OF DATA VALUE SHOULD BE DELETED
                
      displayData.innerHTML = tbContent; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
      
  });

}



// THE FUNCTION TO POST THE DATA IN THE DATA BASE TO THE HTML TABLE 
function getCottage() {

  $.get("./php/getCottage.php", //<--- THE LINK CONNECTION TO getBooking.php
  
  // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN index.html
  function(data){ 

      console.log(data);
      let cottages = JSON.parse(data);
      let displayData = document.querySelector("#tbDisplayCottage5"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking THAT WE SET IN THE HTML TABLE FOUND IN index.html
      let tbContent = "";

      for (let i = 0; i < cottages.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED
          tbContent += `<tr>
          <td>${cottages[i].id}</td> 
          <td style="display: grid; place-items: center;"><img src="${cottages[i].IImage}" alt="Cottage Image" width="100" height="100"></td>
          <td>${cottages[i].CotName}</td> 
          <td>${cottages[i].Pax}</td> 
          <td>${cottages[i].CotType}</td>
          <td>₱ ${cottages[i].Price}</td>
          <td>${cottages[i].Avalability} </td>
          <td class="td text-center"><button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editCottageModal" onclick="editCottage('${cottages[i].CotName}', '${cottages[i].Pax}', '${cottages[i].CotType}','${cottages[i].Price}', '${cottages[i].Avalability}','${cottages[i].id}')">
          <img src="icon/pencil.svg" alt="edit" width="23" height="23"> <!-- Edit icon -->
          </button> <button type="button" class="btn btn-outline-warning" onclick="deleteCottage(${cottages[i].id})">
          <img src="icon/trash.svg" alt="edit" width="23" height="23"> <!-- Delete icon -->
         </button></td> 
         </tr>`;
      }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                // ↑ THE LAST <td></td> CONTAINS THE BUTTON THAT APPEARS ALONG THE ROW OF DATA UNDER THE ACTION COLUMN WHICH IS THE BUTTON FOR EDITING AND DELETING THE DATA. THE LINE OF CODE ALSO SPECIFI WHICH DATA VALUE SHOULD BE EDITED OR WHICH ROW OF DATA VALUE SHOULD BE DELETED
                
      displayData.innerHTML = tbContent; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
      
  });

  $.get("./php/getCottage.php", //<--- THE LINK CONNECTION TO getBooking.php
  
  // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN index.html
  function(data){ 

      console.log(data);
      let cottages = JSON.parse(data);
      let displayData = document.querySelector("#tbDisplayCottage4"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking THAT WE SET IN THE HTML TABLE FOUND IN index.html
      let tbContent = "";

      for (let i = 0; i < cottages.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED
          tbContent += `<tr>
          <td>${cottages[i].CotName}</td> 
          <td>${cottages[i].Pax}</td> 
          <td>${cottages[i].CotType}</td>
          <td>₱ ${cottages[i].Price}</td>
          <td>${cottages[i].Avalability}</td>
         </tr>`;
      }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                // ↑ THE LAST <td></td> CONTAINS THE BUTTON THAT APPEARS ALONG THE ROW OF DATA UNDER THE ACTION COLUMN WHICH IS THE BUTTON FOR EDITING AND DELETING THE DATA. THE LINE OF CODE ALSO SPECIFI WHICH DATA VALUE SHOULD BE EDITED OR WHICH ROW OF DATA VALUE SHOULD BE DELETED
                
      displayData.innerHTML = tbContent; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
      
  });

  $.get("./php/getCottage.php", //<--- THE LINK CONNECTION TO getBooking.php
  
  // THIS FUNCTION POST ALL DATA IN THE DATA BASE TO THE TABLE IN index.html
  function(data){ 

      console.log(data);
      let cottages = JSON.parse(data);
      let displayData = document.querySelector("#tbDisplayCottage6"); //<--- CONTAINS THE TABLE BODY ID #tbDisplayBooking THAT WE SET IN THE HTML TABLE FOUND IN index.html
      let tbContent = "";

      for (let i = 0; i < cottages.length; i++){ //<--- TO DISPLAY THE DATA TO EACH ROW WE USE THE LOOPING AS IT DISPLAY ALL THE DATA AGIN AND AGIN UNTIL ALL THE DATA IS DISPLAYED
          tbContent += `<tr>
          <td style="display: grid; place-items: center;"><img src="${cottages[i].IImage}" alt="Cottage Image" width="100" height="100"></td>
          <td>${cottages[i].CotName}</td> 
          <td>${cottages[i].Pax}</td> 
          <td>${cottages[i].CotType}</td>
          <td>₱ ${cottages[i].Price}</td>
         </tr>`;
      }         // ↑ PUTS ALL THE DATA TO EACH SPECIFIC COLUMN
                // ↑ THE LAST <td></td> CONTAINS THE BUTTON THAT APPEARS ALONG THE ROW OF DATA UNDER THE ACTION COLUMN WHICH IS THE BUTTON FOR EDITING AND DELETING THE DATA. THE LINE OF CODE ALSO SPECIFI WHICH DATA VALUE SHOULD BE EDITED OR WHICH ROW OF DATA VALUE SHOULD BE DELETED
                
      displayData.innerHTML = tbContent; //<--- NOW TO CALL AND DISPLAY THE DATA AND ACTIVATE IS SET FUNCTION TO DISPLAY THE DATA IN THE HTML TABLE 
      
  });
}

function toggleCheckboxes(checkbox) {
  var checkbox1 = document.getElementById('checkbox1');
  var checkbox2 = document.getElementById('checkbox2');

  if (checkbox.id === 'checkbox1' && checkbox.checked) {
    checkbox2.checked = false;
  } else if (checkbox.id === 'checkbox2' && checkbox.checked) {
    checkbox1.checked = false;
  }
}







// FUNCION TO DELETE AND CANCEL BOOKING DATA
function deleteBooking(booking_id, confirmationType) {
  let confirmationMessage;

  if (confirmationType === 'confirmDelete') {
    confirmationMessage = "Are you sure you want to delete this booking?This action is irreversible.";
  } else if (confirmationType === 'confirmDelete2') {
    confirmationMessage = "Are you sure you want to  Cancel this booking? This action is irreversible.";
  }

  if (confirm(confirmationMessage)) {
    $.post(
      "./php/deleteBooking.php", // <-- LINK CONNECTION TO deleteBooking.php
      {
        booking_id: booking_id, // <-- SPECIFY WHICH ROW OF DATA IS TO DELETE
      },
      function (data) {
        alert(data); // <-- TO DISPLAY A NOTIFICATION MESSAGE WHEN DELETE DATA
        getBooking(); // <-- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS DELETED
      }
    );
  } else {
    // If the user cancels, you can provide a message or take other actions if needed
    alert("Deleting canceled.");
  }
}




// FUNCION TO DELETE THE DATA
function deleteAccount(account_id){
  // Ask for confirmation before deleting data
if (confirm("Are you sure you want to delete this Account?")) {
    $.post(
        "./php/deleteNewAccount.php", //<--- LINK CONNECTION TO deleteAccount.php
        {
          account_id: account_id, //<--- SPECIFI WHICH ROW OF DATA IS TO DELETE
        },

        function(data){
          alert(data);// <--- TO MAKE NOTIFICATION APPEAR WHEN DELETE DATA 
          getAdmin(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS DELETED

        });
      }else{
          // If the user cancels, you can provide a message or take other actions if needed
          alert("Deleting canceled.");
      }
}



function deleteCottage(cottage_id){
  // Ask for confirmation before deleting data
if (confirm("Are you sure you want to delete this?")) {
    $.post(
        "./php/deleteCottage.php", //<--- LINK CONNECTION TO deleteBooking.php
        {
          cottage_id: cottage_id, //<--- SPECIFI WHICH ROW OF DATA IS TO DELETE
        },

        function(data){
          alert(data);// <--- TO MAKE NOTIFICATION APPEAR WHEN DELETE DATA 
          getCottage(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS DELETED

        });
      }else{
          // If the user cancels, you can provide a message or take other actions if needed
          alert("Deleting canceled.");
      }
}




// FUNCTION FOR EDITING DATA 
function editBooking(f_name, l_name, ttime, ddate, maxnoguest, contactno, accommodation, id) {
    $("#inputEditfname").val(f_name);
    $("#inputEditlname").val(l_name);
    $("#inputEditTime").val(ttime); //<--- THIS MAKES EACH CURRENT VALUE APPEARS INTO THE INPUT BOX TO EDIT
    $("#inputEditDate").val(ddate);
    $("#inputEditGuestNo").val(maxnoguest);
    $("#inputEditContact").val(contactno);
    $("#inputEditAccommodation").val(accommodation);
    $("#inputEditID").val(id);
  }

  // FUNCTION FOR UPDATING THE DATA 
  function updateBooking() {
    let booking_id = $("#inputEditID").val();
    let booking_fname = $("#inputEditfname").val(); //<--- GETS THE NEW DATA FROM INPUT BOXES 
    let booking_lname = $("#inputEditlname").val();      //<--- IT ALSO ASIGN EACH NEW VALUES TO EACH VARIABLE
    let booking_time = $("#inputEditTime").val();
    let booking_date = $("#inputEditDate").val();
    let booking_maxnoguest = $("#inputEditGuestNo").val();
    let booking_contactno = $("#inputEditContact").val();
    let booking_accommodation = $("#inputEditAccommodation").val();
  
      // Ask for confirmation before deleting data
if (confirm("Are you sure you want to update this Booking?")) {
    $.post(
      "./php/updateBooking.php", //<--- LINK CONNECTION FOR updateBooking.php
      {
        booking_id: booking_id,
        f_name: booking_fname, //<--- TRANSFER THE NEW VALUES TO BE POSTED IN updateBooking.php
        l_name: booking_lname,
        ttime: booking_time,
        ddate: booking_date,
        maxnoguest:booking_maxnoguest,
        contactno: booking_contactno,
        accommodation: booking_accommodation,
      },

      function (data) {
        alert(data);// <--- TO MAKE NOTIFICATION APPEAR WHEN UPDATING A DATA 
        getBooking(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS EDITED
        $("#editBookingModal").modal("hide"); //<--- AUTOMATICALLY HIDES THE EDIT BOOKING MODAL FORM WHEN DATA IS EDITED
        
      });
    }else{
      // If the user cancels, you can provide a message or take other actions if needed
      alert("Updating canceled.");
    }
  }



  // FUNCTION FOR EDITING DATA 
function editAccount(fname, lname, username, pass, id) {
  $("#setEditfname").val(fname);
  $("#setEditlname").val(lname);
  $("#setEditusername").val(username); //<--- THIS MAKES EACH CURRENT VALUE APPEARS INTO THE INPUT BOX TO EDIT
  $("#setEditpass").val(pass);
  $("#setEditID").val(id);
}

// FUNCTION FOR UPDATING THE DATA 
function updateAccount() {
  let account_id = $("#setEditID").val();
  let account_fname = $("#setEditfname").val(); //<--- GETS THE NEW DATA FROM INPUT BOXES 
  let account_lname = $("#setEditlname").val();      //<--- IT ALSO ASIGN EACH NEW VALUES TO EACH VARIABLE
  let account_username = $("#setEditusername").val();
  let account_pass = $("#setEditpass").val();
    // Ask for confirmation before deleting data
if (confirm("Are you sure you want to update this Account?")) {
  $.post(
    "./php/updateNewAccount.php", //<--- LINK CONNECTION FOR updateNewAccount.php
    {
      account_id: account_id,
      fname: account_fname, //<--- TRANSFER THE NEW VALUES TO BE POSTED IN updateNewAccount.php
      lname: account_lname,
      username: account_username,
      pass: account_pass,
     
    },

    function (data) {
      alert(data);// <--- TO MAKE NOTIFICATION APPEAR WHEN UPDATING A DATA 
      getAdmin(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS EDITED
      $("#editAccountModal").modal("hide"); //<--- AUTOMATICALLY HIDES THE EDIT ACCOUNT MODAL FORM WHEN DATA IS EDITED
      
    });
  }else{
    // If the user cancels, you can provide a message or take other actions if needed
    alert("Updating canceled.");
  }
}





  // FUNCTION FOR EDITING DATA 
  function editCottage( CotName, Pax, CotType, Price, Avalability, id) {
    $("#inputEditcotname").val(CotName);
    $("#inputEditpax").val(Pax);
    $("#inputEditType").val(CotType); //<--- THIS MAKES EACH CURRENT VALUE APPEARS INTO THE INPUT BOX TO EDIT
    $("#inputrate").val(Price);
    $("#inputEditAvail").val(Avalability);
    $("#inputEditID").val(id);
  }
  
  // FUNCTION FOR UPDATING THE DATA 
  function updateCottage() {
    let cottage_id = $("#inputEditID").val();
    let cottage_cotname = $("#inputEditcotname").val(); //<--- GETS THE NEW DATA FROM INPUT BOXES 
    let cottage_pax = $("#inputEditpax").val();      //<--- IT ALSO ASIGN EACH NEW VALUES TO EACH VARIABLE
    let cottage_type = $("#inputEditType").val();
    let cottage_rate= $("#inputrate").val();
    let cottage_Avail= $("#inputEditAvail").val();

      // Ask for confirmation before deleting data
  if (confirm("Are you sure you want to update this?")) {
    $.post(
      "./php/updateCottage.php", //<--- LINK CONNECTION FOR updateNewAccount.php
      {
        cottage_id: cottage_id,
        CotName: cottage_cotname, //<--- TRANSFER THE NEW VALUES TO BE POSTED IN updateNewAccount.php
        Pax: cottage_pax,
        CotType: cottage_type,
        Price: cottage_rate,
        Avalability: cottage_Avail,
      },
  
      function (data) {
        alert(data);// <--- TO MAKE NOTIFICATION APPEAR WHEN UPDATING A DATA 
        getCottage(); // <--- PREVENTS MANUAL RELOAD OF PAGE WHEN DATA IS EDITED
        $("#editCottageModal").modal("hide"); //<--- AUTOMATICALLY HIDES THE EDIT ACCOUNT MODAL FORM WHEN DATA IS EDITED
        
      });
    }else{
      // If the user cancels, you can provide a message or take other actions if needed
      alert("Updating canceled.");
    }
  }
