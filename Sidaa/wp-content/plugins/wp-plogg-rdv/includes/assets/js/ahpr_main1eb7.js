function ahpr_validation() {
	message = '';

	if($('#ahpr_nom').val() == ''){ // Le nom est une case obligatoire
		message += '\n - '+ "Veuillez saisir votre nom.";
	}

	if($('#ahpr_tel').val() == ''){ // Le téléphone est une case obligatoire
		message += '\n - '+ "Veuillez saisir votre numéro de téléphone.";
	}
	else
	{
		if(!isPhoneValid($('#ahpr_tel').val()))
		{
			message += '\n - '+ "Votre numéro de téléphone est invalide. Assurez-vous d'inclure l'indicatif régional.";
		}
	}

	if($('#ahpr_courriel').val() == ''){ // Le courriel est une case obligatoire
		message += '\n - '+ "Veuillez saisir votre courriel.";
	}
	else
	{
		if(!isEMailValid()) {
			message += '\n - '+ "Votre adresse courriel est invalide.";
		}
	}

	if($('#ahpr_date_rdv').val() != ''){ // La préférence de date de rendez-vous est optionnelle
		if(!isAppointmentDateValid()) {
			message += '\n - '+ "Votre date de rendez-vous souhaitée est invalide. Format : AAAA-MM-JJ";
		}
	}


	if($('input[name="ahpr_magicfield"]:-webkit-autofill').length>0){
		$('input[name="ahpr_magicfield"]:-webkit-autofill').val("");
	}

	var recaptcha = document.getElementById("g-recaptcha");
    if(recaptcha){
        return grecaptcha && grecaptcha.getResponse().length !== 0;
    }

	if(message != '') {
		alert(message);
		return false;
	}

	if($('input[name="magicfield"]:-webkit-autofill').length>0)	{
		$('input[name="magicfield"]:-webkit-autofill').val("");
	}
	return true;

}
function ahpr_validation_en() {
	message = '';

	if($('#ahpr_nom').val() == ''){
	    message += '\n - '+ "Please provide your name.";
	}
	if($('#ahpr_courriel').val() == ''){
	    message += '\n - '+ "Please provide your email.";
	}

	if(!isEMailValid()) {
	    message += '\n - '+ "Your email address is invalid.";
	}
	/*
	if($('#ahpr_message').val() == ''){
	    message += '\n - '+ "Please enter a short message.";
	}
	*/
	if( $('#ahpr_tel').val() == ''){
	    message += '\n - '+ "Please enter your phone number.";
	}
	else
	{
		if(!isPhoneValid($('#ahpr_tel').val()))
		{
			message += '\n - '+ "Your phone number is invalid. Please make sure to include the area code.";
		}
	}

	if($('input[name="ahpr_magicfield"]:-webkit-autofill').length>0){
		$('input[name="ahpr_magicfield"]:-webkit-autofill').val("");
	}

	var recaptcha = document.getElementById("g-recaptcha");
    if(recaptcha){
        return grecaptcha && grecaptcha.getResponse().length !== 0;
    }

	if(message != '') {
			alert(message);
			return false;
	}
    return true;
}

function isPhoneValid(phone){
    var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;	// 123-456-7890

    if (filter.test(phone)) {
        return true;
    }
	return false;
}

function isEMailValid() {
    var email = document.getElementById('ahpr_courriel');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(email.value)) {
        return true;
    }
	return false;
}

/*
 * Date valid if
 * - proper format AAAA-MM-DD
 * - respects ranges (ie. month between 1 and 12)
 * - between now and five years from now
 */
function isAppointmentDateValid() {
	var appointmentDate = document.getElementById('ahpr_date_rdv').value;
	var filter = /^([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})$/;	// 1234-12-12

	if (filter.test(appointmentDate)) {
		if (isDateStringValid(appointmentDate)) {
			return true;
		}
	}
	return false;
}

/*
 * Date valid if
 * - Month is between 1 and 12
 * - Day is between 1 and 31
 * - Year is not more than 5 years from now.
 * - Date is not in the past
 */
function isDateStringValid(dateString) {

	var year = parseInt(dateString.substring(0, 4));
	var month = parseInt(dateString.substring(5, 7));
	var day = parseInt(dateString.substring(8, 10));

	if (month < 1 || month > 12 || day < 1 || day > 31) {
		return false;
	}

	var today = new Date();
	var todaysYear = today.getFullYear();
	var todaysMonth = today.getMonth() + 1; // 0-11 -> 1-12
	var todaysDay = today.getDate();

	if (year < todaysYear) { // If past year
		return false;
	}
	if (year > todaysYear + 5) { // If more than five years from now
		return false;
	}
	if (year == todaysYear) { // If current year
		if (month < todaysMonth) { // If past month
			return false;
		}
		if (month == todaysMonth) { // If current month
			if (day < todaysDay) { // If past day
				return false;
			}
		}
	}

	return true;
}

function message(status, message) {
	var msg_class = '';
	switch (status) {
		case '200':
			msg_class = 'success';
			break;
		default:
			msg_class = 'danger';
	}
	var timer = 5000;
	if (status != '200') {
		timer = 15000;
	}
	$('#session_msg').addClass(msg_class);
	$('#session_msg').html('<p>' + message + '</p>');
	$('#session_msg').slideDown(500);
	setTimeout(function(){
		$('#session_msg').slideUp(500);
	},timer);
}
function change_url_action(prev_action, new_action) {
	event.preventDefault();
	var current_location = location.search;
	if (new_action === null || new_action === '') {
		window.location.search = '';
		// window.location.search = current_location.replace('?action=' + prev_action, '');
		return true;
	}
	if (prev_action === null || prev_action === '') {
		window.location.search += '&action=' + new_action;
		return true;
	}
	window.location.search = current_location.replace('action=' + prev_action, 'action=' + new_action);
}
function parse_query_string(query) {
	var vars = query.split("&");
	var query_string = {};
	for (var i = 0; i < vars.length; i++) {
    	var pair = vars[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = decodeURIComponent(pair[1]);
		// If first entry with this name
		if (typeof query_string[key] === "undefined") {
			query_string[key] = decodeURIComponent(value);
			// If second entry with this name
    	} else if (typeof query_string[key] === "string") {
			var arr = [query_string[key], decodeURIComponent(value)];
			query_string[key] = arr;
			// If third or later entry with this name
    	} else {
			query_string[key].push(decodeURIComponent(value));
    	}
	}
	return query_string;
}
jQuery(document).ready(function($) {
	$('.ahpr-rdv-form-field-wrapper input, .ahpr-rdv-form-field-wrapper textarea').change(function(){
		if($(this).val()!=''){
			$(this).addClass('notempty');
		}else{
			$(this).removeClass('notempty');
		}
	});
	
	if ($('input[name=app_date_choice]:checked').val() == 'now') {
   		$('#ahpr_date_rdv').parent().addClass('hidden');
		jQuery('#ahpr_date_rdv').datepicker('setDate', '+1');
	}else{
   		$('#ahpr_date_rdv').parent().removeClass('hidden');
	}
	
	var query = window.location.search.substring(1);
	if(query != null){
		var qs = parse_query_string(query);		// Récupérer les paramètres de l'URL
		if(qs.ahpr_status == '1'){
			if(localStorage.getItem('return_form')==null){
				console.log('ga OK');
				localStorage.setItem('return_form', 'true');
				//gtag('event', 'appointment form submitted', {'event_category': 'engagement'});
				var F = new Function (php_vars.gtag);
				return(F());
			}
		}
	}
	
	// Réinitiliser la variable return_form au moment de soumettre le formulaire
	$('button[name="ahpr_submit"]').click(function(e){
		localStorage.removeItem('return_form');
	});
});

$('input[name=is_urgent_default]').on('change', function () {
	$('#div_emergency_content').toggleClass('hidden');
	if ($(this).val() == 'yes') {
		$('#app_date_choice_now').click();
	}
});
$('input[name=app_date_choice]').on('change', function () {
	if ($(this).val() == 'now') {
   		$('#ahpr_date_rdv').parent().addClass('hidden');
		jQuery('#ahpr_date_rdv').datepicker('setDate', '+1');
	}else{
   		$('#ahpr_date_rdv').parent().removeClass('hidden');
	}
});
