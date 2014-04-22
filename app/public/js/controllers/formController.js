
function FormController()
{

// Scroll between forms on the screen
	$('#btn-info').click(function(){
	$('#btn-info').addClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-review').removeClass('btn-warning');
	$('#info-scrollpoint').show();
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#review-scrollpoint').hide()
	$(window).scrollTo('#info-scrollpoint'); 
	});
	
	$('#btn-address').click(function(){
	$('#btn-address').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-review').removeClass('btn-warning');
	$('#address-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#review-scrollpoint').hide();
	$(window).scrollTo('#address-scrollpoint');
	});
	
	$('#btn-deposit').click(function(){
	$('#btn-deposit').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-review').removeClass('btn-warning');
	$('#deposit-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#review-scrollpoint').hide();
	$(window).scrollTo('#deposit-scrollpoint');
	});
	
	$('#btn-id').click(function(){
	$('#btn-id').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#btn-review').removeClass('btn-warning');
	$('#id-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#review-scrollpoint').hide();
	$(window).scrollTo('#id-scrollpoint');
	});
	
	$('#btn-signature').click(function(){
	$('#btn-signature').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-review').removeClass('btn-warning');
	$('#signature-scrollpoint').show(); 
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#review-scrollpoint').hide();
	$(window).scrollTo('#signature-scrollpoint');
	});
	
	$('#btn-review').click(function(){
	$('#btn-review').addClass('btn-warning');
	$('#btn-info').removeClass('btn-warning');
	$('#btn-address').removeClass('btn-warning');
	$('#btn-deposit').removeClass('btn-warning');
	$('#btn-id').removeClass('btn-warning');
	$('#btn-signature').removeClass('btn-warning');
	$('#review-scrollpoint').show();
	$('#info-scrollpoint').hide(); 
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide();
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	 var content = $("#fname-tf").val();
      $("#fname-rev").val(content);
	  content = $("#mname-tf").val();
      $("#mname-rev").val(content);
	  content = $("#lname-tf").val();
      $("#lname-rev").val(content);
	  content = $("#email-tf").val();
      $("#email-rev").val(content);
	  content = $("#ssn-tf").val();
      $("#ssn-rev").val(content);
	  content = $("#addr1-tf").val();
      $("#addr-rev").val(content);
	  content = $("#city-tf").val();
      $("#city-rev").val(content);
	  content = $("#state-list").val();
      $("#state-rev").val(content);
	  content = $("#zip-tf").val();
      $("#zip-rev").val(content);
	   content = $("#deposit-list").val();
      $("#deposit-type-rev").val(content);
	  content = $("#depositAmt-tf").val();
      $("#deposit-amt-rev").val(content);
	$(window).scrollTo('#review-scrollpoint');
	});
	
	$('#member-form-cancel').click(function(){
	$('#info-scrollpoint').hide();
	$('#address-scrollpoint').hide(); 	
	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#submit-scrollpoint').hide()
	});
	
	//Clear signature
	$('#btn-delsig').click(function(){
	$('#signature').jSignature('clear');
	return false;
	});

	//Store Signature as string
	$('#btn-savesig').click(function() {
	$('#signature_capture').val($('#signature').jSignature('getData'));
	return false;
	});


		   

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });
	

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

FormController.prototype.onUpdateSuccess = function()
{
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : false });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('The member info has been submitted');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
