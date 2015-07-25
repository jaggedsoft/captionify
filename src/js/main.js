(function () {
    'use strict';
    var ex2 = new Captionify({
        imgClassSelector: "caption"
    });

    var ex3 = new Captionify({
        imgClassSelector: "data-caption",
        dataCaption: true
    });

    var ex6 = new Captionify({
        imgClassSelector: "bottom-caption",
        mode: "bottom"
    });
}());