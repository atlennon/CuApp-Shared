
function LoginController()
{

// bind event listeners to button clicks //
	
	$('#login-form #forgot-password').click(function(){ $('#get-credentials').modal('show');});
	
// automatically toggle focus between the email modal window and the login form //

    $('#get-credentials').on('shown', function(){ $('#email-tf').focus(); });
	$('#get-credentials').on('hidden', function(){ $('#user-tf').focus(); });

}

function inputFocus(i)
{
	if(i.value==i.defaultValue)
	{
		i.value="";
		style.color="#000";
	}
}

function inputBlur(i)
{
	if(i.value==i.defaultValue)
	{
		if(i.value=="")
		{
			i.value=defaultValue;
			style.color="#888";
		}
	}
}
