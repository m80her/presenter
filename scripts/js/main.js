var app_ctrl = {};

app_ctrl.is_field_empty = function(txt)
{
	if(txt.replace(/^$|^\s+$/g,'')==""){return true;}else{return false;}
};

app_ctrl.is_field_an_email = function(theEmail)
{
	var EmailExp=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(!EmailExp.test(theEmail))
	{return false;}else{return true;}
};

app_ctrl.toggle_class = function(state,theItem,theClass)
{
	switch(state)
	{
		case "on":
		{
			$(theItem).addClass('validation-error');
			break;
		}
		case "off":
		{
			$(theItem).removeClass('validation-error');
			break;
		}
	}
};

app_ctrl.are_text_matching=function(val1, val2)
{
	if(val1===val2){return true;}else{return false;}
};

app_ctrl.is_field_long_enough=function(val,theLength)
{
	if(val.length>theLength||val.length==theLength)
	{return true;}else{return false;}
};



app_ctrl.is_checkBoxChecked=function(theItem)
{
	if($(theItem).is(':checked'))
	{return true;}else{return false;}
};