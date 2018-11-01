# Memory Game Project

This repository contains the submission for the second project in the Udacity **Front-End Web Developer** nanodegree course.

HTML file is **spotter.html**, the CSS file is **css/spotter.css**, and the JavaScript file is **javascript/spotter.js**.  The **images** directory contains the images.  

Preview at http://htmlpreview.github.io/?https://github.com/WeaselGizzard/spotter/blob/master/spotter.html  or view at http://anesi.com/spotter/spotter.html

**NOTE** uploaded a minor change to spotter.js at 14:30 PDT 11/1/18.  Added a function to the tallyHo object to do window.clearInterval on the timer, thinking that the failure of the timer to stop at game end on my iPhone might result from a scope issue.  Apparently not.  Works fine of Chrome, IE and Firefox on my windows laptop, but not on my iPhone.  Not a big deal but perplexing. 

The major goal was to produce something that met the specifications outlined in the Project Rubric, but using World War II aircraft spotter cards instead of cards bearing simple symbols.  The long-term plan is to scan all 52 cards and pull a random sample of 8 whenever the Deal button is pushed.  Another aim was to minimize the use of ID's and event handlers, using event delegation instead.  No great attention was paid to efficiency.  Some oddities were encountered, for example, the need to prevent a user from revealing card content by dragging the ghost image of the card.  Adding decoration (red border) on incorrect matches distracted from memorizing card content, so it it was removed.  

This project was developed from scratch; the starter code provided by Udacity was not used or consulted, though the basic HTML and CSS from the previous project was used as a starting point.  However, the randomization routine referenced in the project rubric (on Stack Overflow) was used, and CSS for the modal was modified from an example found at https://www.w3schools.com.  These borrowings are noted in the CSS and JavaScript files. A single JavaScript object is used to persist data during the game (for example, counters and last event.target) and to hold the table of cards.  No idea if this is considered good practice, but it works well.  Initialization, including shuffling, is done with a method defined on that object.   

The HTML and CSS code have been validated against the W3C validation services.

Appearance and function have been tested on IE, Chrome, and Firefox browsers on a Windows laptop; using the device emulators in Chrome; and on my iPhone 6s.  While the project renders and is usable on mobile devices, the cards appear rather small.  
 
My reasons for taking this course:

- Get a good, coherent view of modern web development.
- Understand the developer tools now in common use.
- Upgrade my personal web site, http://anesi.com, which dates to 1995, to modern standards.
