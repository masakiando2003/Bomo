var nid; // global node id variable
var uid;

//alert('page_dashboard - page start');

$(document).ready(function(){
  //alert('page_dashboard - trying to connect');
  try {
    $.ajax({
      url: "http://bomo.b2k.hk/?q=my_services/system/connect.json",
      type: 'post',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        //alert('page_dashboard - failed to system connect');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        var drupal_user = data.user;
        if (drupal_user.uid == 0) { // user is not logged in, show the login button, hide the logout button
		  //alert('Login Case1');
          //$('#button_login').show();
          //$('#button_logout').hide();
		  //alert('You have not logged in yet!');
		  window.location.href="login.html";
        }
        else { // user is logged in, hide the login button, show the logout button
		  //alert('Login Case2');
          //$('#button_login').hide();
	  uid=drupal_user.uid;
	  window.location.href="dashboard.html";
        }
      }
    });
  }
  catch (error) { alert("page_check_connection - " + error); }
});
