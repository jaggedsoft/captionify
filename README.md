# Captionify

Captionify is non-jQuery semantic image caption generator library.


## Usage

Using Captionfiy can be as simple as:

```js
window.onload = function(){
    var imageCaptions = new Captionify();
}
```

This will launch Captionify with the default settings. Captionify will caption all images contained in the `<body>` tag. It will use images' `alt` attribute as caption text. It will also wrap all images with text in their `alt` attribute in an HTML5 `<figure>` tag and put the caption in a `<figcaption>` tag. The example below modifies some of the default options:

```js
window.onload = function(){
    var imageCaptions = new Captionify({
        containerSelector: ".pageContent",
        figureClass: "image",
        figcaptionClass: "imageCaption",
        imgClassSelector: "caption"
    });
}
```

The above example will caption all images with a class of `caption` contained in an element with a `pageContent` class. It also changes the default `<figure>` and `<figcaption>` tag classes.

```js
window.onload = function(){
    var imageCaptions = new Captionify({
        containerSelector: "article",
        dataCaption: "true"
    });
}
```

In this example all images in `<article>` are selected. Captionify will used the `data-caption` attribute text for captions instead of the default `alt` attribute.


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
    inheritStyles: true, // <figure> tag will inherit any direct styling Ii.e., inline CSS) of its contained <img>. Set to false to disable this behaviour
    mode: "overlay", // overlay | bottom
    setFigureWidth: true // set to false if you have an explicitly stated width attribute on your images (in px) and you do not want the <figure> tag to inherit this width
});
```


## Styling

Captionify does not inject any styling (actually, it does in some cases. If your images have an explicitly stated width attribute or inline CSS, the containing `figure` tag will get this styling and styling for the `<img>` will be removed. This behavior can be disabled through options). All styling should be done with CSS using the classes assigned to `<figure>` and `<figcaption>` tags (`imgFigure` and `imgFigure__caption` by default). CSS file with some base styling are provided with Captionify. Feel free to modify them as you wish to suit your needs :)


## Browser support

Tested in:

* Chrome 14+
* Firefox 3+
* Opera 10.6+
* Safari 4+
* IE9+
* iOS 3+
* Android 2.3+
