var login = {};

login.checkLoginField=function(id)
{
	var an_error = true;
	var validationState = 'on';
	if(this.is_LoginField_good(id)){validationState = 'off'; an_error=false;}
	$("#login_error_box").html('');
	
	switch(id)
	{
		case "email":
		{
			if(an_error){$("#login_error_box").html('<span class="alert alert-error help-inline">'+NOT_AN_EMAIL+'</span>');}
			break;
		}
		case "password":
		{
			if(an_error){$("#login_error_box").html('<span class="alert alert-error help-inline">'+NO_PASSWORD_ENTERED+'</span>');}
			break;
		}
		case "register_email":
		{
			if(an_error){$("#login_error_box").html('<span class="alert alert-error help-inline">'+NOT_AN_EMAIL+'</span>');}
			break;
		}
		
		case "password1":
		case "password2":
		{
			if(an_error){$("#login_error_box").html('<span class="alert alert-error help-inline">'+NO_PASSWORD_ENTERED+'</span>');}
			break;
		}
		
		default:{}
	}
	app_ctrl.toggle_class(validationState,$('#'+id),'validation-error');	
};


login.is_LoginField_good=function(id)
{
	var theReturn = false;
	var val = $('#'+id).val();
	switch(id)
	{
		
		
		case "email":
		{
			if(!app_ctrl.is_field_empty(val)
			&&app_ctrl.is_field_an_email(val))
			{theReturn =  true;}
			break;
		}
		
		
		
		case "password":
		{
			if(!app_ctrl.is_field_empty(val))
			{theReturn =  true;}
			break;
		}
		
		
		
		case "register_email":
		{
			if(!app_ctrl.is_field_empty(val)
			&&app_ctrl.is_field_an_email(val))
			{theReturn =  true;}
			break;
		}
		
		
		
		case "password1":
		case "password2":
		{
			if(!app_ctrl.is_field_empty(val))
			{theReturn =  true;}
			break;
		}
		
		
		default:{theReturn =  true;}
		
		
		
	}
	return theReturn;
};

login.check_submitClear=function(e, type)
{
	var submitForm = true;
	e.preventDefault();
	switch(type)
	{
		
		
		
		case "login":
		{
	if(!this.is_fieldReadyForSubmit('email')){this.checkLoginField('email'); submitForm=false; return false;}
	if(!this.is_fieldReadyForSubmit('password')){this.checkLoginField('password'); submitForm=false; return false;}
	if(submitForm){$("#loginForm").submit();}
			break;
		}
		
		
		
		case "register":
		{
	if(!this.is_fieldReadyForSubmit('register_email')){this.checkLoginField('register_email'); submitForm=false; return false;}
	if(submitForm){$("#registerForm").submit();}
			break;
		}
		
		
		
		case "register_passwords":
		{
			$("#login_error_box").html('');
	if(!app_ctrl.are_text_matching($("#password1").val(),$("#password2").val()))
	{
		$("#login_error_box").html('<span class="alert alert-error help-inline">'+PASSWORDS_MISMATCH+'</span>');
		submitForm=false; return false;
	}
	
	if(app_ctrl.is_field_empty($("#password1").val())||app_ctrl.is_field_empty($("#password2").val()))
	{
		$("#login_error_box").html('<span class="alert alert-error help-inline">'+NO_PASSWORD_ENTERED+'</span>');
		submitForm=false; return false;
	}
	
	if(!app_ctrl.is_field_long_enough($("#password1").val(),6)&&
	!app_ctrl.is_field_long_enough($("#password2").val(),6))
	{
		$("#login_error_box").html('<span class="alert alert-error help-inline">'+PASSWORDS_TOO_SHORT+'</span>');
		submitForm=false; return false;
	}
	
	if(!app_ctrl.is_checkBoxChecked($('#forget_password_check')))
	{
		$("#login_error_box").html('<span class="alert alert-error help-inline">'+NOT_PASSWORD_CHECKBOX+'</span>');
		submitForm=false; return false;
	}
	if(submitForm){$("#register_passwords").submit();}
			break;
		}
		
	}
};

login.is_fieldReadyForSubmit=function(id)
{
	if(this.is_LoginField_good(id)){return true;}else{return false;}
};


login.clearErrorMsgs=function()
{
	$("#login_error_box").html('');
};
