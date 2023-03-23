# Etch-a-Sketch

The Odin Project Etch-a-Sketch project using HTML, CSS, and JS

Going into this project, I underestimated the time it would take to complete it. After adding the easier parts of the project, I struggled to figure out how to increment the opacity when coloring in the grid. It took some searching online and some tinkering with the browsers console and debugger to figure out that the opacity came back as a string, and to increment I'd need to make it a number data type.

Another issue I came across was when switching between the default and rainbow drawing styles, the two event listeners would still be attached to the element. This problem wasn't obvious at first since the drawing style selected was the right color being drawn. But when taking a closer look at the elements tab in developer tools, the opacity was double what it should have been. I then navigated to the event listeners tab and realised the problem.

In my JavaScript, I had a global variable, currentDrawingStyle, that was asigned to the drawing style function the user had selected. In the event listeners of the two drawing style buttons, I used removeEventListener and the second argument was the variable, currentDrawingStyle. For some reason the implicit reference to the function I wanted to remove was not going to work, so I instead explicitly passed the drawing style function that needed to be removed in removeEventListener and that worked just fine. To reduce repeated code since both drawing style buttons needed this functionality, I created a funciton that would take two parameters - one of the drawing styles to remove, and the other to add.

Building this project built upon my understading of grid, event listeners, debugging with developer tools.
