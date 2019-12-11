// Author: Matin Lotfaliei


// It calculates the height of the inner html part of the given tag
// It is useful when the tag has height=0 but its children have a height
function sumHeightOfChildren(tag) {
    var h = 0;
    tag.children().each(function () { h += $(this).outerHeight(true); });
    return h;
}

// It hides all lession contents after the h2
function hideAll() {
    $("h2").removeClass("visible");
    $("h2 + div").removeClass("visible");
    $("h2 + div").css("max-height", 0);
}

// It scrolls the page smoothly to the pixel given
function scrollToLocation(location) {
    $('html, body').animate({ scrollTop: location }, 1000);
}

// It scrolls the page smoothly to the tag given
function scrollToTag(tag) {
    var clickedLocation = tag.offset().top - 20;

    //if there is an h2 already open before the given tag, 
    //you must calculate its height as it is closing
    var visibleContent = $(".content.visible");
    if (visibleContent.length && visibleContent.offset().top < clickedLocation) {
        var visibleHeight = visibleContent.outerHeight(true);
        var scrollLocation = clickedLocation - visibleHeight;
        scrollToLocation(scrollLocation);
    }
    else
        scrollToLocation(clickedLocation);
}

// Instructions for the time an h2 or an anchor with #id is clicked
function headerClicked(tag) {
    scrollToTag(tag);
    hideAll();
    tag.addClass("visible"); //just used for highlighting the open h2
    tag.next().addClass("visible");
    tag.next().css("max-height", sumHeightOfChildren(tag.next()));
}

$(document).ready(function () {
    $("h2 + div").addClass("content"); //I tried not to touch any part of the lesson html contents that I copied from bcitcomp.ca
    hideAll();

    $("h2").click(function () {
        headerClicked($(this));
    });

    // for the time an anchor with #id is clicked
    $('a[href^="#"]').click(function (e) {
        var id = $(this).attr('href');  // which tag is requested?
        headerClicked($(id));
        e.preventDefault();
    });
});