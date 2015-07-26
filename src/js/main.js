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

    var downloadLink = document.getElementById('download');
    addListener(downloadLink, 'click', function() {
        ga('send', 'event', 'button', 'click', 'captionify-download');
    });

    /**
     * Utility to wrap the different behaviors between W3C-compliant browsers
     * and IE when adding event handlers.
     *
     * @param {Object} element Object on which to attach the event listener.
     * @param {string} type A string representing the event type to listen for
     *     (e.g. load, click, etc.).
     * @param {function()} callback The function that receives the notification.
     */
    function addListener(element, type, callback) {
        if (element.addEventListener) element.addEventListener(type, callback);
        else if (element.attachEvent) element.attachEvent('on' + type, callback);
    }
}());