var REQUIRED_ERROR = "Field is Required";
var NUMERIC_ERROR = "Must be a Number";
var REQUIRED_SIZE_ERROR = "Length Error";

$(document).ready( function() {
	$("form").submit(validate);
});

function validate(event) {
	$(".validateError").remove();
	var formIsNotValid = false;
	$(this).find("input").each( function() {
		if(!validInput($(this))) {
			formIsNotValid = true;
		}
	});
	
	if(formIsNotValid) {
		event.preventDefault();
	}
}

function validInput(input) {
	var valid = true;
	
	if(!requiredClassValid(input)) {
		valid = false;
		displayError(input, REQUIRED_ERROR);
	}
	
	if(!numericClassValid(input)) {
		valid = false;
		displayError(input, NUMERIC_ERROR);
	}
	
	if(!requiredSizeClassValid(input)) {
		valid = false;
		displayError(input, REQUIRED_SIZE_ERROR);
	}
	
	return valid;
}

function requiredClassValid(input) {
	if(input.hasClass("required")) {
		if($.trim(input.val()) === "") {
			return false;
		} 
	}
	return true;
}

function numericClassValid(input) {
	if(input.hasClass("numeric")) {
		if(input.val() && ($.trim(input.val()) === "") || isNaN(input.val())) {
			return false;
		}
	}
	return true;
}

function requiredSizeClassValid(input) {
	if(input.hasClass("required-size")) {
		var maxLength = Number(input.attr("maxlength"));
		if(!maxLength) {
			return false;
		}
		
		if(input.val() && input.val().length !== maxLength) {
			return false;
		}
	}
	return true;
}

function displayError(element, message) {
	element.after('<span class="validateError">' + message + '</span>');
}