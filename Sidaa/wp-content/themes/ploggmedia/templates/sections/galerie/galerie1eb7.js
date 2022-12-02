//==========================================================================
// Gutenberg Custom Slider
//==========================================================================

var run;
var timeoutSlider;
var intervals = [];

startSlider();

function startSlider() {
    $('.gallery.is-slider').each(function (index) {
        // Trouover tout les sliders et le nombres d'images de ceux-ci
        var slider = $(this);
        var nbr_ele = slider.find(".gallery_item").length;

        // Afficher la première image du slider
        slider.find(".gallery_item").eq(0).addClass('show');

        // Partir les sliders
        interval = setInterval(function () { runSlider(slider, nbr_ele); }, 5000);
        intervals.push(interval);
        run = true;
    });
}

function restartSlider() {
	intervals.forEach(clearInterval);
	 $('.gallery.is-slider').each(function (index) {
		// Trouover tout les sliders et le nombres d'images de ceux-ci
        var slider = $(this);
        var nbr_ele = slider.find(".gallery_item").length;
       
        // Partir les sliders
        interval = setInterval(function () { runSlider(slider, nbr_ele); }, 5000);
        intervals.push(interval);
        run = true;
	 });
}

function runSlider(slider, nbr_ele) {
    if (run) {
        nextImage(slider, nbr_ele);
    }
}

function prevImage(slider, nbr_ele) {
    // Trouver l'emplacement de la dernière image affichée
    var index = slider.find(".gallery_item.show").index();

    index--;
    if (index < 0) {
        index = nbr_ele - 1;
    }

    // Afficher l'image précédente
    slider.find(".gallery_item").removeClass('show');
    slider.find(".gallery_item").eq(index).addClass('show');

    // Ajuster les points
    slider.find(".points-wrapper .point").removeClass('active');
    slider.find(".points-wrapper .point").eq(index).addClass('active');
}

function nextImage(slider, nbr_ele) {
    // Trouver l'emplacement de la dernière image affichée
    var index = slider.find(".gallery_item.show").index();
    
    index++;
    if (index >= nbr_ele) {
        index = 0;
    }

    // Afficher la prochaine image
    slider.find(".gallery_item").removeClass('show');
    slider.find(".gallery_item").eq(index).addClass('show');

    // Ajuster les points
    slider.find(".points-wrapper .point").removeClass('active');
    slider.find(".points-wrapper .point").eq(index).addClass('active');
    
    // Ajuster les points
    slider.prev(".points-wrapper .point").removeClass('active');
    slider.prev(".points-wrapper .point").eq(index).addClass('active');
    
}

// Slider avec flèches
$(".gallery .arrows-wrapper .prev").click(function () {
	
	var slider = $(this).parent().parent();

    // Stopper le slider et le repartir
	restartSlider();
	
    // Afficher l'image précédente
    var nbr_ele = slider.find(".gallery_item").length;
    prevImage(slider, nbr_ele);

});

$(".gallery .arrows-wrapper .next").click(function () {
	
	var slider = $(this).parent().parent();

    // Stopper le slider et le repartir
	restartSlider();
	
    // Afficher la prochaine image
    var nbr_ele = slider.find(".gallery_item").length;
    nextImage(slider, nbr_ele);

});

$(".gallery .points-wrapper .point").click(function () {
	
	var slider = $(this).parent().parent();
	
	// Stopper le slider et le repartir
	restartSlider();

    // Vérifier quelle image afficher
    var index = $(this).data("index");
    
    // Afficher l'image
    slider.find(".gallery_item").removeClass('show');
    slider.find(".gallery_item").eq(index).addClass('show');

    // Ajuster les points
    slider.find(".points-wrapper .point").removeClass('active');
    slider.find(".points-wrapper .point").eq(index).addClass('active');

});