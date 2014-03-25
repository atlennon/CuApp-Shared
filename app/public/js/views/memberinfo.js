
$(document).ready(function(){

	var fc = new FormController();
	var fv = new InfoFormValidator();	
	
	
	$('#member-form').ajaxForm({
/*		beforeSubmit : function(formData, jqForm, options){
			if (fv.validateInfoForm() == false){
				return false;
			} 	else{
			// push the hidden username field onto the form data array //
				formData.push({creator:'user', value:$('#username').val()})
				return true;
			}
		},
*/		success	: function(responseText, status, xhr, $form){
			if (status == 'success') fc.onUpdateSuccess();
		},
		error : function(e){
			    fv.showDatabaseError();
			}	
	});
	
	//$('#fname-tf').focus();
	$('#github-banner').css('top', '40px');
	
	
	//Add signature Function
	
	$("#signature").jSignature();
	
// customize the member form //
	
	
	$('#member-form-container h1').text('Basic Info');
	$('#address-form-container h1').text('Address Info');
	$('#deposit-form-container h1').text('Deposit Info');
	$('#id-container h1').text('Identification');
	$('#member-form #sub1').text('Enter the information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#member-form-btn1').html('Submit');
	$('#member-form-btn1').addClass('btn-success');
	$('#member-form-btn2').html('Cancel');
	$('#member-form-btn2').addClass('btn-danger');

// Hide all components except for info form on load	

	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#address-scrollpoint').hide();
	$('#submit-scrollpoint').hide();
	$(window).scrollTo('#info-scrollpoint');
	
	
})