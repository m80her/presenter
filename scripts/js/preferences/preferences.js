window.onload=function()
{
	
}

var preferences = {};

preferences.submitMsg=function(which)
{
	switch(which)
	{
		case "first_time_user_msg":
		{
			var first_time_user_msg = $('#first_time_user_textarea').val();
			this.update_global_msg(first_time_user_msg,which);
			$("#first_time_user_msg_report").html(first_time_user_msg);
			break;
		}
		
		case "general_user_msg":
		{
			var general_user_msg = $('#general_user_textarea').val();
			this.update_global_msg(general_user_msg,which);
			$("#general_user_msg_report").html(general_user_msg);
			break;
		}
		
		case "featured_slides":
		{
			var featured_slides_msg = $('#featured_slides_input_textarea').val();
			this.update_front_page_features(featured_slides_msg,which);
			//$("#general_user_msg_report").html(general_user_msg);
			break;
		}
		
		case "carousel_slides":
		{
			var carousel_slides_msg = $('#carousel_slides_input_textarea').val();
			this.update_front_page_features(carousel_slides_msg,which);
			//$("#general_user_msg_report").html(general_user_msg);
			break;
		}
		
		default:{}
	}
};


preferences.update_global_msg=function(msg,which)
{
			var url = APP_ROOT+"preferences/submit-global-user-msgs";
			var params = {};
			params.which=which;
			params.msg=msg;
			
			$.post(url,params,function(data)
			{
				//window.location = APP_ROOT+"presentations/all-slides/"+presentationId+"/"+document_company_no;
			});
};


preferences.update_front_page_features=function(msg,which)
{
			var url = APP_ROOT+"preferences/update-front-page-features";
			var params = {};
			params.which=which;
			params.msg=msg;
			
			$.post(url,params,function(data)
			{
				var idToUpdate = "";
				switch(which)
				{
					case "featured_slides":{idToUpdate = "feature_slides_msg_report"; break;}
					case "carousel_slides":{idToUpdate = "carousel_slides_msg_report"; break;}
				}
				$("#"+idToUpdate).html(msg);
			});
};