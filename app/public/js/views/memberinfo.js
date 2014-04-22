
$(document).ready(function(){

	var fc = new FormController();
	var fv = new InfoFormValidator();

window.addEventListener('onorientationchange', function () {
    if (window.orientation == -90) {
        document.getElementById('orient').className = 'orientright';
    }
    if (window.orientation == 90) {
        document.getElementById('orient').className = 'orientleft';
    }
    if (window.orientation == 0) {
        document.getElementById('orient').className = '';
    }
}, true);
 
	//$('#fname-tf').focus();
	$('#github-banner').css('top', '40px');
	
	
	//Add signature Function
	
	$("#signature").jSignature({color:"#00f",lineWidth:0,height:200,width:300});
	
// customize the member form //
	
	
	$('#info-form-container h1').text('Basic Info');
	$('#address-form-container h1').text('Address Info');
	$('#deposit-form-container h1').text('Deposit Info');
	$('#id-container h1').text('Identification');
	$('#member-form #sub1').text('Enter the information for the new member');
	$('#user-tf').attr('disabled', 'disabled');
	$('#member-form-btn1').html('Submit');
	$('#member-form-btn1').addClass('btn-success');

// Hide all components except for info form on load	

	$('#deposit-scrollpoint').hide(); 
	$('#id-scrollpoint').hide();
	$('#signature-scrollpoint').hide();
	$('#address-scrollpoint').hide();
	$('#review-scrollpoint').hide();
	$('#btn-info').addClass('btn-warning');
	$(window).scrollTo('#info-scrollpoint');	
})