
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
$('#btn-delsig').click(function(){$('#signature').jSignature('clear');});

// bind event listeners to button clicks //
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });
	
/*
	$('#member-form-submit').click(function(){ that.submitForm(); });
	
	$("#member-form").submit(function(){
		var formData = new FormData($(this)[0]);

		$.ajax({
		url:$(this).attr("action"),
		type: 'POST',
		data: formData,
		async: false,
		success: function (data) {
		alert(data);
		location.reload();
		},
		cache: false,
		contentType: false,
		processData: false
		});
		return false;	
	});
	
*/	
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

/*	
	
	//Program a custom submit function for the form
	this.submitForm(event)
	var that = this;
	{
	$("#member-form").submit(function(event){
 
	//disable the default form submission
	event.preventDefault();
 
	//grab all form data  
	var formData = new FormData($(this)[0]);
 
	  $.ajax({
		url: '/memberinfo',
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		success: function (returndata) {
		  alert(returndata);
		}
	  });
	 
	  return false;
	});
	}
	/*	
	this.submitForm = function()
	{
	
		var that = this;
		$ajax({
			
	
//	$("#member-form").ajaxForm(function(){
		var formData = new FormData(($'#member-form')[0]));

//		$.ajax({
		url:"/memberinfo",
		type: 'POST',
		data: formData,
		async: false,
		success: function (data) {
		alert(data);
		location.reload();
		},
		cache: false,
		contentType: false,
		processData: false
		});
//		return false;
		
	}
*/
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
	$('.modal-alert').modal({ show : false, keyboard : true, backdrop : false });
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('The member info has been submitted');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
