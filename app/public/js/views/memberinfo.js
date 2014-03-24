
$(document).ready(function(){

	var fc = new FormController();
	var fv = new InfoFormValidator();	
	
	
	$('#info-form').ajaxForm({
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
	
	$('#deposit-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			//if (fv.validateForm() == false){
			//	return false;
			//} 	else{
			// push the hidden username field onto the form data array //
			//	formData.push({name:'user', value:$('#user-tf').val()})
				return true;
		//	}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') fc.onUpdateSuccess();
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    fv.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    fv.showInvalidUserName();
			}
		}
	});
	
	//Add signature Function
	
	$("#signature").jSignature();
	
// customize the info form //
	
	$('#info-form h1').text('Personal Information');
	$('#info-form #sub1').text('Enter the personal information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#info-form-btn1').html('Submit');
	$('#info-form-btn1').addClass('btn-success');
	
// customize the deposit form //
	
	$('#deposit-form h1').text('Deposit Information');
	$('#deposit-form #sub1').text('Enter the deposit information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#deposit-form-btn1').html('Submit');
	$('#deposit-form-btn1').addClass('btn-success');

// Hide all components except for info form on load	

	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$(window).scrollTo('#info-scrollpoint');
	
})