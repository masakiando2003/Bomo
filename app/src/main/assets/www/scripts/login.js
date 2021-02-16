$('#page_login_submit').live('click',function(){
  var name = $('#page_login_name').val();
  if (!name) { alert('Please enter your user name.'); return false; }
  var pass = $('#page_login_pass').val();
  if (!pass) { alert('Please enter your password.'); return false; }
  
  // BEGIN: drupal services user login (warning: don't use https if you don't have ssl setup)
  $.ajax({
      url: "http://bomo.b2k.hk/?q=my_services/user/login.json",
      type: 'post',
      data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //alert('page_login_submit - failed to login');
		alert('Login failed. Please check your user name and password');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
	  //alert('page_login_submit - success to login');
       //$.mobile.changePage("index3.html", "slideup");
	   window.location.href="dashboard.html";
      }
  });
  // END: drupal services user login
  return false;
});

$('#page_login_forgot').live('click',function(){
	window.location.href="forgot_password.html";
});


$('#page_login_register').live('click',function(){
	window.location.href="register.html";
});

$('#page_back').live('click',function(){
	window.location.href="index2.html";
});
