$(function(){
	slide();
	detail_hide();
	function slide(){
		var i = 0;
		var img_slide_list=new Array("img/2000-900-1.jpg","img/2000-900-2.jpg","img/2000-900-3.jpg");
		change_img();
		function change_img(){
			$('.slide_img').attr('src',img_slide_list[i]);
			 img_change_time = setTimeout(function(){
				next_pic();
				change_img();
			},2000)
		};
		$(".slide_img").mouseenter(function(){
			clearTimeout(img_change_time);
		});
		$(".slide_img").mouseout(function(){
			change_img();
		})
		$(".slide_btn_r").click(function (){
			  next_pic();
			  $('.slide_img').attr('src',img_slide_list[i]);
		});
		$(".slide_btn_l").click(function (){
			  pre_pic();
			  $('.slide_img').attr('src',img_slide_list[i]);
		});
		function next_pic(){
		    if(i == img_slide_list.length-1){
		    	i = 0;
		    }else{
		    	i++;
		    };
		};
		function pre_pic(){
		    if(i == 0){
		    	i = img_slide_list.length-1;
		    }else{
		    	i--;
		    };
			console.log(i);
		}
		
	};
	function detail_hide(){
	    $(".dis").hide();
	}
	$(".item").mouseover(function (){
		var cls = $(this).attr("class");
		var str = cls.split("");
		var index = cls[str.length-1];
	    show_detail(index);
	});
	$(".item").mouseout(function (){
		var cls = $(this).attr("class");
		var str = cls.split("");
		var index = cls[str.length-1];
	    hide_detail(index);
	});
	function show_detail(index){
	    var detail = ".dis"+ index;
		$(detail).show();
	};
	function hide_detail(index){
	    var detail = ".dis"+ index;
		$(detail).hide();
	};
	$(".dis").mouseover(function(){
	    $(this).show();
	});
	$(".dis").mouseout(function (){
		console.log(this);
	    $(this).hide();
	});
})