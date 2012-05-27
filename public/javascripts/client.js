$.widget("ui.Timeline", {
    _init: function() {
	this._getTimelines();
    },
    _getTimelines: function() {
	$.get('/timelines', function(data) {
/* Estructura de datos en JSON
   nombre
   anio
   antecedentes
   sintesis
   Or
   Ab
   Oc
   Dp
*/
	    var count= 0;
	    data.forEach(function(t) {
		// console.log(t);
		count++;
		var $layout= $(".timeline-item.layout").clone();
		$layout.removeClass("layout");
		$layout.find(".name").text(t.nombre);
		// Tengo que poner una serie de elementos <p> que correspondan con cada elemento de los antecedentes t.anio???</p>
		$layout.addClass("item-"+count);
		$(".timelines-list ul").append($layout.show());
		t.anio.forEach(function(y,cnt) { 
		    var $evento= $("li.timeline-item.item-"+count);
		    // console.log("Antecende: "+cnt+" "+t.antecedentes[cnt]);
// como meter datos escondidos para pasarlos al recuadro cuando hagan click
		    $evento.append("<div class=\"event\" id=\"box-"
				   +count+"-"+cnt+"\" title=\""+t.antecedentes[cnt]+"\">"+y+"<br>"
				 //  +t.antecedentes[cnt]+"<br>"
				   +"<span style=\"display: none\"><p class=\"anio\">"+t.anio[cnt]+"</p>"
				   +"<p class=\"antecedentes\">"+t.antecedentes[cnt]+"</p>"
				   +"<p class=\"sintesis\">"+t.sintesis[cnt]+"</p>"
				   +"<br><p><b>Alcance territorial</b></p>"
				   +"<p class=\"dptal\">Dep: <b>"+t.Dp[cnt]
				   +"</b></p><p class=\"oriente\"> Ori: <b>"+t.Or[cnt]
				   +"</b></p><p class=\"occidente\"> Occi: <b>"+t.Oc[cnt]
				   +"</b></p><p class=\"aburra\"> Abu: <b>"+t.Ab[cnt]
				   +"</b></p></div>");
		    // Problemas con el width (Límite 6000px -> Pillar interactivos.marginalia)
		});
	    });
	});
    }
});

$.widget("ui.Control", {
    _init: function() {
	var $el= this.element;
	$el.draggable({
	    axis: 'x',
	    containment: 'parent',
	    drag: function(e, ui) {
		$(".timelines-list").scrollLeft(ui.position.left);
	    }
	});
    }
});

$.widget("ui.DialogBox",{
    _init: function() {
	this._setDialog();
//	console.log(this);
    },
    _setDialog: function(){
	var $el= this.element;
//	console.log($el);
	$el.bind('click',function(){
//	    console.log("clicked");
	    var $dialog = $('<div></div>')
		.html($(this).find("span").html())
		.dialog({
		    autoOpen: true,
		});
 	});	
    }
});


$(function() {
    $(".timelines-list").Timeline();
    $(".span-control").Control();
    var t=setTimeout("$(\".event\").DialogBox()",1000);
});

$(function() {
    $( "#accordion" ).accordion({
	collapsible: true,
	active: false,
        fillspace: true,
        autoheight: false,
        navigation: true,
        clearStyle: true 
    });
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

