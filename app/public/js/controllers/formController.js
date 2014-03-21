
function FormController()
{

// Scroll between forms on the screen
	$('#btn-info').click(function(){$(window).scrollTo('#info-scrollpoint')});
	$('#btn-deposit').click(function(){$(window).scrollTo('#deposit-scrollpoint')});
	$('#btn-id').click(function(){$(window).scrollTo('#id-scrollpoint')});
	$('#btn-signature').click(function(){$(window).scrollTo('#signature-scrollpoint')});

//Clear signature
$('#btn-delsig').click(function(){$('#Signature').jSignature("reset");});

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm clearing the form //
	$('#info-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle clearing the form //
	$('.modal-confirm .submit').click(function(){ that.clearForm(); });


	this.clearForm = function()
	{
		$('.modal-confirm').modal('hide');
		var that = this;
		$.ajax({
			url: '/delete',
			type: 'POST',
			data: { id: $('#userId').val()},
			success: function(data){
	 			that.showLockedAlert('The form has been cleared');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/memberinfo",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			that.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.showLockedAlert = function(msg){
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		setTimeout(function(){window.location.href = '/';}, 3000);
	}
}

FormController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('The member info has been submitted');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
