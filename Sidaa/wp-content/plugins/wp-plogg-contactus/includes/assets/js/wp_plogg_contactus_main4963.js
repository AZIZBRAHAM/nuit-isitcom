function wp_plogg_contactus_validation() {
	message = '';

	if($('#wp_plogg_contactus_nom').val() == ''){             
	    message += '\n - '+ "Veuillez indiquer votre nom.";
	}
	
	if($('#wp_plogg_contactus_courriel').val() == ''){             
	    message += '\n - '+ "Veuillez indiquer votre courriel";
	}
	
	if(checkEmail()) {
	    message += '\n - '+ "L'adresse courriel est invalide";
	}
	
	if($('#wp_plogg_contactus_message').val() == ''){            
	    message += '\n - '+ "Veuillez inscrire un court message.";
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
	 
function wp_plogg_contactus_validation_en() {
	message = '';

	if($('#wp_plogg_contactus_nom').val() == ''){             
	    message += '\n - '+ "Please provide your name";
	}
	
	if($('#wp_plogg_contactus_courriel').val() == ''){             
	    message += '\n - '+ "Please provide your email";
	}
	
	if(checkEmail()) {
	    message += '\n - '+ "The email address is invalid";
	}
	
	if($('#wp_plogg_contactus_message').val() == ''){            
	    message += '\n - '+ "Please write a short message.";
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

function checkEmail() {
    var email = document.getElementById('wp_plogg_contactus_courriel');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {    
        return true;
    }
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
$(document).ready(function(){
	$('.wp-plogg-contactus-form-field-wrapper input, .wp-plogg-contactus-form-field-wrapper textarea').change(function(){
		if($(this).val()!=''){
			$(this).addClass('notempty');
		}else{
			$(this).removeClass('notempty');
		}
	});
		
	var query = window.location.search.substring(1);
	if(query != null){
		var qs = parse_query_string(query);		// Récupérer les paramètres de l'URL
		if(qs.wp_plogg_contactus_status == '1'){
			if(localStorage.getItem('return_form')==null){
				console.log('ga OK');
				localStorage.setItem('return_form', 'true');
				//gtag('event', 'contact form filled', {'event_category': 'engagement'})
				
				var F = new Function (php_vars.gtag);
				return(F());
			}
		}
	}
	
	// Réinitiliser la variable return_form au moment de soumettre le formulaire
	$('button[name="submit"]').click(function(e){
		localStorage.removeItem('return_form');
	});
});