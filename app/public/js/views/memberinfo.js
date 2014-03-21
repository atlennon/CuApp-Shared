
$(document).ready(function(){

	var fc = new FormController();
	var fv = new FormValidator();
	
	$('#info-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (fv.validateForm() == false){
				return false;
			} 	else{
			// push the hidden username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
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
	$('#fname-tf').focus();
	$('#github-banner').css('top', '41px');
	
	$('#deposit-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (fv.validateForm() == false){
				return false;
			} 	else{
			// push the hidden username field onto the form data array //
				formData.push({name:'user', value:$('#user-tf').val()})
				return true;
			}
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
	
	$("#signature").jSignature();

// customize the info form //
	
	$('#info-form h1').text('Personal Information');
	$('#info-form #sub1').text('Enter the personal information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#info-form-btn1').html('Clear');
	$('#info-form-btn1').addClass('btn-danger');
	$('#info-form-btn2').html('Submit');
	
// customize the deposit form //
	
	$('#deposit-form h1').text('Deposit Information');
	$('#deposit-form #sub1').text('Enter the deposit information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#deposit-form-btn1').html('Clear');
	$('#deposit-form-btn1').addClass('btn-danger');
	$('#deposit-form-btn2').html('Submit');

// setup the confirm window that displays when the user chooses to clear the form //

	$('.modal-confirm').modal({ show : false, keyboard : true, backdrop : true });
	$('.modal-confirm .modal-header h3').text('Clear');
	$('.modal-confirm .modal-body p').html('Are you sure you want to clear the form?');
	$('.modal-confirm .cancel').html('No');
	$('.modal-confirm .submit').html('Yes');
	$('.modal-confirm .submit').addClass('btn-danger');

})