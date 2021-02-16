var nid; // global node id variable
var uid;

//alert('page_dashboard - page start');

$('#page_dashboard').live('pageshow',function(){
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
	  document.getElementById('welcome').innerHTML="Hi, "+drupal_user.name+"!";
          $('#button_logout').show();
        }
      }
    });
  }
  catch (error) { alert("page_dashboard - " + error); }
});

$('#button_logout').live("click",function(){
try {
 $.ajax({
     url: "http://bomo.b2k.hk/?q=my_services/user/logout.json",
     type: 'post',
     dataType: 'json',
     error: function (XMLHttpRequest, textStatus, errorThrown) {
       alert('button_logout - failed to logout');
	   $.mobile.changePage("login.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
       console.log(JSON.stringify(XMLHttpRequest));
       console.log(JSON.stringify(textStatus));
       console.log(JSON.stringify(errorThrown));
     },
     success: function (data) {
       alert("You have been logged out.");
       //$.mobile.changePage("login.html",{reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
	   window.location.href="login.html";
     }
 });
}
catch (error) { alert("button_logout - " + error); }
return false;
});

function getURLParameters(paramName) 
{
    var sURL = window.document.URL.toString();  
    if (sURL.indexOf("?") > 0)
    {
       var arrParams = sURL.split("?");         
       var arrURLParams = arrParams[1].split("&");      
       var arrParamNames = new Array(arrURLParams.length);
       var arrParamValues = new Array(arrURLParams.length);     
       var i = 0;
       for (i=0;i<arrURLParams.length;i++)
       {
        var sParam =  arrURLParams[i].split("=");
        arrParamNames[i] = sParam[0];
        if (sParam[1] != "")
            arrParamValues[i] = unescape(sParam[1]);
        else
            arrParamValues[i] = "No Value";
       }

       for (i=0;i<arrURLParams.length;i++)
       {
                if(arrParamNames[i] == paramName){
            //alert("Param:"+arrParamValues[i]);
                return arrParamValues[i];
             }
       }
       return "No Parameters Found";
    }
}

function CreatePromotion(){
		window.location.href="create_promotion.html";
}
function ViewPromotion(){
		window.location.href="view_promo.html?uid="+uid;
}
