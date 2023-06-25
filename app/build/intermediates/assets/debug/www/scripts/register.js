$('#page_register_submit').live('click',function(){
  var name = $('#page_register_name').val();
  if (!name) { alert('Please enter your user name.'); return false; }
  var email = $('#page_register_email').val();
  if (!email) { alert('Please enter your email address.'); return false; }
  
  // BEGIN: drupal services user register (warning: don't use https if you don't have ssl setup)
  $.ajax({
      url: "http://bomo.b2k.hk/?q=my_services/user/register.json",
      type: 'post',
      data: 'name=' + encodeURIComponent(name) + '&mail=' + encodeURIComponent(email) + '&role=Vendor',
      dataType: 'json',
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //alert('page_register_submit - failed to login');
		alert('Registration failed, please contact with administrator at app.team@uniforce.net');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
		alert(JSON.stringify(XMLHttpRequest));
		alert(JSON.stringify(textStatus));
        alert(JSON.stringify(errorThrown));
      },
      success: function (data) {
	  //alert('page_register_submit - success to login');
       //$.mobile.changePage("index3.html", "slideup");
	   alert('Thank you for applying for an acount, your account is pending approval with admin. A further instruction has been sent to your email address.');
	   window.location.href="login.html";
      }
  });
  // END: drupal services user register
  return false;
});

$('#page_register_back').live('click',function(){
	   window.location.href="login.html";
});
