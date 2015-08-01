# Captionify

Captionify is a non-jQuery semantic image caption generator library.


## Basic Usage

1. Download Captionify from GitHub or install with Bower - `bower install captionify`.
2. Add Captionify JS and CSS files to `<head>`

    ```html
    <link rel="stylesheet" href="path_to_css/captionify.min.css">
    <script src="path_to_js/captionify.min.js"></script>
    ```

3. Initiate Captionify like so:
    
    ```js
    <script>
        document.addEventListener("DOMContentLoaded", function(event) {
            var imageCaptions = new Captionify();
        });
    </script>
    ```

This will launch Captionify with the default settings. Captionify will caption all images contained in the `<body>` tag. It will use images' `alt` attribute as caption text. It will also wrap all images with text in their `alt` attribute in an HTML5 `<figure>` tag and put the caption in a `<figcaption>` tag.


## Further usage examples

The example below modifies some of the default options:

```js
var imageCaptions = new Captionify({
    containerSelector: ".pageContent",
    figureClass: "image",
    figcaptionClass: "imageCaption",
    imgClassSelector: "caption"
});
```

The above example will caption all images with a class of `caption` contained in an element with a `pageContent` class. It also changes the default `<figure>` and `<figcaption>` tag classes.

---------------------------------------

```js
var imageCaptions = new Captionify({
    containerSelector: "article",
    dataCaption: "true"
});
```

In this example all images in `<article>` are selected. Captionify will used the `data-caption` attribute text for captions instead of the default `alt` attribute.

---------------------------------------

```js
var imageCaptions = new Captionify({
    containerSelector: "article",
    dataCaption: "true",
    mode: "bottom"
});
```
In this example the caption will be placed below the image instead of being overlayed on top of the image if the standard Captionify CSS file is included on your page.


### Hyperlinked captions

To create a hyperlinked caption specify a `data-link` attribute on an image like so:

```html
<img src="example.jpg" data-link="http://www.example.org/some-page" alt="Example image" />
```


## Options

```js
var imageCaptions = new Captionify({
    containerSelector: "body", // pass in a tag (like article), a class ( like .content) or id (like #images)
    dataCaption: false, // set to true if you would like to use a 'data-caption' attribute for captions instead of the default 'alt' attribute
    figureClass: "imgFigure", // default class for the <figure> tag
    figcaptionClass: "imgFigure__caption", // default class for the <figcaption> tag
    imgClassSelector: "", // pass in a class name of images which you would like to caption
    inheritStyles: true, // <figure> tag will inherit any direct styling (i.e., inline CSS) of its contained <img>. Set to false to disable this behaviour
    mode: "overlay", // overlay | bottom
    setFigureWidth: true // sets the container width to the image width if it contains an explicit width attribute. Set to false to disable this behaviour
});
```


## Styling

Captionify does not inject any styling (actually, it does in some cases. If your images have an explicitly stated width attribute or inline CSS, the containing `figure` tag will get this styling and styling for the `<img>` will be removed. This behavior can be disabled through options). All styling should be done with CSS using the classes assigned to `<figure>` and `<figcaption>` tags (`imgFigure` and `imgFigure__caption` by default). CSS file with some base styling is provided with Captionify. Feel free to modify it as you wish to suit your needs :)

Captionify also works well in conjunction with the [captionss](http://www.captionss.com) package for hassle-free caption styling. If you choose to use captionss, replace the Captionify CSS file with the captionss CSS file. Once that is done you can pass in an appropriate class name for a `<figure>` tag (as specified by captionss documentation) like so:

```js
var imageCaptions = new Captionify({
    containerSelector: ".myContainer",
    figureClass: "embed hide-smooth dark"
});
```

The above example should leave you with some nicely styled animated captions. See captionss [website](http://www.captionss.com) for more info.


## Browser support

Tested in:

* Chrome 17+
* Firefox 4.0+
* Opera 11.6+
* Safari 5.1+
* IE9+
* iOS 6+
* Android 4.2+
* Windows Phone 8.1
