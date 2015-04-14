# Sudoku Challenge

## Description
This is a single sudoku puzzle. It is a basic clientside app that is served by simple Node Express server. There isn't actually any server side functionality, it is just a quick way to server up a site. I reworked the input method for mobile to minimize interference from the virtual keyboard. On mobile the user should just press on the input he or she wants to change and then slide their finger up/down to change the value.

The major tradeoff's I considered while writing this were between writing performant code or more maintainable code. Basically, should the code loop over the sudoku many times to verify the various aspects that must be true or should it loop once and check the various properties all at once in a large 'god' function. After considering that data set would never grow to be very large (a 9x9 board is an 81 element set) and some quick benchmarks I decided a few extra loops wouldn't hurt. For the build process I considered using grunt/gulp but ruled it out because I didn't want to bloat the repo with irrelavant code. 

I opted not to use jQuery or underscore/lodash because they are an extra 30kb that doesnt bring much to the table when only modern browsers must be considered. I chose not to use sass because I wasn't worried applying a consistant branch or needing to leverage mixin's to resolve cross browser issues. 

If I had more time I would put more time into cleaning up the look and messaging or the puzzle. If i felt it was getting complex i would move to sass and at that point add grunt. 

## Requirements
* Node.js

## Install
1. Clone the repo to your machine. 
2. Run, `$ npm install`.
3. Run, `$ npm start`.
4. Open http://localhost:3000/ in your browser. 

## Test
The sudoku business logic is tested via mocha. Use, `$ npm test` to run tests. 
