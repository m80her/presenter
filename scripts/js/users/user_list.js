$(document).ready(function()
{
	
});

var user_list = {};

user_list.kd=function(e)
{
	this.iskeyDown = true;
	/*var c = String.fromCharCode(e.which)
	alert(c);*/
};

user_list.ku=function(e)
{
	this.iskeyDown = false;
	if(!this.iskeyDown)
	{
		this.generate_search_list($("#user_searchBox").val());
	}
};

user_list.generate_search_list=function(share_VALUE)
{
	//if(share_VALUE!="")
	//{
	this.getSearchSuggestion(share_VALUE);
	//}//else{$("#presentation_campany").html(""); $("#autoComplete_companyHolder").css("display","none");}
};

user_list.getSearchSuggestion=function(str)
{
	$.post(APP_ROOT+'users/user-search-results', {data_str:str},function(data)
	{
		
		var user_can_edit = $("#user_can_edit").val();
		var user_can_delete = $("#user_can_delete").val();
		var user_role = $("#user_role").val();
		var user_hash_id = $("#user_hash_id").val();
		  //this is the result coming back from db
		  $("#users_list_area").html("");
		  var data_obj = $.parseJSON(data);
		  var content = "";
		  $(data_obj).each(function(x,y)
		  {
			
if(user_can_edit && (y.added_by==user_hash_id||user_role!="author"))
{editButton = '<a class="btn btn-mini" href="users/edit/'+y.id+'">edit</a>';}
else{editButton = "";}

if(user_can_delete && (y.added_by==user_hash_id||user_role!="author"))
{deleteButton = '<a class="btn btn-mini btn-danger" href="users/delete/'+y.id+'">delete</a>';}
else{deleteButton = "";}

content += '<tr>'+
'<td>'+
'<img alt="photo" src="'+APP_ROOT+PACKAGE_NAME+'/images/img/icon-user.png">'+
'</td>'+
'<td>'+y.first_name+' '+y.last_name+'</td>'+
'<td><a href="mailto:'+y.email+'">'+y.email+'</a></td>'+
'<td>'+y.role+'</td>'+
'<td>'+y.company+'</td>'+
'<td>'+
editButton+' '+deleteButton+
'</td>'+
'</tr>';

		  });
		  $("#users_list_area").append(content);
	});
};