# &lt;html-include&gt;


**&lt;html-include&gt;** is a very simple Web Component for including the raw content of an HTML file.

Whatever content you load with it, it will replace the `html-include` **outer html**.

## Demo

Check a demo here: http://chris-l.github.io/html-include/

## Installation

You can just copy the `dist/html-include.min.js` file somewhere onto your server, or you can use bower:

```bash
bower install --save html-include
```

## Usage

First, make sure you have the webcomponent's polyfill:

```html
<script>
  if ('registerElement' in document
    && 'createShadowRoot' in HTMLElement.prototype
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    // We're using a browser with native WC support!
  } else {
    document.write('<script src="https:\/\/cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.5/webcomponents.min.js"><\/script>')
  }
</script>
```

Then you can choose to either include the HTML, like a regular web component:

```html
<link rel="import" href="html-include.html">
```

Or actually, you can just include the script:

```html
<script src="html-include.min.js"></script>
```

(just do one of the two, don't do both)

After that you can use it like this:

```html
<html-include src="header.html"></html-include>
```

Whatever content `header.html` has, it will replace the actual `html-include` tag in the DOM.

If the file in the `src` can't be read, then it will be replaced by an empty string.

It will load the content using a **sync** `XMLHttpRequest`, so the `DOMContentLoaded` event will see the composed html.

## License

[MIT License](http://opensource.org/licenses/MIT)
