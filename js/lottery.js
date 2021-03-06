jQuery(document).ready(function(){
	jQuery("#lottery-button").click(function() {
	jQuery(".eu-slot").remove();
	jQuery("#eu-lottery .wrapper").css({'margin-top' : '0'});

        var data = {action: 'eu_action'};

	jQuery.ajax({
		type:"POST",
		data: data ,
		url: euadminAjaxUrl,
		dataType:"JSON",
		success: function(jsondata){

		console.log(jsondata);
	
			var opts = jsondata;
			var numbers = Object.keys(jsondata).length;
			 jQuery.each(jsondata, function (i, value) {
				opts[i]=value;
			 });
			for(var i = 0; i < numbers; i++){
				addSlots(jQuery("#slots_"+ i +" .wrapper"),i);
				moveSlots(jQuery("#slots_"+ i +" .wrapper"));
			}
			function addSlots(jqo,s){
			console.log(opts[s]);
				for(var d = 0; d < 5; d++){
					jqo.append("<div class='eu-slot'>"+opts[s][d]+"</div>");
				}
			} 
			function moveSlots(jqo){
				var time = 2500;
				time += Math.round(Math.random()*200);
				jqo.stop(false, true) ;
				var marginTopEnd = -parseInt(jqo.height()) + jqo.find('.eu-slot').height();
				jqo.animate(
					{"margin-top":marginTopEnd+"px"},
					{'duration' : time, 'easing' : "easeOutElastic"});
			}
		}
	});
	});
});