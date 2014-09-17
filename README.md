proj1
=====
#Grading Directions:
##Highlights:
1. Line 24-30 - var Cell = function(x,y,currentState){...}
Here I am using a tactic we learned in class, with anonymous functions allowing for me to create multiple cell 'objects' although they are actually functions that are storing information. In addition, I like the way that I did the return function for this function, as I've never done anything like this, and used it as a learning opportunity for new Javascript syntax. 

2. Line 135 - Party Mode
It's one of my additional features and is AWESOME. Also turn on your sound!

3. Line 35 - 53 - Random Generator
This should allow me to generate random boards in order to create more testing situations. 
 
##Help Wanted:
My code is still very inefficient. I believe it has something to do with the way that I am storing information and creating new cells. I believe that there is something wrong with the way the random cells are generated, which is why they are not used. I am thinking about implementing a new way to create random maps, as well as allow the user to input maps. 

I can still optimize my code, like in terms of variable storage and such, so I will continue to work on this as it may become problematic. 

I was having some issues with the switch statement in my starter cases. I left them in so I can continue working on them. 

In addition, the design will be so much better in the next iteration.  

#Design:
## Challenges:
The first challenge I faced was deciding how to implement the actual visual part of the game of life. There were a couple of different ways the graphics could have been implemented, including open source platforms like Melon.js and CreateJS, or creating a bunch of individal div tags and filling their backgrounds, or using a canvas tag in HTML. I decided to go with the canvas tag item because I had never worked with something like this before and I want to use this opportunity to work with new things. 

The next design challenge I faced was axes. Because I'm using a 2D array (Array[][]), the origin points and orientation of the positive axes are moved. This was very disorienting at first, and because of this, my first take, although it was successful in terms of obeying the game of life rules, it was unsucessful due to misunderstanding of my coordinate system. It took me a while, but after sitting down and writing out the different directions, and connecting variables I created to each other and to the 2D array I was able to figure out my mistake.

The next challenge I face was how to actually store the information for each cell. In order to help me approach this pset, I looked at different examples of implementations of Conway's Game of Life, and noticed that most people created some type of cell object, so I decided to follow this precedent. 


The final challenge I faced was creating the 2D array that contained the information about the board to be used (aka creating the starting generation). At first, and as of now, I am using a system where the user submits a set of points, as a tuple ([x,y]), in a 1D array. From there I create the 2D array ccontaining the alive and dead cells. However, I've come to realize that this is very inefficient, so I will be looking for new ways to make this more efficient.

The actual stylistic choice of the website is lacking due to time constraints, but will be significantly better in the next iteration. 
Game of Life
