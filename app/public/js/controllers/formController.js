
function FormController()
{

var currentForm;

// Scroll between forms on the screen
	$('#btn-info').click(function(){
	$('#btn-info').addClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-presubmit').removeClass('btn-warning');
	$('#info-scrollpoint').show();
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#submit-scrollpoint').hide()
	$(window).scrollTo('#info-scrollpoint');
	$('#currentForm').value = '#info-form'; 
	});
	
	$('#btn-address').click(function(){
	$('#btn-address').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-presubmit').removeClass('btn-warning');
	$('#address-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#submit-scrollpoint').hide();
	$(window).scrollTo('#address-scrollpoint');
	$('#currentForm').value = '#info-form'; 
	});
	
	$('#btn-deposit').click(function(){
	$('#btn-deposit').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-presubmit').removeClass('btn-warning');
	$('#deposit-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#submit-scrollpoint').hide();
	$(window).scrollTo('#deposit-scrollpoint');
	$('#currentForm').value = '#deposit-form'; 
	});
	
	$('#btn-id').click(function(){
	$('#btn-id').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-presubmit').removeClass('btn-warning');
	$('#id-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#submit-scrollpoint').hide();
	$(window).scrollTo('#id-scrollpoint');
	$('#currentForm').value = '#id-form'; 
	});
	
	$('#btn-signature').click(function(){
	$('#btn-signature').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-presubmit').removeClass('btn-warning');
	$('#signature-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#submit-scrollpoint').hide();
	$(window).scrollTo('#signature-scrollpoint');
	$('#currentForm').value = '#signature-form'; 
	});
	
	$('#btn-presubmit').click(function(){
	$('#btn-presubmit').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#submit-scrollpoint').show();
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$(window).scrollTo('#submit-scrollpoint');
	});
	
	
	//Clear signature
$('#btn-delsig').click(function(){$('#signature').jSignature('clear');});

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm clearing the form //
//	$('#info-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle submitting the form //
	$('#member-form-btn1').click(function(){that.submitForm(); });
/*
	$(currentForm).submit(function(e) {
    e.preventDefault(); // Prevents the page from refreshing
    var $this = $(this); // `this` refers to the current form element
    $.post(
        $this.attr('action'), // Gets the URL to send the post to
        $this.serialize(), // Serializes form data in standard format
        function(data) { creator: $('#username').val(),
					fname: $('#fname'.val(),
					mname: $('#mname'.val(),
					lname: $('#lname'.val(),
					email: $('#email'.val(),
					ssn:   $('#ssn'.val(),
					state: $('#state'.val()},
        "json" // The format the response should be in
		);
	});
*/	
	this.submitForm = function()
	{
		var that = this;
		$.ajax({
			type: "POST",
			url: $('form').attr("action"),
			data: $(('#currentForm').value).serialize(),
			success: function(data){
	 			that.showLockedAlert('The account has been updated');
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}

	this.attemptLogout = function()
	{
		logout = true;
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

//$(window).bind('beforeunload', function(){
//	if (logout === false)
//  return 'Are you sure you want to leave?';
//});

FormController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('The member info has been submitted');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
