document.querySelector("#burger").onclick = onClickMenu;
document.getElementById("bookingBtn").onclick = showReservationForm;
document.getElementById("inquiryBtn").onclick = showInquiryForm;
document.getElementById("popupBtn").onclick = closePopUp;
document.getElementById("popupBtn2").onclick = closePopUp;
var facebookBtn = document.querySelector("#facebookIcon");
var twitterBtn = document.querySelector("#twitterIcon");
var telegramBtn = document.querySelector("#telegramIcon");
var whatsappBtn = document.querySelector("#whatsappIcon");
var counter = 1;
var show = true;

//Modal Popup
$(document).ready(function () {
    $('#NoticeModal').modal('show');
});

//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPwpBBFCgQk75Pq5crDAD012jNWzNgH8E",
    authDomain: "bookingform-bfaf7.firebaseapp.com",
    databaseURL: "https://bookingform-bfaf7-default-rtdb.firebaseio.com",
    projectId: "bookingform-bfaf7",
    storageBucket: "bookingform-bfaf7.appspot.com",
    messagingSenderId: "581671703018",
    appId: "1:581671703018:web:643b4ada27e087ddb82293"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Reference your data base
const reservedFormDB = firebase.database().ref("bookingform");
const inquiryFormDB = firebase.database().ref("inquiryform");

//Ensure screen on top
$(document).ready(function () {
    $(window).scrollTop(0);
});

//Close successfully booking/inquiry popup
function closePopUp() {
    $("#popup").css("animation", "popupBox reverse");
    $("#popup2").css("animation", "popupBox reverse");
}

//Form submitted
$("#bookingForm").submit(function (e) {
    e.preventDefault();
    var timerecord = "";
    $("#popup").css("animation", "popupBox 0.5s forwards");
    $("#bookLeft h2").html("Reservation Detail");
    $("#submitBtn").attr("value", "OK!");
    $("#submitBtn").attr("type", "button");

    //Set input to ready only
    var read = document.querySelectorAll("input");
    for (var i = 0; i < read.length; i++) {
        read[i].readOnly = true;
    }

    $("#submitBtn").click(function () {
        $("#Booking-Container").css("display", "none");
        $(window).scrollTop(0);
    });

    //Get the user input value
    var fName = $("#bookingForm #fName").val();
    var lName = $("#bookingForm #lName").val();
    var email = $("#bookingForm #email").val();
    var phone = $("#bookingForm #phone").val();
    var duration = $("#bookingForm #duration").val();
    var date = $("#bookingForm #date").val();
    var room = $("#bookingForm #room").val();
    var req = $("#bookingForm #req").val();
    var remark = $("#bookingForm #remark").val();


    //Store into local storage
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("fName", fName);
        localStorage.setItem("lName", lName);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        localStorage.setItem("duration", duration);
        localStorage.setItem("date", date);
        localStorage.setItem("room", room);
        localStorage.setItem("req", req);
        localStorage.setItem("remark", remark);
    }

    //Confirmed message
    if (typeof (Storage) !== "undefined") {
        $("#customerName1").text("Dear " + localStorage.getItem("fName").toUpperCase()
            + " " + localStorage.getItem("lName").toUpperCase());//retrieve
    }

    //Send Booking Information to Whatsapp
    var url = "https://wa.me/+60108038859?text="
        + "*Name :* " + localStorage.getItem("fName") + " " + localStorage.getItem("lName") + "%0a"
        + "*Email :* " + localStorage.getItem("email") + "%0a"
        + "*Phone :* " + localStorage.getItem("phone") + "%0a"
        + "*Duration:* " + localStorage.getItem("duration") + "%0a"
        + "*Date* " + localStorage.getItem("date") + "%0a"
        + "*Room Type :* " + localStorage.getItem("room") + "%0a"
        + "*Sepical Request :* " + localStorage.getItem("req") + "%0a"
        + "*Remark :* " + localStorage.getItem("remark") + "%0a";

    $.get("https://uccd2223-todoapi.azurewebsites.net/api/DateTime", function (data) {
        for (var i = 3; i < 25; i++) {
            timerecord += data[i];
        }
        $("#dateTimeAPI1").html(data);
        localStorage.setItem("recordedTime", timerecord);
        url += "*Time Recorded :* " + localStorage.getItem("recordedTime");
        window.open(url, '_blank').focus();

        //Save to firebase
        saveReservedMessage(fName, lName, email, phone, duration, date, room, req, remark, localStorage.getItem("recordedTime"));

    });
});

//Store in Firebase
const saveReservedMessage = (fName, lName, email, phone, duration, date, room, req, remark, recordTime) => {
    var newReservationForm = reservedFormDB.push();

    newReservationForm.set({
        FirstName: fName,
        LastName: lName,
        Email: email,
        Phone: phone,
        Duration: duration,
        Date: date,
        RoomType: room,
        SpecialRequest: req,
        Remark: remark,
        ReservedTime: recordTime,
    });
}

//Inquiry Form submitted
$("#inquiryForm").submit(function (e) {
    e.preventDefault();

    $("#popup2").css("animation", "popupBox 0.5s forwards");
    $("#inquiryLeft h2").html("Inquiry Detail");
    $("#submitBtn2").attr("value", "OK!");
    $("#submitBtn2").attr("type", "button");

    var read = document.querySelectorAll("input");
    for (var i = 0; i < read.length; i++) {
        read[i].readOnly = true;
    }

    $("#submitBtn2").click(function () {
        $("#Inquiry-Container").css("display", "none");
        $(window).scrollTop(0);
    });

    var fName = $("#inquiryForm #fName").val();
    var lName = $("#inquiryForm #lName").val();
    var phone = $("#inquiryForm  #phone").val();
    var email = $("#inquiryForm #email").val();
    var remark = $("#inquiryForm  #remark").val();



    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("fName", fName);
        sessionStorage.setItem("lName", lName);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("remark", remark);
    }

    if (typeof (Storage) !== "undefined") {
        $("#customerName2").text("Dear " + sessionStorage.getItem("lName").toUpperCase());
    }

    //Send Inquiry Information to Whatsapp
    var url = "https://wa.me/+60108038859?text="
        + "*Name :* " + sessionStorage.getItem("fName") + " " + sessionStorage.getItem("lName") + "%0a"
        + "*Phone :* " + sessionStorage.getItem("phone") + "%0a"
        + "*Email :* " + sessionStorage.getItem("email") + "%0a"
        + "*Remark :* " + sessionStorage.getItem("remark") + "%0a";

    $.get("https://uccd2223-todoapi.azurewebsites.net/api/DateTime", function (data) {
        var timerecord = "";
        for (var i = 3; i < 25; i++) {
            timerecord += data[i];
        }
        sessionStorage.setItem("recordedTime", timerecord);
        $("#dateTimeAPI2").html(data);
        url += "*Time Recorded :* " + sessionStorage.getItem("recordedTime");
        window.open(url, '_blank').focus();

        //Save to firebase
        saveInquiryedMessage(fName, lName, phone, email, remark, sessionStorage.getItem("recordedTime"));
    });
});

//Store in Firebase
const saveInquiryedMessage = (fName, lName, phone, email, remark, recordTime) => {
    var newinquiryedForm = inquiryFormDB.push();

    newinquiryedForm.set({
        FirstName: fName,
        LastName: lName,
        Phone: phone,
        Email: email,
        Remark: remark,
        ReservedTime: recordTime,
    });
}

//Show the booking form
function showReservationForm() {
    var today = "";
    var dd = "";
    var mm = "";
    var yyyy = "";

    $.get("https://uccd2223-todoapi.azurewebsites.net/api/DateTime", function (data) {
        today += data;
        //Read date
        for (var i = 3; i < 7; i++) {
            yyyy += today[i];
        }
        for (var i = 8; i < 10; i++) {
            mm += today[i];
        }
        for (var i = 11; i < 13; i++) {
            dd += today[i];
        }

        //parse the string to int
        var day = parseInt(dd) + 1;
        var month = parseInt(mm);
        var year = parseInt(yyyy);

        //Condition for specific day
        //If day == 31 for January, March, May, July, August, October
        if (day == 31 && (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10)) {
            day = '01';
            month += 1;
        }
        //If day == 31 for December
        else if (day == 31 && month == 12) {
            day = '01';
            month += 1;
            year += 1;
        }
        //If day == 31 for April, June, September, November
        else if (day == 30 && (month == 4 || month == 6 || month == 9 || month == 11)) {
            day = '01';
            month += 1;
        }
        //If day >= 28/29 for February
        else if (day == 28 && month == 2 && year % 4 != 0 || dd == 29 && month == 2 && year % 4 == 0) {
            day = '01';
            month += 1;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        var date = year + '-' + month + '-' + day;
        console.log(date);
        document.getElementById("date").setAttribute("min", date);
    });

    window.location.href = "#bookLeft"

    var inquiryContainer = document.getElementById("Inquiry-Container");
    var bookingContainer = document.getElementById("Booking-Container");
    var left = document.getElementById("bookLeft");
    var right = document.getElementById("bookRight");
    var rows = document.querySelectorAll("#bookLeft form .row:not(#newRowAdded)");

    var read = document.querySelectorAll("input");
    for (var i = 0; i < read.length; i++) {
        read[i].readOnly = false;
    }

    if (inquiryContainer.style.display = "block") {
        inquiryContainer.style.display = "none";
    }

    bookingContainer.style.display = "block";
    left.style.transition = "transform 2s ease-in";
    left.style.transform = "translateX(0%)";
    right.style.transition = "transform 2s ease-in";
    right.style.transform = "translateX(0%)";

    for (var i = 0; i < rows.length; i++) {
        formAnimate(rows[i], i)
    }
}

//Show the inquiry form
function showInquiryForm() {
    window.location.href = "#inquiryLeft"

    var inquiryContainer = document.getElementById("Inquiry-Container");
    var bookingContainer = document.getElementById("Booking-Container");
    var left = document.getElementById("inquiryLeft");
    var right = document.getElementById("inquiryRight");
    var rows = document.querySelectorAll("#inquiryLeft form .row:not(#newRowAdded)");

    var read = document.querySelectorAll("input");
    for (var i = 0; i < read.length; i++) {
        read[i].readOnly = false;
    }

    if (bookingContainer.style.display = "block") {
        bookingContainer.style.display = "none";
    }

    inquiryContainer.style.display = "block";

    left.style.transition = "transform 2s ease-in";
    left.style.transform = "translateX(0%)";
    right.style.transition = "transform 2s ease-in";
    right.style.transform = "translateX(0%)";

    for (var i = 0; i < rows.length; i++) {
        formAnimate(rows[i], i)
    }
}

//Open Navigation Menu
function onClickMenu() {
    var line1 = document.getElementById("line1");
    var line2 = document.getElementById("line2");
    var line3 = document.getElementById("line3");
    var nav_links = document.getElementById("nav-links");

    if (show == false) {
        line1.style.transform = "rotateZ(-45deg) translateY(11px)";
        line2.style.opacity = "0";
        line3.style.transform = "rotateZ(45deg) translateY(-11px)";
        nav_links.style.transition = "transform 0.5s ease-in";
        nav_links.style.transform = "translateX(0%)";

        var link = document.getElementsByClassName("links");
        for (var i = 0; i < link.length; i++) {
            if (link[i].style.animation = "navLinkFade 2s forwards") {
                link[i].style.animation = "";
            }
            navAnimate(link[i], i)
        }
        show = true;
    }

    else {
        line1.style.transform = " translateY(0px)";
        line2.style.opacity = "1";
        line3.style.transform = " translateY(0px)";
        nav_links.style.transition = "transform 0.5s ease-in";
        nav_links.style.transform = "translateX(100%)";
        show = false;
    }
}

//Navigation Link Animation
function navAnimate(link, i) {
    setTimeout(function () {
        link.style.animation = "navLinkFade 2s forwards";
    }, 300 * i);
}

//Form animation
function formAnimate(rows, i) {
    setTimeout(function () {
        rows.style.animation = "rowAppear 2s forwards";
    }, 300 * i);
}

//Social media share
function init() {
    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI("Come and join our family!");
    facebookBtn.setAttribute(
        "href",
        `https://www.facebook.com/sharer/sharer.php?u${postUrl}`
    );
    twitterBtn.setAttribute(
        "href",
        `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    );
    telegramBtn.setAttribute(
        "href",
        `https://telegram.me/share/url?url=${postUrl}&text=${postTitle}`
    );
    whatsappBtn.setAttribute(
        "href",
        `https://wa.me/?text=${postTitle} ${postUrl}`
    );
}

// add row
$("#addRowBtn").click(function () {
    var html = '';
    html += '<div class="row" id ="newRowAdded">';
    html += '<div class="col-lg-6">';
    html += '<label for="foodName" class="form-label">Food Name:*</label>';
    html += '<input list="foodList" name="foodName" id="foodName" class="form-control" placeholder="Food Name" size="50">';
    html += '</div>';
    html += '<div class="col-lg-4">';
    html += '<label>Quantity:*';
    html += '<input type = "text" name="quantity" id="quantity" class="form-control" placeholder="Quantity" size="50" required>';
    html += '</label>';
    html += '</div>';
    html += '<div class="col-lg-2">';
    html += '<button id="removeRow" type="button" class="btn btn-danger">Remove</button>';
    html += '</div>';
    html += '</div>';

    $('#newRow').append(html);

});

// remove row
$(document).on('click', '#removeRow', function () {
    $(this).closest('#newRowAdded').remove();
});

init();
