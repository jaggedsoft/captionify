/*!
 * captionify | semantic image caption generator library in pure JS
 *
 * Copyright 2015, Umar Bolatov
 * Released under the MIT license
 *
 * v0.1.0
 * Date: 2015-07-05
 */
(function (window) {
    "use strict";

    function Captionify(options) {
        // Default options
        var defaults = {
            containerSelector: "body",
            dataCaption: false,
            figureClass: "imgFigure",
            figcaptionClass: "imgFigure__caption",
            imgClassSelector: "",
            mode: "overlay",
            inheritStyles: true,
            setFigureWidth: true
        };

        // Set user options
        this.options = options = _extend({}, defaults, options);

        this._init();
    }

    Captionify.prototype = {
        _init: function() {
            var options = this.options,
                captionClass = options.figcaptionClass,
                captionText = "",
                containerEl,
                containerStr = options.containerSelector,
                dataCaption = options.dataCaption,
                dataLink = "",
                figureClass = options.figureClass,
                images,
                imgClassSelector = options.imgClassSelector,
                inheritStyles = options.inheritStyles,
                link = "",
                mode = options.mode,
                setFigureWidth = options.setFigureWidth;

            // Get the container(s) with images
            containerEl = _getContainer(containerStr);

            if (containerEl.length > 0) {
                // Extract images out of container(s)
                images  = _getImages(containerEl, imgClassSelector);

                if (images.length > 0) {
                    images.forEach(function(element, index, array) {
                        // Reset
                        link = "";

                        // Get the caption text
                        captionText = dataCaption ? _getAttribute(element, "data-caption") : element.alt;

                        // Get the link url
                        dataLink = _getAttribute(element, "data-link");

                        if (captionText && captionText.length > 0) {
                            var captionContainer = document.createElement("figcaption"),
                                figure = document.createElement("figure");

                            // Create a link for those images that have it
                            if (dataLink && dataLink.length > 0) {
                                link = document.createElement("a");
                                link.href = dataLink;
                                link.textContent = captionText;
                            }

                            // Set figure and figcaption class names
                            figure.className = figureClass;

                            // Append additional modifier class if 'bottom' caption mode is selected
                            if (mode && mode === "bottom") {
                                var captionClassBottom = captionClass + " " + captionClass + "--" + "bottom";
                                captionContainer.className = captionClassBottom;
                            } else {
                                captionContainer.className = captionClass;
                            }

                            // Set width of a <figure> if image has an explicit width attribtue
                            if (setFigureWidth) {
                                figure = _setFigureWidth(element, figure);
                                element.removeAttribute("width");
                            }

                            // <figure> inherits direct image styles if option is true
                            if (inheritStyles) {
                                var styles = _getAttribute(element, "style");

                                if (styles) {
                                    element.removeAttribute("style");
                                    figure.setAttribute("style", styles);
                                }
                            }

                            // Wrap image with a figure tag
                            _wrap(figure, element);

                            if (link) {
                                // Set the figcaption HTML
                                captionContainer.appendChild(link);
                            } else {
                                // Set the figcaption text
                                captionContainer.textContent = captionText;
                            }

                            // Insert figcaption after the image
                            _insertAfter(captionContainer, element);
                        }
                    });
                }
            }
        }
    };

    function _extend(dst, src) {
        if (src) {
            Object.keys(src).forEach(function(key){
                dst[key] = src[key];
            });
        }

        return dst;
    }

    function _getAttribute(element, attribute) {

        return element.getAttribute(attribute) || false;

    }

    function _getContainer(containerStr) {

        return document.querySelectorAll(containerStr);

    }

    function _getImages(containerEl, imgClass) {
        var selector = "img";

        return Array.prototype.map.call(containerEl, function(container){
            if (imgClass) {
                selector += '.' + imgClass;
            }
            return container.querySelectorAll(selector);
        });

    }

    function _insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function _setFigureWidth(element, figure) {
        var imgWidth = _getAttribute(element, "width");

        if (imgWidth && imgWidth.substr(imgWidth.length-2) === "px") {
            figure.style.width = imgWidth;
        }

        return figure;
    }

    // adapted from http://stackoverflow.com/a/13169465
    function _wrap(container, elms) {
        // Convert `elms` to an array, if necessary.
        if (!elms.length) elms = [elms];

        // Loops backwards to prevent having to clone the wrapper on the
        // first element (see `child` below).
        for (var i = elms.length - 1; i >= 0; i--) {
            var child = (i > 0) ? container.cloneNode(true) : container;
            var el    = elms[i];

            // Cache the current parent and sibling.
            var parent  = el.parentNode;
            var sibling = el.nextSibling;

            // Wrap the element (is automatically removed from its current parent).
            child.appendChild(el);

            // If the element had a sibling, insert the wrapper before
            // the sibling to maintain the HTML structure; otherwise, just
            // append it to the parent.
            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        }
    }

    window.Captionify = Captionify;
})(window);

