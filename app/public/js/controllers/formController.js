
function FormController()
{

var currentForm;

// Scroll between forms on the screen
	$('#btn-info').click(function(){
//	$(currentForm).trigger('submit');
	$('#info-scrollpoint').show(); 
	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$(window).scrollTo('#info-scrollpoint');
	$('#currentForm').value = '#info-form'; 
	});
	
	$('#btn-deposit').click(function(){
	$('#deposit-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$(window).scrollTo('#deposit-scrollpoint');
	$('#currentForm').value = '#deposit-form'; 
	});
	
	$('#btn-id').click(function(){
	$('#id-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#deposit-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$(window).scrollTo('#id-scrollpoint');
	$('#currentForm').value = '#id-form'; 
	});
	
	$('#btn-signature').click(function(){
	$('#signature-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$(window).scrollTo('#signature-scrollpoint');
	$('#currentForm').value = '#signature-form'; 
	});

    
	
	function show() { 
        if ($('#signature-scrollpoint').style.display=='none') { 
            document.getElementById('benefits').style.display='block'; 
        } 
        return false;
    } 
    function hide() { 
        if($('#signature-scrollpoint').style.display=='block') { 
            $('#signature-scrollpoint').style.display='none'; 
        } 
        return false;
    } 
	
	//Clear signature
$('#btn-delsig').click(function(){$('#signature').jSignature('clear');});

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });

// confirm clearing the form //
//	$('#info-form-btn1').click(function(){$('.modal-confirm').modal('show')});

// handle submitting the form //
	$('#info-form-btn1').click(function(){that.submitForm(); });
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
