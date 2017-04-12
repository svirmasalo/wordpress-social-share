# Wordpress social share
Hate using plugins to create those social sharing buttons? Me too. Append this into your theme and be free.

## Demo
You check the demo from [here](http://svirmasalo.fi/code/wordpress-social-share/demo "WordPress Social Share")

## Usage
- Download or clone repository to the folder structure you are working on
- Include wpss.js OR wpss.legacy.js to your html
- Append elements into your document by inserting following line at the end of your document: `formLinks('<element>','<source>');`
-- <element> ie. 'body' & <source> either 'fa' for font awesome or 'local'
- Style with css or JavaScript

### Notes for usage
- wpss.legacy.js is Babelified version of wpss.js. Wpss.js is using ES6 syntax which is not supported by some older browsers. Use with caution.

## Disclaimer
Basically this is not limited to WordPress, but it's designed to work well if you are using Yoast SEO-plugin. Why? Because it genereates those meta tags automatically. If you wish to use this code from a project that does not include Yoast SEO -plugin or even WordPress, just write similar meta tags to head that you can find from demo. 

### Release notes (v.1.0.0)
- Twitter, Facebook, Linkedin and Pinterest sharing available
- Error handling 
- Version 1.0.0 woo-hooo!


