(function () {
    'use strict';
    var ex1 = new Captionify({
        imgClassSelector: "caption"
    });

    var ex2 = new Captionify({
        imgClassSelector: "data-caption",
        dataCaption: true
    });

    var ex3 = new Captionify({
        imgClassSelector: "bottom-caption",
        mode: "bottom"
    });
}());