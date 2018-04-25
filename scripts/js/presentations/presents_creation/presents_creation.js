var presents_creation = {};

$(document).ready(function()
{
	presents_creation.init();
	
	presents_creation.initialize_creationStart_button();
	
	$(document).click(function()
	{
		if($("#autoComplete_companyHolder")){$("#autoComplete_companyHolder").css("display","none");}
	});
});

presents_creation.selected_presentation_to_clone = {};

presents_creation.init=function()
{
	if(!$('#presentation_submit').is(':disabled'))
	{
		$('#presentation_submit').attr('disabled', 'disabled');
		$('#presentation_submit_link').css('display','none');
	}
}

presents_creation.show_my_presentations=function(e)
{
	  e.preventDefault();
	  $.get(APP_ROOT+'presentations/retrieve-presentations-created', function(myPresentsJSON)
	  {
		  var $contents = '';
		  var myPresents = jQuery.parseJSON(myPresentsJSON);
		  if(myPresents.length>0)
		  {
		  $("#my_created_presentations_table").css("visibility","visible");
		  $("#existing_presentation_list_area").html("");
		  }
		  
		  var count = 0;
		  $(myPresents).each(function(key, value)
		  {
		  	
		  	/*
			  $contents += 
			  '<div class="my_created_presentations_single" '+
			  'onclick="presents_creation.presentation_clicked_to_clone(\''+
			  value.presentation_id+'\',\''+
			  value.document_company+'\')">'+
			  value.presentation_name+
			  '</div>';
			  */
			 
			 $contents += 
			 '<tr id="laugh" onclick="presents_creation.presentation_clicked_to_clone(this,\''+
			  count+'\',\''+
			  value.presentation_id+'\',\''+
			  value.document_company+'\')">'+
			 '<input type="hidden" value="null" id="colorHolder'+count+'"/>'+
			 '<input type="hidden" value="off" id="colorHolderPos'+count+'"/>'+
			 '<th>'+
			 '<label class="radio">'+
			 '<input class="presentation_radio" type="radio" name="presentation_radio" value="">'+
			 '</label>'+
			 '</th>'+
			 '<td><a href="'+APP_ROOT+'presentations/play-presentation/'+value.presentation_id+'/'+value.companyId+'/'+value.parent_id+'">'+value.presentation_name+'</a></td>'+
			 '<td>'+value.presentation_company+'</td>'+
			 '<td>'+value.first_name+' '+value.last_name+'</td>'+
			 '<td>'+value.type+'</td>'+
			 '<td>'+value.the_presentation_date+'</td>'+
			 '</tr>';
			 
			 count++;
			 
		  });
		  
		  $("#existing_presentation_list_area").html($contents);
	  });
};

presents_creation.check_submission_clear=function()
{
	var showSubmission = false;
	if(!app_ctrl.is_field_empty($("#presentation_name").val())){showSubmission = true;}
	
	if(showSubmission){this.toggle_submit_area('show');}else{this.toggle_submit_area('hide');}
};

presents_creation.toggle_submit_area=function(state)
{
	switch(state)
	{
		case "show":
		{
			$('#presentation_submit').removeAttr('disabled');
			$('#presentation_submit_link').css('display','inline');
			break;
		}
		case "hide":
		{
			$('#presentation_submit').attr('disabled', 'disabled');
			$('#presentation_submit_link').css('display','none');
			break;
		}
	}
};

presents_creation.initialize_creationStart_button=function(e)
{
	$("#major_presentation_submit_link").
	click(function(e)
	{
		e.preventDefault();
		
		$("#create_from_existence").val("no");
		if(presents_creation.selected_presentation_to_clone.documentCompany&&
			presents_creation.selected_presentation_to_clone.presentationId)
		{
			presents_creation.request_presentation_creation_from_existing();
		}
			
		$("#create_presentation_form").submit();
		
		
	});
};

presents_creation.presentation_clicked_to_clone=function
(theItem,theCount,presentationId,documentationCompany)
{
	//$(theItem).css("background-color","#DDDDDD");
	var presentColor = "";
	var newColor=$(theItem).css("background-color");
	
	
	if($("#colorHolder"+theCount).val()=='null')
	{
	$(theItem).children('td').each(function(x,y)
	{
		presentColor = $(y).css("background-color");//,"#DDDDDD");
	});
	
	$("#colorHolder"+theCount).val(presentColor);
	$("#colorHolder"+theCount).val('null');
	
	}
	else
	{
		$("#colorHolder"+theCount).val(presentColor);
		presentColor = $("#colorHolder"+theCount).val();
	}
	
	if($("#colorHolderPos"+theCount).val()=="on")
	{
		$("#colorHolderPos"+theCount).val('off');
	}
	else
	{
		$("#colorHolderPos"+theCount).val('on');
	}
	
	$("#colorHolder"+theCount).val(presentColor);
	$(theItem).css("background-color",presentColor);
	
	$(theItem).children('td').css("background-color",newColor);
	$(theItem).children('th').css("background-color",newColor);
	
	//$(theItem).children('td').css("background-color","transparent");
	//$(theItem).children('th').css("background-color","transparent");
	
	presents_creation.selected_presentation_to_clone.documentCompany=documentationCompany;
	presents_creation.selected_presentation_to_clone.presentationId=presentationId;
};

presents_creation.request_presentation_creation_from_existing=function()
{
	$("#create_from_existence").val("yes");
	$("#existence_documentation_company").val(presents_creation.selected_presentation_to_clone.documentCompany);
	$("#existence_presentationId").val(presents_creation.selected_presentation_to_clone.presentationId);
};

presents_creation.kd=function(e)
{
	this.iskeyDown = true;
	/*var c = String.fromCharCode(e.which)
	alert(c);*/
};

presents_creation.ku=function(e)
{
	this.iskeyDown = false;
	if(!this.iskeyDown)
	{
		this.generate_search_list($("#presentation_campany").val());
	}
};

presents_creation.generate_search_list=function(share_VALUE)
{
	if(share_VALUE!="")
	{
	this.getSearchSuggestion(share_VALUE);
	}else{$("#presentation_campany").html(""); $("#autoComplete_companyHolder").css("display","none");}
};

presents_creation.getSearchSuggestion=function(str)
{
	$("#autoComplete_companyHolder").css("display","block");
	$("#autoComplete_companyHolder").html("");
	$.post(APP_ROOT+'presentations/company-search-results', {data_str:str},function(data)
	{
		  //this is the result coming back from db
		  var data_obj = $.parseJSON(data);
		  if(data_obj.length<0){$("#autoComplete_companyHolder").css("display","none");}
		  var content = "";
		  $(data_obj).each(function(x,y)
		  {
			  content += '<div href="#" id="autoComplete_a_companyBox" onclick="presents_creation.fillSelector(\''+y.company_name+'\')">'+y.company_name+'</div>';
		  });
		  $("#autoComplete_companyHolder").append(content);
	});
};

presents_creation.fillSelector=function(company_name)
{
	$("#autoComplete_companyHolder").html("");
	$("#autoComplete_companyHolder").css("display","none");
	$("#presentation_campany").val(company_name);
};