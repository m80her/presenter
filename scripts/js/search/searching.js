var searching = {};

searching.share_with = Array();

searching.iskeyDown = false;

searching.presenatationId_now = false;

searching.presentationDocumentationCompany = false;

searching.openActionPresentation=function(e,action)
{
	e.preventDefault();
	//get checked item
		
	$('#presentation_list_area .presentation_radio').each(function(key,map)
	{
		var doc_company = $("#presentation_doc_company"+key).val();
		var doc_company_id = $("#presentation_doc_company_id"+key).val();
		var parent_id = $("#parent_id"+key).val();
		var presentation_id = $("#presentation_id"+key).val();
		
		if($(map).attr('checked')){
			switch(action)
			{
			case "share":
			{
			searching.action_share_selected_item(map, doc_company, 'list');
			break;
			}
			case "play":
			{
			searching.action_play_selected_item(map, doc_company, doc_company_id, parent_id, presentation_id);
			break;
			}
			case "edit":
			{
			searching.action_edit_selected_item(map, doc_company, doc_company_id, parent_id, presentation_id);
			break;
			}
			
			}
			return false;
			}
	});
};

searching.action_play_selected_item=function(item_x, doc_company, doc_company_id, parent_id, presentation_id)
{
	window.location = APP_ROOT+"presentations/play-presentation/"+presentation_id+"/"+doc_company_id+"/"+parent_id;	
};

searching.action_edit_selected_item=function(item_x, doc_company, doc_company_id, parent_id, presentation_id)
{
	window.location = APP_ROOT+"presentations/all-slides/"+presentation_id+"/"+doc_company_id;	
};

searching.action_share_selected_item=function(item_x, doc_company, doc_company_id)
{
	$('#shareModal').modal('show');
	$("#presentation_share_name").val("");
	$("#presentation_share_autoCompleteResultsContainer").html("");
};


searching.kd=function(e)
{
	this.iskeyDown = true;
	/*var c = String.fromCharCode(e.which)
	alert(c);*/
};

searching.ku=function(e)
{
	this.iskeyDown = false;
	if(!this.iskeyDown)
	{
		this.generate_search_list($("#presentation_share_name").val());
	}
};



searching.generate_search_list=function(share_VALUE)
{
	var lastPosOfComma = share_VALUE.lastIndexOf(',');
	lettersAfterComma = share_VALUE.substr((lastPosOfComma+1));
	if(lettersAfterComma!="")
	{
	this.getSearchSuggestion(lettersAfterComma);
	}else{$("#presentation_share_autoCompleteResultsContainer").html("");}
};

searching.getSearchSuggestion=function(str)
{
	$("#presentation_share_autoCompleteResultsContainer").css("display","block");
	$("#presentation_share_autoCompleteResultsContainer").html("");
	$.post(APP_ROOT+'contactsSuggestions', {data_str:str},function(data)
	{
		  //this is the result coming back from db
		  var data_obj = $.parseJSON(data);
		  if(data_obj.length<0){$("#presentation_share_autoCompleteResultsContainer").css("display","none");}
		  var content = "";
		  $(data_obj).each(function(x,y)
		  {
			  var theVal = y.first_name+" "+y.last_name;
			  if(y.first_name==""){theVal = y.email;}
			  content += '<a href="#" onclick="searching.fillSelector(event,\''+x+'\',\''+y.email+'\')">'+theVal+'</a>';
		  });
		  $("#presentation_share_autoCompleteResultsContainer").append(content);
	});
};

searching.fillSelector=function(e,index,email)
{
	e.preventDefault();
	$("#presentation_share_autoCompleteResultsContainer").html("");
	$("#presentation_share_autoCompleteResultsContainer").css("display","none");
	var enterEmail = true;
	for(var i=0; i<searching.share_with.length; i++)
	{
		if(this.share_with[i]==email){enterEmail = false; break;}
	}
	if(enterEmail){this.share_with.push(email);}
	$("#presentation_share_name").val(this.share_with.join(' , '));
};

searching.sharePresentation=function()
{
	//documentationCompany = false;
	if(this.share_with.length>0)
	{
		$.post(APP_ROOT+'presentations/share-presentations', 
		{
		presenatationId:this.presenatationId_now, 
		emails:this.share_with.join(','), 
		presentationDocumentationCompany:this.presentationDocumentationCompany
		}
		,function(data)
		{
			$('#shareModal').modal('hide');
			presents_listing.unselectAll();
			
		});
	}
};