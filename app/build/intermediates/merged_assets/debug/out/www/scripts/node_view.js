var nid=getURLParameters('nid');
var uid=getURLParameters('uid');
console.log("UID: "+uid);

$('#page_node_view').live('pageshow',function(){
  try {
    $.ajax({
      url: "http://bomo.b2k.hk/?q=my_services/node/" + encodeURIComponent(nid) + ".json",
      type: 'get',
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert('page_node_view - failed to retrieve page node');
        console.log(JSON.stringify(XMLHttpRequest));
        console.log(JSON.stringify(textStatus));
        console.log(JSON.stringify(errorThrown));
      },
      success: function (data) {
        console.log(JSON.stringify(data));
        $('#page_node_view h1').html(data.title); // set the header title
	var publish;
	if(data.status==1)
	{
		publish="Published";
	}
	else
	{
		publish="Not Publish";
	}
	var created_date = formatTime(data.created);
        var output_str="<table cellpadding=0 cellspacing=0 border=0>";
	output_str+="<tr><td width=20%>Title: </td><td>"+data.title+"</td></tr>";
	output_str+="<tr><td width=20%>Created: </td><td>"+created_date+"</td></tr>";
	output_str+="<tr><td width=20%>Status: </td><td>"+publish+"</td></tr>";
	output_str+="<tr><td width=20%>Promotion Link: </td><td>"+data.field_url.und[0].value+"</td></tr>";
	output_str+="<tr><td colspan=2 align=left width=20%>Promotion Image: </td></tr>";
	output_str+="<tr><td colspan=2 align=left><img width=240 height=400 valign=top src='http://bomo.b2k.hk/sites/default/files/styles/mobile-thumb/public/"+data.field_image.und[0].filename+"'/></td></tr>";
	output_str+="</table>";
	output_str+="<fieldset>";
      	output_str+="<div><button type=button data-theme=a id=page_node_view_back>Back</button></div>";
    	output_str+="</fieldset>";
        $('#page_node_view .content').html(output_str); // display the body in the content div
      }
    });
  }
  catch (error) { alert("page_node_view - " + error); }
});

function formatTime(unixTimestamp) {
    var dt = new Date(unixTimestamp * 1000);

    var year = dt.getFullYear();
    var month = dt.getMonth()+1;
    var date = dt.getDate();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();


    // the above dt.get...() functions return a single digit
    // so I prepend the zero here when needed
    if (month < 10)
	month = '0' + month;
	
    if(date < 10)
	date = '0' + date;

    if (hours < 10) 
     	hours = '0' + hours;

    if (minutes < 10) 
    	minutes = '0' + minutes;

    return year + "-" + month + "-" + date + " "+hours + ":" + minutes;
}

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

$('#page_node_view_back').live('click',function(){
    window.location.href="view_promo.html?uid="+uid;
});
