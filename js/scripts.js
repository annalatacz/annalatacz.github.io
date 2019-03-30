function checkCookiesPermissions() 
{
	if (navigator.cookieEnabled == true) 
	{
		checkCookie();
	} 
}

function showBanner() {
	document.getElementById("cookieBanner").style.display ="block";
}

function hideBanner() {
	document.getElementById("cookieBanner").style.display ="none";
}

function setCookie(cname)
{
	cname = "lastVisitDate";
	var now = new Date();
	var today = new Date();

	var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+ '-';
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date + ' ' + time;

	now.setMinutes(now.getMinutes() + 3);

	var expires = "expires=" + now;
	document.cookie = cname + "=" + dateTime + ";" + expires + ";path=/";
}

function getCookie(cname)
{
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0)
		{
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie()
{
	var date = getCookie("lastVisitDate");

	if (date == "")
	{
		showBanner();
		alert("Hello new Visitor!");
	}
	else
	{
		var parts = date.split('-');

		var year = Number(parts[0]);
		var month = Number(parts[1] - 1);
		var day = Number(parts[2]);

		var today = new Date();
		var day2 = Number(today.getDate());
		var month2 = Number(today.getMonth());
		var year2 = Number(today.getFullYear());

		var count = ((year2 - year) * 12 + month2 - month)*30 + day2 - day; // The average day count for a month is 30 days to simplify calculations.

		if (isNaN(count)) //“is Not a Number”, if variable is not a number, it return true, else return false.
		{
			alert("Hello new Visitor!"); //this may happen if there is something wrong with the date in the cookie - special case issue
		}
		else
		{
			alert("Welcome again! It's nice to see you after " + count + " days." ); //+ year +" "+ month +" "+ day+ " "+ year2 +" "+ month2 +" "+ day2+ " " +count);
		}
	}

	setCookie("lastVisitDate");
}
