Usage scenarios
===================
- no options specified
    * Should select all images in the `body` tag and add captions based on their `alt` attribute.
        - If no `alt` attribute is present in the image, it is ignored
    * `imgFigure` and `imgFigure__caption` classes are added to `figure` and `figcaption` tags respectively
- `containerSelector` specified
    * Should select all images in a specified container
    * The rest is the same as in the above scenario
- `imgClassSelector` specified
    * Should select all images with the specified class
    * The rest is the same as in the first scenario
- `containerSelector` and `imgClassSelector` specified
    * Should select all images in the specified container with the specified class
    * The rest is the same as in the first scenario
- `data-caption: true` is passed in
    * Should add captions to all images with a `data-caption` attribute specified
        - If no `data-caption` attribute is present, image is ignored
- `data-link` attribute is added to an image
    * Should include a link in a `figcaption` tag
- `figureClass` and/or `figcaptionClass` option(s) passed in
    * Should modify the default classes for the respective tags

