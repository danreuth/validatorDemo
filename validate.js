// Form Validation Project
// Dan Reuther
// 9/12/2015

// Define error message strings
var REQUIRED_ERROR = "Field is Required";
var NUMERIC_ERROR = "Must be a Number";
var REQUIRED_SIZE_ERROR = "Length Error";

// Run when the document is ready
// Set an on submit listener for every form on the page
$(document).ready( function() {
	$("form").submit(validate);
});

// Main validation function.  Fetches all elements
// to be validated and tracks if the form should
// be allowed to submit.
function validate(event) {
	// Displayed error messages have the validateError class
	// applied.  This removes any old error messages.
	$(".validateError").remove();
	
	// Flag to track if the form is valid. 
	// Assume the form is valid.
	var formIsNotValid = false;
	
	//Grab all input elements that are ancestors of the form element
	// that this event was fired on.  Loop over that list and pass
	// each element to the validInput function.
	$(this).find("input").each( function() {
		if(!validInput($(this))) {
			// If validInput returns false then something was invalid.
			// Set the flag to true, meaning the form is invalid.
			formIsNotValid = true;
		}
	});
	
	if(formIsNotValid) {
		// If the form is invalid stop it from submitting.
		event.preventDefault();
	}
}

// Aggregate function that calls each of the specific validation functions
function validInput(input) {
	// Flag to track if input is valid.  
	// Assume it is.
	var valid = true;
	
	// Call each of the class validation functions 
	// passing in the input object. If validation fails
	// set the flag and display an error message.
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

// Returns false if input has the required class and
// its value is empty or only contains spaces.
function requiredClassValid(input) {
	if(input.hasClass("required")) {
		// Use the trim function to eliminate leading and trailing spaces.
		if($.trim(input.val()) === "") {
			return false;
		} 
	}
	return true;
}

//Returns false if input has the numberic class and its value 
// is not a number.
function numericClassValid(input) {
	if(input.hasClass("numeric")) {
		// Use trim to catch an entry of all spaces.
		if(input.val() && ($.trim(input.val()) === "") || isNaN(input.val())) {
			return false;
		}
	}
	return true;
}

// Returns false if input has the required-size class and value is not
// the length of the max length attribute.  Also returns false if max length
// attribute does not exist on input but input has required-size class.
function requiredSizeClassValid(input) {
	if(input.hasClass("required-size")) {
		// Convert max length attribute to number for comparison later.
		var maxLength = Number(input.attr("maxlength"));
		
		// Return false if maxLength does not exist or is not a number.
		if(!maxLength) {
			return false;
		}
		
		if(input.val() && input.val().length !== maxLength) {
			return false;
		}
	}
	return true;
}

// Adds a new span element after element passed as parameter. 
// Places message as content.
function displayError(element, message) {
	element.after('<span class="validateError">' + message + '</span>');
}