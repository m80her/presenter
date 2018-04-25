$(document).ready(function()
{
	
});

var slide_builder = {};

slide_builder.ckEditorId = null;

slide_builder.templateTypeInput = null;

slide_builder.doc_company_of_insert_slide = null;

slide_builder.presentation_id_of_insert_slide = null;

slide_builder.un_highlight_allClickedPresentation=function()
{
	$(".presentationBox_shader").each(function(x,y)
	{
		$(y).css('width','0%');
		$(y).css('height','0%');
	});
};

slide_builder.ontemplate_chosen=function
(e,theItem,templSlideNo,type)
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
			$("#templ_slideNo").val(templSlideNo);
			break;
		}
		
		default:
		{
			this.templateTypeInput=type;
			$("#templ_slideNo").val(templSlideNo);
		}
	}
	
};


slide_builder.go_insert_template=function()
{
	
	switch(this.templateTypeInput)
	{
		case "slide":
		{
			
			var url = APP_ROOT+"slide-builder/insert/"+this.templateTypeInput+"/"+
				this.presentation_id_of_insert_slide+"/"+this.doc_company_of_insert_slide;
				
				window.location = url;
				
			break;
		}
		
		case "template":
		{
			
			var templ_slideNo = $("#templ_slideNo").val();
	
			if(templ_slideNo!="")
			{
				
				var url = APP_ROOT+"slide-builder/insert/"+this.templateTypeInput+"/"+
				templ_slideNo;
				
				window.location = url;
			}
	
			break;
		}
		
	}
	
};

slide_builder.openEditorScreen=function (local_content_no,theContent)
{
	$('#finder_local_content_no').val(local_content_no);
	this.toggle_EditorWindow('show');
	
	if(slide_builder.ckEditorId==null){CKEDITOR.replace( 'editor1' );}
	else{CKEDITOR.instances.editor1.setData(theContent);}
	
	
	CKEDITOR.instances.editor1.on( 'instanceReady', function( e )
	{ 
	slide_builder.ckEditorId = CKEDITOR.instances.editor1.id;
	CKEDITOR.instances.editor1.setData(theContent);
	});
	
};

slide_builder.openImageEditorScreen=function(local_content_no,section,presentationId,doc_company)
{
	$('#finder_local_content_no').val(local_content_no);
	this.toggle_FinderWindow('show');
	//window.location = APP_ROOT+"filefinder/"+section+"/"+presentationId+"/"+doc_company+"/"+local_content_no;
};

slide_builder.displayEditorPreviewContent=function()
{
	var txtboxContent = CKEDITOR.instances.editor1.getData();
	var local_content_no = $('#finder_local_content_no').val();
	this.toggle_EditorWindow('hide');
	top.frames['editPreviewed'].updateFrameContent(txtboxContent,local_content_no);
};


slide_builder.toggle_EditorWindow=function(state)
{
	switch(state)
	{
		
	case "show":
	{
	$(".modal-backdrop").click(function(){slide_builder.toggle_EditorWindow("hide");});
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


slide_builder.toggle_FinderWindow=function(state)
{
	switch(state)
	{
		
	case "show":
	{
	$(".modal-backdrop").click(function(){slide_builder.toggle_FinderWindow("hide");});
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

slide_builder.edit_completePresentationSlide=function(decision)
{
			//var document_company_no = $('#finder_document_company_no').val();
			//var presentationId = $('#finder_presentationId').val();
			
	switch(decision)
	{
		case "save":
		{
			
			/*var sectionNo = $('#finder_sectionNo').val();
			var local_content_no = $('#finder_local_content_no').val();
			//alert($('#slide-0').get(0).id);
			*/
			var new_slide_name = $('#new_slide_name').val();
			var finalContent = top.frames['editPreviewed'].getFinalContent();
			
			var url = APP_ROOT+"presentations/slide-builder-save";
			var params = {};
			params.editor_content = finalContent;
			params.new_slide_name = new_slide_name;
			/*params.sectionNo=sectionNo;
			params.presentationId=presentationId;
			params.local_edit_no=local_content_no;
			params.document_company_no=document_company_no;
			*/
			
			$.post(url,params,function(data)
			{
				window.location = APP_ROOT+"presentations/my-presentations";
			});

			break;
		}
		
		case "cancel":
		{
			window.location = APP_ROOT+"slide-builder";
			break;
		}
		
		default:
		{
			//window.location = APP_ROOT+"presentations/all-slides/"+presentationId+"/"+document_company_no;
		}
	}
};

function file_Selected(picUrl, data)
{
	
	var sectionNo = $('#finder_sectionNo').val();
	var adjusted_picUrl = picUrl.substr((picUrl.indexOf(SERVER_NAME)+SERVER_NAME.length)).
						  replace(APP_ROOT+PACKAGE_NAME+"/","../../");
						  
	
	//var txtboxContent = CKEDITOR.instances.editor1.getData();
	var local_content_no = $('#finder_local_content_no').val();
	slide_builder.toggle_FinderWindow("hide");
	top.frames['editPreviewed'].updateFrameImageContent(adjusted_picUrl,local_content_no);
};