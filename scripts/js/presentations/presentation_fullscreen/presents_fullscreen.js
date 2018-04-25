window.onload=function()
{
	presents_fullscreen.initiate();
}

presents_fullscreen.initiate=function()
{
	
	$(document).keydown( function(e) 
	{
		e.preventDefault();
		if (e.which == 27) { presents_fullscreen.escapeFullScreen(); } 
	});

};

presents_fullscreen.escapeFullScreen=function()
{
	var browserLocation = document.location.href;
	if(browserLocation.indexOf('play-fullscreen')>-1)
	{
		window.location=APP_ROOT+'presentations/play-presentation/'+pres_no+'/'+doc_company_id+'/'+parent_id;
	}
};