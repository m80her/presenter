$(document).ready(function()
{
	presents_editing.initialize_editableButtons();
});

var presents_editing = {};

presents_editing.ckEditorId = null;

presents_editing.templateTypeInput = null;

presents_editing.doc_company_of_insert_slide = null;

presents_editing.presentation_id_of_insert_slide = null;

presents_editing.info_msg_on_screen = false;

presents_editing.permanently_disable_userMsg = false;

presents_editing.openEditorScreen=function (local_content_no,section,presentationId,doc_company,theContent)
{
	$('#finder_local_content_no').val(local_content_no);
	this.toggle_EditorWindow('show');
	
	if(presents_editing.ckEditorId==null){CKEDITOR.replace( 'editor1' );}
	else{CKEDITOR.instances.editor1.setData(theContent);}
	
	
	CKEDITOR.instances.editor1.on( 'instanceReady', function( e )
	{ 
	presents_editing.ckEditorId = CKEDITOR.instances.editor1.id;
	CKEDITOR.instances.editor1.setData(theContent);
	});
	
};

presents_editing.openImageEditorScreen=function(local_content_no,section,presentationId,doc_company)
{
	$('#finder_local_content_no').val(local_content_no);
	this.toggle_FinderWindow('show');
	//window.location = APP_ROOT+"filefinder/"+section+"/"+presentationId+"/"+doc_company+"/"+local_content_no;
};

presents_editing.displayEditorPreviewContent=function()
{
	var txtboxContent = CKEDITOR.instances.editor1.getData();
	var local_content_no = $('#finder_local_content_no').val();
	this.toggle_EditorWindow('hide');
	top.frames['editPreviewed'].updateFrameContent(txtboxContent,local_content_no);
};

presents_editing.itemClickedOn=function(e,theItem,slide_no,presentationNo,document_company_no)
{
	e.preventDefault();
	var theHyperlink = theItem.href;
		
		this.set_button_action($('#all_slides_insert_button_left_default'),
		APP_ROOT+"templates/local/left/"+presentationNo+"/"+document_company_no+"/"+slide_no);
		
		this.set_button_action($('#all_slides_insert_button_left'),
		APP_ROOT+"templates/local/left/"+presentationNo+"/"+document_company_no+"/"+slide_no);
		
		this.set_button_action($('#all_slides_insert_button_right'),
		APP_ROOT+"templates/local/right/"+presentationNo+"/"+document_company_no+"/"+slide_no);
		
		this.set_button_action($('#all_slides_insert_button_start'),
		APP_ROOT+"templates/local/start/"+presentationNo+"/"+document_company_no+"/"+slide_no);
		
		this.set_button_action($('#all_slides_insert_button_end'),
		APP_ROOT+"templates/local/end/"+presentationNo+"/"+document_company_no+"/"+slide_no);
		
		
		//$('#all_slides_edit_button').attr('disabled',false);
		//this.set_button_action($('#all_slides_edit_button'),theHyperlink);
		
	
	var itemClass = $(theItem).attr('class');
	//check   local_deleteable
	if(itemClass.indexOf('local_deleteable')>-1)
	{
		$('#all_slides_delete_button').attr('disabled',false);
		this.set_button_action($('#all_slides_delete_button'),
		APP_ROOT+"presentations/delete-slide/"+presentationNo+"/"+document_company_no+"/"+slide_no);
	}
	else
	{
		$('#all_slides_delete_button').attr('disabled',true);
	}
	
	
	if(itemClass.indexOf('local_edit')>-1)
	{
		$('#all_slides_edit_button').attr('disabled',false);
		this.set_button_action($('#all_slides_edit_button'),theHyperlink);
		this.show_EditInfoBox();
	}
	else if(itemClass.indexOf('local_img_edit')>-1)
	{
		$('#all_slides_edit_button').attr('disabled',false);
		this.set_button_action($('#all_slides_edit_button'),theHyperlink);
		this.show_EditInfoBox();
	}
	else
	{
		//this.resetEditableButtons();
		$('#all_slides_edit_button').attr('disabled',true);
	}
	
	this.un_highlight_allClickedPresentation();
	this.highlightClickedPresentation(theItem);
};

presents_editing.initialize_editableButtons=function()
{
	var document_company_no = $('#document_company_no').val();
	var presentationId = $('#presentationId').val();
	var parent_id = $('#parent_id').val();
	//presentations/update-from-wsw
	var playUrl = APP_ROOT+"presentations/play-presentation/"+presentationId+"/"+document_company_no+"/"+parent_id;
	
	$('#all_slides_view_button').click(function(){window.location=playUrl;});
	$('#all_slides_insert_button').attr('disabled',true);
	$('#all_slides_edit_button').attr('disabled',true);
	$('#all_slides_delete_button').attr('disabled',true);
	$('#all_slides_save_button').attr('disabled',true);
};

presents_editing.resetEditableButtons=function()
{
	//$('#all_slides_insert_button').attr('disabled',true);
	//$('#all_slides_edit_button').attr('disabled',true);
	//$('#all_slides_delete_button').attr('disabled',true);
	//$('#all_slides_save_button').attr('disabled',true);
};

presents_editing.set_button_action=function(button,theHyperlink)
{
	button.click(function(){window.location = theHyperlink; });
};

presents_editing.highlightClickedPresentation=function(theItem)
{
	$(theItem).children('div').children().each(function(x,y)
	{
		if($(y).attr('class'))
		{
			var itemClass = $(y).attr('class');
			if(itemClass.indexOf('presentationBox_shader')>-1)
			{
				$(y).css('width','100%');
				$(y).css('height','100%');
			}
		}
	});
};

presents_editing.un_highlight_allClickedPresentation=function()
{
	$(".presentationBox_shader").each(function(x,y)
	{
		$(y).css('width','0%');
		$(y).css('height','0%');
	});
};

presents_editing.toggle_FinderWindow=function(state)
{
	switch(state)
	{
		
	case "show":
	{
	$(".modal-backdrop").click(function(){presents_editing.toggle_FinderWindow("hide");});
	$(".modal-backdrop").css("display","block");
	$('.modal-backdrop').removeClass('out');
	$('.modal-backdrop').addClass('in');
	$("#dd").css("display","block");
	break; 
	}
	
	case "hide":
	{
	$("#dd").css("display","none");
	$('.modal-backdrop').removeClass('in');
	$('.modal-backdrop').addClass('out');
	$(".modal-backdrop").css("display","none");
	
	break; 
	}
	
	}
};

presents_editing.toggle_EditorWindow=function(state)
{
	switch(state)
	{
		
	case "show":
	{
	$(".modal-backdrop").click(function(){presents_editing.toggle_EditorWindow("hide");});
	$(".modal-backdrop").css("display","block");
	$('.modal-backdrop').removeClass('out');
	$('.modal-backdrop').addClass('in');
	$("#dd1").css("display","block");
	break; 
	}
	
	case "hide":
	{
	$("#dd1").css("display","none");
	$('.modal-backdrop').removeClass('in');
	$('.modal-backdrop').addClass('out');
	$(".modal-backdrop").css("display","none");
	
	break; 
	}
	
	}
};

presents_editing.toggle_templates_Box=function(state)
{
	switch(state)
	{
		
	case "show":
	{
	$(".modal-backdrop").click(function(){presents_editing.toggle_FinderWindow("hide");});
	$(".modal-backdrop").css("display","block");
	$('.modal-backdrop').removeClass('out');
	$('.modal-backdrop').addClass('in');
	//$("#dd1").css("display","block");
	break; 
	}
	
	case "hide":
	{
	//$("#dd1").css("display","none");
	$('.modal-backdrop').removeClass('in');
	$('.modal-backdrop').addClass('out');
	$(".modal-backdrop").css("display","none");
	
	break; 
	}
	
	}
};

presents_editing.edit_completePresentationSlide=function(decision)
{
			var document_company_no = $('#finder_document_company_no').val();
			var presentationId = $('#finder_presentationId').val();
			
	switch(decision)
	{
		case "save":
		{
			var sectionNo = $('#finder_sectionNo').val();
			var local_content_no = $('#finder_local_content_no').val();
			//alert($('#slide-0').get(0).id);
			var finalContent = top.frames['editPreviewed'].getFinalContent();
			
			var url = APP_ROOT+"presentations/update-from-wsw";
			var params = {};
			params.sectionNo=sectionNo;
			params.presentationId=presentationId;
			params.local_edit_no=local_content_no;
			params.document_company_no=document_company_no;
			params.editor_content = finalContent;
			
			$.post(url,params,function(data)
			{
				window.location = APP_ROOT+"presentations/all-slides/"+presentationId+"/"+document_company_no;
			});

			break;
		}
		
		case "cancel":
		{
			window.location = APP_ROOT+"presentations/all-slides/"+presentationId+"/"+document_company_no;
			break;
		}
		
		default:
		{
			window.location = APP_ROOT+"presentations/all-slides/"+presentationId+"/"+document_company_no;
		}
	}
};

presents_editing.ontemplate_chosen=function
(e,theItem,type,dir,presentationNo,document_company_no,pres_slide_no,templSlideNo)
{
	e.preventDefault();
	
	this.un_highlight_allClickedPresentation();
	
	$(theItem).parent().children().each(function(x,y)
	{
		if($(y).attr('class'))
		{
			var itemClass = $(y).attr('class');
			if(itemClass.indexOf('presentationBox_shader')>-1)
			{
				$(y).css('width','100%');
				$(y).css('height','100%');
			}
		}
	});
	
	
	
	
	switch(type)
	{
		
		case "slide":
		{
			this.templateTypeInput=type;
			this.doc_company_of_insert_slide = $(theItem).find('input[name=the_doc_company]').val();
			this.presentation_id_of_insert_slide = $(theItem).find('input[name=the_presenatationId]').val();
			
			break;
		}
		
		case "template":
		{
			this.templateTypeInput=type;
			break;
		}
		
		default:
		{
			//this.templateTypeInput=type;
			//$("#templ_slideNo").val(templSlideNo);
		}
	}
	
	
	
	
	//Assign variables here as they are asigned
	$("#templ_insertDir").val(dir);
	$("#templ_presentationNo").val(presentationNo);
	$("#templ_doc_company_no").val(document_company_no);
	$("#templ_present_slideNo").val(pres_slide_no);
	$("#templ_slideNo").val(templSlideNo);
};

presents_editing.go_insert_template=function()
{
	var templ_insertDir = $("#templ_insertDir").val();
	var templ_presentationNo = $("#templ_presentationNo").val();
	var templ_doc_company_no = $("#templ_doc_company_no").val();
	var templ_present_slideNo = $("#templ_present_slideNo").val();
	var templ_slideNo = $("#templ_slideNo").val();
	
	if(templ_slideNo!=""&&this.templateTypeInput=="template")
	{
		
		var url = APP_ROOT+"presentation/insert/"+
		templ_insertDir+"/"+templ_slideNo+"/"+templ_present_slideNo+"/"+
		templ_presentationNo+"/"+templ_doc_company_no+"/"+this.templateTypeInput;
		
		window.location = url;
	}
	
	if(this.templateTypeInput=="slide")
	{	
	
		var url = APP_ROOT+"presentation/insert/"+
		templ_insertDir+"/"+templ_slideNo+"/"+templ_present_slideNo+"/"+
		templ_presentationNo+"/"+templ_doc_company_no+"/"+this.templateTypeInput+"/"+this.doc_company_of_insert_slide+"/"+this.presentation_id_of_insert_slide;
		
		window.location = url;
		
	}
}

presents_editing.insert_presentation_description=function()
{
	var pendingDescriptionName = $('#presentation_description_set').val();
	var document_company_no = $('#document_company_no').val();
	var presentationId = $('#presentationId').val();
	
	if(pendingDescriptionName!="")
	{
		var updatePresentationMetaURL = APP_ROOT+"presentation/update-presentation-meta";
		$.post(updatePresentationMetaURL, 
		{
		type:"description",
		document_company_no:document_company_no,
		presentationId:presentationId,
		pendingDescriptionName:pendingDescriptionName
		}
		,function(data)
		{
			$("#presentation_short_desc").html(pendingDescriptionName);
			//alert(data);
		});
		
	}
};


presents_editing.shareForEditing=function(e,presentationNo,document_company_no)
{
	e.preventDefault();
	//alert(presentationNo+" "+document_company_no);
	presents_listing.action_share_selected_item(presentationNo, document_company_no,'single','shareToEdit');
};


presents_editing.show_EditInfoBox=function()
{
	if(parseInt(user_editInfo_warningMsg)&&(!this.info_msg_on_screen)&&(!this.permanently_disable_userMsg))
	{
		this.info_msg_on_screen=true;
	$('#editInfoInformation').css('display','block');
	$('#editInfoInformation').delay(1500).animate({opacity: 0,},300, function() 
	{
	$('#editInfoInformation').css('display','none');
	$('#editInfoInformation').css('opacity',1);
	presents_editing.info_msg_on_screen=false;
	});
	}
};




presents_editing.permanently_dismiss_infoBox=function(e)
{
	e.preventDefault();
	this.permanently_disable_userMsg=true;
		var url = APP_ROOT+"presentation/disable-info-box";
		$.post(url, {}
		,function(data)
		{
			
		});
};

function file_Selected(picUrl, data)
{
	var sectionNo = $('#finder_sectionNo').val();
	var adjusted_picUrl = picUrl.substr((picUrl.indexOf(SERVER_NAME)+SERVER_NAME.length)).
						  replace(APP_ROOT+PACKAGE_NAME+"/","../../");
						  
	
	//var txtboxContent = CKEDITOR.instances.editor1.getData();
	var local_content_no = $('#finder_local_content_no').val();
	presents_editing.toggle_FinderWindow("hide");
	top.frames['editPreviewed'].updateFrameImageContent(adjusted_picUrl,local_content_no);
	/*var sectionNo = $('#finder_sectionNo').val();
	var document_company_no = $('#finder_document_company_no').val();
	var presentationId = $('#finder_presentationId').val();
	var local_content_no = $('#finder_local_content_no').val();
	
	var url = APP_ROOT+"presentations/update-edit-pic/"+sectionNo+"/"+presentationId+"/"+document_company_no+"/"+local_content_no;
	
	$.get(url,{picUrl:picUrl},function(data)
	{
		window.location="";
	});*/
};