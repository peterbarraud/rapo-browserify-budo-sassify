# Browserify with Budo & sassify
Alright. So we have a base template ([browserify-budo](https://github.com/peterbarraud/rapo-browserify-budo)), and a very convenient  [browserify-css](https://github.com/cheton/browserify-css). So let's get to using [SASS](http://sass-lang.com) in our Rapo projects. And for that, we use the [SASSIFY](https://github.com/cody-greene/sassify) browserify transform.

## How this works
Pretty straightforward:
- Local stylesheets: You include your local SASS / SCSS files in the `index.js`.
- External SASS-based libs: You include any external libs in the `index.js`.

## External libs
I've tried [bulma](https://bulma.io) and all it takes in a `required('bulma')` statement in your `index.js`. After that you're going to have to set the sassify tranform in the `package.json` with the -g (for global) flag to pick up libs from anywhere in the node_modules for.

**Note**: Bulma works just fine with a simple require('bulma') statement. You're going to have to check how to include any other libs that you use. 

## Get going
1. Clone this repo
2. `cd` into the cloned dir
3. Run `npm install` to get the dependencies
4. Run `npm start` to launch the project in your default browser running on a local (`Node`-based) web server with `livereload` - all setup.

That's it.

## Building the project for deployment
This is split into two parts
* `build.js`: Builds the `JS` and `CSS` outputs
* `html-dist.config`: Uses [html-dist](https://www.npmjs.com/package/html-dist) to inject the CSS into the HTML

Then generate build:
```
npm run build
```
*IMPORTANT*: The buildCSS function requires a new function be added to sassify.

So you're going to have to copy (and overwrite) `sassify/index.js` to `node_modules/sassify/lib`
```
cp sassify/index.js node_modules/sassify/lib
```
### Testing the build
If you want to check the build - Just to make sure:
```
npm run testbuild
```
This runs `budo` on the build