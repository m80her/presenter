var presents_listing = {};

//http://twitter.github.com/bootstrap/javascript.html#modals

presents_listing.share_with = Array();

presents_listing.iskeyDown = false;

presents_listing.presenatationId_now = false;

presents_listing.share_typeOfAction="";

presents_listing.presentationDocumentationCompany = false;

$(document).ready(function()
{
	$('#shareModal').modal({
		show:false
	});
	
	/*$('.typeahead').typeahead({
		source: ['test contact 1', 'test contact 2', 'test contact 3']
	});*/
});

function hh(){alert("productive");}


presents_listing.openActionPresentation=function(e,action)
{
	e.preventDefault();
	//get checked item
		
	$('#presentation_list_area .presentation_radio').each(function(key,map)
	{
		var doc_company = $("#presentation_doc_company"+key).val();
		var doc_company_id = $("#presentation_doc_company_id"+key).val();
		var parent_id = $("#parent_id"+key).val();
		if($(map).attr('checked')){
			switch(action)
			{
			case "share":
			{
			presents_listing.action_share_selected_item(map, doc_company, 'list','');
			break;
			}
			
			case "play":
			{
			presents_listing.action_play_selected_item(map, doc_company, doc_company_id, parent_id);
			break;
			}
			
			case "edit":
			{
			presents_listing.action_edit_selected_item(map, doc_company, doc_company_id);
			break;
			}
			
			}
			return false;
			}
	});
};

presents_listing.share_single_presentation=function(e,action)
{
	var doc_company = $("#presentation_doc_company").val();
	var presentation_id = $("#presentation_id").val();
	
	presents_listing.action_share_selected_item(presentation_id, doc_company,'single','');
};

presents_listing.action_share_selected_item=function(item_x, doc_company, type,typeOfAction)
{
	switch(type)
	{
		case "list":{this.presenatationId_now = $(item_x).val(); break;}
		case "single":{this.presenatationId_now = item_x; break;}
	}
	this.presentationDocumentationCompany = doc_company;
	this.share_typeOfAction = typeOfAction;
	$('#shareModal').modal('show');
	$("#presentation_share_name").val("");
	$("#presentation_share_autoCompleteResultsContainer").html("");
};

presents_listing.action_edit_selected_item=function(item_x, doc_company, doc_company_id, parent_id)
{
	this.presenatationId_now = $(item_x).val();
	window.location = APP_ROOT+"presentations/all-slides/"+this.presenatationId_now+"/"+doc_company_id;	
};

presents_listing.action_play_selected_item=function(item_x, doc_company, doc_company_id, parent_id)
{
	this.presenatationId_now = $(item_x).val();
	window.location = APP_ROOT+"presentations/play-presentation/"+this.presenatationId_now+"/"+doc_company_id+"/"+parent_id;	
};

presents_listing.kd=function(e)
{
	this.iskeyDown = true;
	/*var c = String.fromCharCode(e.which)
	alert(c);*/
};

presents_listing.ku=function(e)
{
	this.iskeyDown = false;
	if(!this.iskeyDown)
	{
		this.generate_search_list($("#presentation_share_name").val());
	}
};

presents_listing.generate_search_list=function(share_VALUE)
{
	var lastPosOfComma = share_VALUE.lastIndexOf(',');
	lettersAfterComma = share_VALUE.substr((lastPosOfComma+1));
	if(lettersAfterComma!="")
	{
	this.getSearchSuggestion(lettersAfterComma);
	}else{$("#presentation_share_autoCompleteResultsContainer").html("");}
};

presents_listing.getSearchSuggestion=function(str)
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
			  content += '<a href="#" onclick="presents_listing.fillSelector(event,\''+x+'\',\''+y.email+'\')">'+theVal+'</a>';
		  });
		  $("#presentation_share_autoCompleteResultsContainer").append(content);
	});
};

presents_listing.sharePresentation=function()
{
	//documentationCompany = false;
	if(this.share_with.length>0)
	{
		$.post(APP_ROOT+'presentations/share-presentations', 
		{
		presenatationId:this.presenatationId_now, 
		emails:this.share_with.join(','), 
		presentationDocumentationCompany:this.presentationDocumentationCompany,
		share_typeOfAction:this.share_typeOfAction
		}
		,function(data)
		{
			$('#shareModal').modal('hide');
			presents_listing.unselectAll();
			
		});
	}
};

presents_listing.fillSelector=function(e,index,email)
{
	e.preventDefault();
	$("#presentation_share_autoCompleteResultsContainer").html("");
	$("#presentation_share_autoCompleteResultsContainer").css("display","none");
	var enterEmail = true;
	for(var i=0; i<presents_listing.share_with.length; i++)
	{
		if(this.share_with[i]==email){enterEmail = false; break;}
	}
	if(enterEmail){this.share_with.push(email);}
	$("#presentation_share_name").val(this.share_with.join(' , '));
};

presents_listing.unselectAll=function()
{
	$('#presentation_list_area .presentation_radio').each(function(key,map)
	{
		$(map).attr('checked',false);
	});
};

presents_listing.activate_buttons=function(theItemCount)
{
	//alert(theItemCount)
	$("#all_slides_edit_button").attr('disabled','disabled');
	var editAction = $('#edit_action'+theItemCount).val();
	switch(editAction)
	{
		case "own":{$("#all_slides_edit_button").removeAttr('disabled'); break;}
		case "edit":{$("#all_slides_edit_button").removeAttr('disabled'); break;}
	}
	
	/*$('#presentation_list_area .presentation_radio').each(function(key,map)
	{
		$(map).attr('checked',false);
	});*/
};