
function InfoFormValidator(){

// build array maps of the form inputs & control groups //

	this.formFields = [$('#fname-tf'), $('#mname-tf'), $('#lname-tf'), $('#email-tf'), $('#ssn-tf'),$('#state-tf'), $('#creatot-tf')];
	this.controlGroups = [$('#fname-tf'), $('#mname-tf'), $('#lname-tf'), $('#email-tf'), $('#ssn-tf'),$('#state-tf'), $('#creatot-tf')];
	
// bind the form-error modal window to this controller to display any errors //
	
	this.alert = $('.modal-form-errors');
	this.alert.modal({ show : false, keyboard : true, backdrop : true});
	
	this.validateName = function(s)
	{
		return s.length >= 3;
	}
	
	this.validatePassword = function(s)
	{
	// if user is logged in and hasn't changed their password, return ok
		if ($('#userId').val() && s===''){
			return true;
		}	else{
			return s.length >= 6;
		}
	}
	
	this.validateEmail = function(e)
	{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(e);
	}
	
	this.showErrors = function(a)
	{
		$('.modal-form-errors .modal-body p').text('Please correct the following problems :');
		var ul = $('.modal-form-errors .modal-body ul');
			ul.empty();
		for (var i=0; i < a.length; i++) ul.append('<li>'+a[i]+'</li>');
		this.alert.modal('show');
	}

}

InfoFormValidator.prototype.showDatabaseError = function()
{
	this.showErrors(['Database Error']);
}

InfoFormValidator.prototype.validateInfoForm = function()
{
	var e = [];
	for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');
	if (this.validateName(this.formFields[0].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Please Enter a First Name');
	}
	if (this.validateName(this.formFields[2].val()) == false) {
		this.controlGroups[0].addClass('error'); e.push('Please Enter a Last Name');
	}
	if (this.validateEmail(this.formFields[3].val()) == false) {
		this.controlGroups[1].addClass('error'); e.push('Please Enter A Valid Email');
	}
	if (e.length) this.showErrors(e);
	return e.length === 0;
}

	