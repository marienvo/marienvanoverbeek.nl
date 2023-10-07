jQuery(document).ready(function(){
	/* ---------------------------------------------------------------------- */
	/*	Custom Functions
	/* ---------------------------------------------------------------------- */
    // Needed variables
    var $content 		= $("#content");
    $content.show();

    /*
     * Same page anchor scrollers
     * */
    $("body").on('click', 'a[data-link="onpage"]', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr("href")).offset().top+1
        }, 800);
    });


	/* ---------------------------------------------------------------------- */
	/*	NON AJAX
	/* ---------------------------------------------------------------------- */

	// Rating bars
	$(".skills li .rating").each(function(index,e) {

		// Vars
		var
			$ratNum = 7,
			$rat = $(e).attr("data-rat"),
			$point = "<span></span>";

		// Append points
		while($ratNum > 0){
		     $(e).append($point);
		     $ratNum--;
		}

		$(e).find("span").each(function(index,e) {
			if(index >= $rat) return false;
			// Append Disabled Rats
			$(e).animate({
			    opacity: 1
			  });
		});

    });

    // Home
    function highlight( items ) {
        items.filter(":eq(1)").addClass("active");
    }
    function unhighlight( items ) {
        items.removeClass("active");
    }
    var carousel_home_logos = $('#carousel_home_logos');
    var carousel_projecten = $('#projecten');
    carousel_home_logos.carouFredSel({
        auto: false,
        responsive: true,
        circular: true,
        infinite: true,
        width: "100%",
        align: "left",
        items: {
            start: ".logo_5",
            visible: {
                min: 4,
                max: 4
            },
            width: 245
        },
        direction: "left",
        scroll: {
            items: 1,
            easing: "linear",
            duration: 350,
            pauseOnHover: true,
            onBefore: function( data ) {
                unhighlight( data.items.old );
                highlight( data.items.visible );
            }
        },
        synchronise: ["#projecten", false, true, 0]
    });
    $('#carousel_home_logos .carousel_item_logo').on('click', function() {
        $('#carousel_home_logos').trigger('slideTo', [$(this), -1]);
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $("#projecten").offset().top+1
        }, 800);

    });
    carousel_projecten.hover(function(){
        $('#carousel_home_logos').trigger('stop');
    }, function(){
        $('#carousel_home_logos').trigger('play',true);
    });
    $('.button-holder').hover(function(){
        $('.big-macbook-air').addClass('bg-hover');
    }, function(){
        $('.big-macbook-air').removeClass('bg-hover');
    });
    carousel_projecten.carouFredSel({
        auto: 12000,
        prev : "#project_prev",
        next : "#project_next",
        responsive: true,
        circular: true,
        infinite: true,
        align: "left",
        width: "100%",
        height:"variable",
        items: {
            visible: {
                min: 1,
                max: 1
            },
            width: 245,
            height:"variable"
        },
        scroll: {
            fx : "crossfade",
            items: 1,
            easing: "linear",
            duration: 350,
            pauseOnHover: true,
            onBefore: function( data ) {
                var color = $(data.items.visible[0]).attr("data-color");
                $("#home-text").css({"background-color":color});
            }
        },
        synchronise: ["#carousel_home_logos", false, true, 0]
    });


});