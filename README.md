# &lt;html-include&gt;


**&lt;html-include&gt;** is a very simple Web Component for including the raw content of an HTML file.

It's somewhat similar to doing a [PHP include](http://php.net/manual/en/function.include.php) for a plain html file (looks familiar? `<?php include('header.html'); ?>`), but on the browser side.

It looks like this:

```html
<html-include src="header.html"></html-include>
```

Whatever content you load with it, it will replace the `<html-include>`'s **outerHTML**.

This is a plain JavaScript component and it has no dependencies.

## Demo

Check a demo here: http://chris-l.github.io/html-include/

## Performance

Actually, perhaps you would get better performance by just having everything on your main html and not using this. ;)

Using &lt;html-include&gt; means it will make an extra request for each file it loads.

But, if you are not expecting certain files to change, you can configure your server cache control for those files to improve performance and reduce requests.

If it's an option, try to use server-side includes instead. (For static sites, you could use a preprocessor, like [jekyll](http://jekyllrb.com/) or [harpjs](http://harpjs.com/))

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

Do it immediately after the webcomponents polyfill, and before any other scripts. (So it can capture the `DOMContentLoaded` event)

After that you can use it like this:

```html
<html-include src="header.html"></html-include>
```

Whatever content `header.html` has, it will replace the actual `html-include` tag in the DOM.

If the file in the `src` can't be read, then it will be replaced by an empty string.

It will load the content using a `XMLHttpRequest`, and prevent emitting the `DOMContentLoaded` event (and the `window load` event) until all the `html-include` elements (with the src attribute) on the DOM are resolved.
At that moment, a `DOMContentLoaded` event will be emitted, and it will see the fully composed html.

## Options

Attribute      | Options     | Default      | Description
---            | ---         | ---          | ---
`src`          | *string*    | `''`         | Name of the file to be included.
`prevent-cache`| *boolean*   | false        | Add a random string as query parameter to the `src` file, to prevent cache.

## License

[MIT License](http://opensource.org/licenses/MIT)
