$(document).ready(function()
{
	
});

var edit_control = {};

edit_control.disabled_button_state = "off";

edit_control.getlinkedInPhoto=function()
{
	var linkedInUrl = $("#linkedInUrl").val();
	if(!app_ctrl.is_field_empty(linkedInUrl))
	{
		$.post(APP_ROOT+'get_linkedin', { url:linkedInUrl }, function(linkedIn_photo_url)
		  {
			  if(linkedIn_photo_url!=""&&linkedIn_photo_url!="invalid-email")
			  {
			  $("#linkedIn_photo").attr('src', linkedIn_photo_url);
			  edit_control.updateUserPhotoDetails(linkedInUrl,linkedIn_photo_url);
			  }
			  
			  if(linkedIn_photo_url=="invalid-email")
			  {
				  $("#edit_linkedin_error_box").html
				('<span class="alert alert-error alert-inline">'+LINKEDIN_INVALID_URL+'</span>');
			  }
		  });
	  
	}
};

edit_control.stripLinkedUrl=function()
{
	//http://uk.linkedin.com/pub/shane-daniel/1b/2a8/99
	//http://www.linkedin.com/pub/shane-daniel/1b/2a8/99
};

edit_control.updateUserPhotoDetails=function(linkedIn_url,linkedIn_photo_url)
{
	$.post(APP_ROOT+'updateLinkedInPicInfoAction', 
	{ userId:$("#user-edit-id").val() ,linkedIn_url:linkedIn_url, linkedIn_photo_url:linkedIn_photo_url }, 
	function(data)
		  {
			  //alert(data);
		  });
};

edit_control.set_validation_marks = function(id)
{
	var txt = $("#"+id).val();
	switch(id)
	{
		case "user-edit-first_name":
		{
			this.check_emptyField(id,txt);
			break;
		}
		case "user-edit-last_name":
		{
			this.check_emptyField(id,txt);
			break;
		}
		case "user-edit-email":
		{
			$("#edit_email_error_box").html('');
			var checkValidEmail = true;
			if(this.check_email(id,txt))
			{
			checkValidEmail = false;
			$("#edit_email_error_box").html
			('<span class="alert alert-error alert-inline">'+NOT_AN_EMAIL+'</span>');
			}
			
			if(checkValidEmail)
			{
				this.check_valid_email(txt);
			}
			break;
		}
		
		case "user-edit-password1":
		{
			if(!this.check_emptyField(id,txt))
			this.check_both_passwords();
			break;
		}
		
		case "user-edit-password2":
		{
			if(!this.check_emptyField(id,txt))
			this.check_both_passwords();
			break;
		}
		default :{}
	}
};

edit_control.check_emptyField = function(id,txt)
{
	app_ctrl.toggle_class('off',$('#'+id),'validation-error');
	if(app_ctrl.is_field_empty(txt))
	{app_ctrl.toggle_class('on',$('#'+id),'validation-error'); return true;}
	return false;
};

edit_control.check_email = function(id,txt)
{
	app_ctrl.toggle_class('off',$('#'+id),'validation-error');
	if(app_ctrl.is_field_empty(txt)||!app_ctrl.is_field_an_email(txt))
	{app_ctrl.toggle_class('on',$('#'+id),'validation-error'); return true;}
	return false;
};

edit_control.check_both_passwords = function()
{
	$("#edit_pw_error_box").html("");
	if($("#user-edit-password1").val()!==$("#user-edit-password2").val())
	{$("#edit_pw_error_box").html('<span class="alert alert-error alert-inline">'+PASSWORDS_MISMATCH+'</span>');}
};

edit_control.check_valid_email=function(email)
{
	$.post(APP_ROOT+'users/check_valid_email', 
	{ email:email }, 
	function(data)
		  {
			  if(!parseInt(data))
			  {
				 $("#edit_email_error_box").html
				('<span class="alert alert-error alert-inline">'+INVALID_SYSTEM_EMAIL+'</span>');
			  }
		  });
};


edit_control.testTwitterLink=function()
{
	var twitterUrl = $("#twitterUrltextBox").val();
	if(!app_ctrl.is_field_empty(twitterUrl))
	{
		$.post(APP_ROOT+'get_validtwitterlink', { url:twitterUrl }, function(formattedTwitterUrl)
		  {
			  $('#twitterUrltextBox').val(formattedTwitterUrl);
		  });
	  
	}
};


edit_control.perform_disabled_action=function(myId)
{
	
	switch(this.disabled_button_state)
	{
		case "off":
		{
			this.disabled_button_state = "first_stage";
			$("#user-delete-button").html("Are you sure ?");
			break;
		}
		case "first_stage":
		{
			this.send_to_disable(myId);
			break;
		}
		
		default:
		{
			this.disabled_button_state = "off";
			$("#user-delete-button").html("Disable this user ?");
		}
	}
	
	$.post(APP_ROOT+'get_validtwitterlink', { url:twitterUrl }, function(formattedTwitterUrl)
		  {
			  $('#twitterUrltextBox').val(formattedTwitterUrl);
		  });
};


edit_control.send_to_disable=function(myId)
{
	var userId = $("#user-edit-id").val();
	$.post(APP_ROOT+'users/delete/'+userId, {}, function(data)
	{
			this.disabled_button_state = "second_stage";
			$("#user-delete-button").html("Disabled !");
			$('#user-delete-button').attr('disabled', 'disabled');
			$('#user-edit-role').html('<option value="disabled_user">disabled_user</option>')
		if(myId==userId)
		{
			window.location=APP_ROOT+'log-out';
		}
	});
};