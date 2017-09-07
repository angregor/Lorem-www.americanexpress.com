    $('a').click(function() {
    var flag=false,flag1=false,omnVal;
    if($(this).attr('data-rmaction')!=undefined || $(this).attr('data-rmaction-layer')!=undefined){
	    if($(this).attr('data-rmaction')!=undefined){
	    	omnVal=$(this).attr('data-rmaction');
	    	flag=true;
	    }
	    else if($(this).attr('data-rmaction-layer')!=undefined){
	   		omnVal=$(this).attr('data-rmaction-layer');
	   		flag1=true;
	    }
        
        if (flag==true && omnVal != "") {
           (typeof($iTagTracker)=='function' )? $iTagTracker('rmaction',omnVal) : null;
        }
        else if(flag1==true && omnVal != ""){
        (typeof($iTagTracker)=='function' )? $iTagTracker('layertrack',omnVal) : null;
        }
	}
	});

