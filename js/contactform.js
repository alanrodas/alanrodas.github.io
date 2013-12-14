jQuery(document).ready(function ($) {
    
    function trim (myString){return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')}
    
    function _showError(field) {
        field.addClass("error");
        field.next(".alert").removeClass("hidden");
    }
    
    function _hideError(field) {
        field.removeClass("error");
        field.next(".alert").addClass("hidden");
    }
    
    function validateNotEmpty(field) {
        var fieldvalue = trim(field.val());
        if(fieldvalue == ""){
            _showError(field);
            return false;
        }
        return true;
    }
    
    function validateEmail(field) {
        var fieldvalue = trim(field.val());
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!email_regex.test(fieldvalue)){
            _showError(field);
            return false;
        }
        return true;
    }
    
    function display(element, timing) {
        var fadeEffectTiming = 2000;
        element.removeClass("hidden");
        setTimeout(function() {
            element.css("opacity", 1);
            setTimeout(function(){
                element.css("opacity", 0);
            }, timing);
            setTimeout(function() {
                element.addClass("hidden")
            }, timing + fadeEffectTiming);
        }, 100);		
    }
    
    $('#contact-form').live('submit', function(event) {
	
		event.preventDefault();
		var sendemail = true;

		$(this).find('input.mandatory,textarea.mandatory').each(function(){
            _hideError($(this));
        
            sendemail = validateNotEmpty($(this)) && sendemail;
            if($(this).attr('name') == 'form-email'){
                sendemail = validateEmail($(this)) && sendemail;
            }
		});

		if(sendemail){
			var form = $(this);
			var name = $(this).find('[name=form-name]').val();
			var email = $(this).find('[name=form-email]').val();
            var subject = $(this).find('[name=form-subject]').val();
			var message = $(this).find('[name=form-message]').val();
			var emailurl = $(this).attr('data-form-action');
            
			var confirmbox = $(this).find('#email-confirmation');
			var errorbox = $(this).find('#email-error');
	
            var mandrill = new Mandrill("RFq_8sbs5IDrGCFfgRk6Ow");
            mandrill.send({
                from: {email: email, name: name},
                to: [{email: "alanrodas@gmail.com", name: "Alan Rodas Bonjour", type:"to"}],
                subject: subject,
                message: message
            }, function(response) {
                display(confirmbox, 2500);
				$('#contact-form input, #contact-form textarea').each(function(){ $(this).val('');});
            }, function(response) {
                display(errorbox, 6000);
                errorbox.append("<div>"+ response.reject_Reason + "</div>")
            });
		}
		
	});
    
}(jQuery))