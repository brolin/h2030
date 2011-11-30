$.widget("ui.Timeline", {
    _init: function() {
	this._getTimelines();
    },
    _getTimelines: function() {
	$.get('/timelines', function(data) {
	    var count= 0;
	    data.forEach(function(t) {
		count++;
		var $layout= $(".timeline-item.layout").clone();
		$layout.removeClass("layout");
		$layout.find(".name").text(t.name);
		$layout.addClass("item-"+count);
		$(".timelines-list ul").append($layout.show());
	    });
	});
    }
});

$.widget("ui.Control", {
    _init: function() {
	var $el= this.element;
	$el.draggable({
	    containment: 'parent',
	    drag: function(e, ui) {
		$(".timelines-list").scrollLeft(ui.position.left);
	    }
	});
    }
});


$(function() {
    $(".timelines-list").Timeline();
    $(".span-control").Control();
});

/* Fancy box code */

$(document).ready(function() {

    /* This is basic - uses default settings */
    
    $("a#single_image").fancybox();
    
    /* Using custom settings */
    
    $("a#inline").fancybox({
	'hideOnContentClick': true
    });

    /* Apply fancybox to multiple items */
    $("a.grouped_elements").fancybox({
	'transitionIn':'elastic',
	'transitionOut':'elastic',
	'speedIn':600, 
	'speedOut':200, 
	'overlayShow':false
    });
    
});