/***
 * File created by Ivalys@github - https://github.com/Ivalys
 * This file is shared under GNU GPL v2 licence
 *
 * To use Jquery Online Alert, you will first need to configure
 * it. Changes the values below to start.
***/

// Configure the values below :
var positionX = "left"; // right || left
var positionY = "bottom"; // bottom || top
var timeAppear = 2; // In seconds. 0 mean that the alert have to be closed manually.
var timeDissapear = 0.75; // In seconds. Used for Jquery/fadeOut().
var margin = 15; // In pixels. Applied to X & Y.
var minWidth = 400; // In pixels. Set the css min width.
var maxWidth = 400; // In pixels. Set the CSS max width.

// Don't changes that one :
var JQueryOAx = 0;
var padding = 5; // In pixels.
var bgColor = null;
var title = null;
var arrayOAlert = new Object();
var OAAuto = 0;

/***
 * Used for automatically close alerts.
 * This has been created to solve the problem of setInterval() in getOA().
***/
function closeOAAuto()
{
	closeOA('jqueryOA'+OAAuto+'');
	OAAuto += 1;
}

/***
 * Used to know what type of alert it is.
 * Possibility : warning | danger | success | default
***/
function parseOAlert(OAlert)
{
	OAlertArray = OAlert.split("|");
	if(OAlertArray[0] == "warning")
	{
		bgColor = "yellow";
		title = "Warning";
		intermediateColor = "black";
	}
	else if(OAlertArray[0] == "danger")
	{
		bgColor = "red";
		title = "Danger";
		intermediateColor = "white";
	}
	else if(OAlertArray[0] == "success")
	{
		bgColor = "green";
		title = "Success";
		intermediateColor = "white";
	}
	else if(OAlertArray[0] == "default")
	{
		bgColor = "blue";
		title = "Information";
		intermediateColor = "white";
	}
}

/***
 * Use to close manually an Online Alert.
 * id = JQueryOAx
***/
function closeOA(id)
{
	// Replaces elements.
	var splittedID = id.split("OA");
	splittedID = splittedID[1];
	var p2 = $('div#jqueryOA'+splittedID+'').css(positionY);
	
	$('div#'+id+'').fadeOut(timeDissapear * 1000, function(){ $(this).remove()
	delete arrayOAlert[id];
	
	$.each(arrayOAlert, function(key, value)
	{
		var arraySplittedID = key.split("OA");
		arraySplittedID = arraySplittedID[1];
		
		if(arraySplittedID > splittedID)
		{
			var p1 = $('div#jqueryOA'+arraySplittedID+'').css(positionY);
			if(parseInt(p2.substring(0,(p2.length-1))) == margin)
			{
				p2 = $('div#jqueryOA'+arraySplittedID+'').css(positionY);
				$('div#jqueryOA'+arraySplittedID+'').css(positionY, margin+"px");
			}
			else
			{
				$('div#jqueryOA'+arraySplittedID+'').css(positionY, (parseInt(p1.substring(0,(p1.length-1))) - parseInt(p2.substring(0,(p2.length-1))))+margin+"px");
			}
		}
	})});
}

/***
 * Used to get Online Alert.
 * var alert - Parsed string (type|alert)
 * Example : "warning|You don't fill up the forms !"
***/
function getOA(OAlert)
{
	var newMargin = 0;
	$.each(arrayOAlert, function(key, value)
	{
		newMargin += parseInt(value.substr(0,value.length));
		newMargin += (margin * 2);
	});
	
	var previousJQueryOAx = JQueryOAx - 1;
	var element = $("div#jqueryOA"+previousJQueryOAx+"");
	parseOAlert(OAlert);
	var marginTop = margin + (padding * 2);
	$('div#jqueryOAInterface').prepend("<div id='jqueryOA"+JQueryOAx+"' class='jqueryOA' style='color:"+intermediateColor+";background-color:"+bgColor+";"+positionX+":"+margin+";"+positionY+":"+(margin + newMargin)+"px;min-width:"+minWidth+";max-width:"+maxWidth+"'><span style='text-transform:uppercase;'>"+title+"</span><hr class='jqueryOA' style='border-bottom: 1px dashed "+intermediateColor+";'>"+OAlertArray[1]+"</div>");
	// Case timeAppear
	if(timeAppear == 0)
	{
		$('div#jqueryOA'+JQueryOAx+'').append("<div class='jqueryOAClose' onClick='closeOA(\"jqueryOA"+JQueryOAx+"\")'></div>");
	}
	else
	{
		setTimeout(function(){ closeOAAuto(); }, timeAppear * 1000);
	}
	arrayOAlert['jqueryOA'+JQueryOAx+''] = $('div#jqueryOA'+JQueryOAx+'').css('height');
	JQueryOAx += 1;
}

/***
 * Used to create initial interface for alerts.
 * This function is automatically launched when document is ready.
***/
function createOAInterface()
{
	$('body').append("<div id='jqueryOAInterface' class='jqueryOAInterface' style='"+positionX+":"+margin+";"+positionY+":"+margin+";'></div>");
}

// Used for JOA to work.
$(document).ready(createOAInterface);