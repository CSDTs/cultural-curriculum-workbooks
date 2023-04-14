const SECTION_1_CCM = [
	{
		title: "Creating an Account",
		details: `<p>Before we start, you need an account to save your work.</p>
		<p>
			Create a <a href="https://csdt.org/accounts/signup/">CSDT account</a> (if you haven't already), and log in.
			Learn about cultural backgrounds in discrete iteration tools. Use programming to make several designs in these
			craft forms. Share your program with your teacher and peers.
		</p>`,

		project: "",
		tags: "login",
	},
	{
		title: "Cultural Background",
		details: `<p>In this section we will use quilting to illustrate the ways that cultures created their own heritage algorithms
		You can use the same approach with any of the tools on the <a href=’https://csdt.org’>CSDT</a> website.
		In the Quilting Cultural Background you will see five sections, as illustrated to the left. Notice that if you click on 'Four Directions'
		you will see an additional four cultural groups to choose from. Go to the cultural tradition that your teacher assigns, and start your investigation! </p>
		<p>For example, if you were assigned the Anishinaabe quilting tradition, you will notice they are arranged in circular patterns
		We call these groups of patterns <strong>heritage algorithms</strong> because it shows how computing ideas were independently invented in each culture.
		The Anishinaabe heritage algorithm is circular because of something called the medicine wheel. But what that really means, and why it is so important, you will need to discover.</p>`,
		project: "",
		tags: "response, homepage",
	},
];

const SECTION_2_CCM = [
	{
		title: "Stamping",
		details:
			"<p>Here is a first script for you to play with. It includes four blocks. The first block, <code>When Clicked</code>, is used to start your code. The second block,  <code>clear</code>,  is used to clear the screen. We use <code>stamp</code> to paste the image onto the screen. And lastly, <code>glide by steps 100</code> is used to move the image on the screen. You can change the number in the glide block to make the image glide any number of steps. Now that you know what each block does, can you make it glide by more? Less? Make it glide backwards?</p>",
		project: "xmls/cc_math_introduction/lesson-3.xml",
		tags: "response, csnap",
	},
	{
		title: "Changing Costumes",
		details:
			"<p>We call each image a <em>costume</em>. We say there is a <em>sprite</em> switching costumes on the <em>stage</em>. Inside the <code>switch costume</code> block you can click on the drop-down menu. Find a new set of 3 costumes and get the sprite to stamp them onto the stage.</p>",
		project: "xmls/cc_math_introduction/lesson-4.xml",
		tags: "response, csnap",
	},
	{
		title: "Changing Costume Color",
		details:
			"<p>You can change the color of costume by entering numbers, in the range of 0-100, in the space provided next to <code>change [color] effect by___</code>. You can switch to different costumes and set different colors for each costume. Can you set different colors for the costumes you chose above? </p>",
		project: "xmls/cc_math_introduction/lesson-5.xml",
		tags: "response, csnap",
	},
	{
		title: "Changing Costume Size",
		details:
			"<p>Costume sizes can be changed by assigning a percentage to the size you would like the costume to be increased by. Remember, percentages range from 0-100%. You can set a different size for each costume and each costume size increases differently depending on what its initial size is. How about you try now to make the three different costumes each a different size?</p>",
		project: "xmls/cc_math_introduction/lesson-6.xml",
		tags: "response, csnap",
	},
	{
		title: "Setting Angles",
		details:
			"<p>You can also set the costumes to tilt at different angles. Each costume is by default set at an angle of  0 degrees. You will notice that in the example above, the first costume, ‘leaf1’, is tilted at 45° (45 degrees) while the second costume, ‘bud1’, is tilted at 10°. Costumes can be titled at any angles ranging from 0 to 360 degrees. Can you make the costumes tilt at angles higher than 90 degrees?</p>",
		project: "xmls/cc_math_introduction/lesson-7.xml",
		tags: "response, csnap",
	},
	{
		title: "Coordinates",
		details:
			"<p>Your costume starts at x=0,y=0 on the screen. If you make the costume move 4 steps horizontally, then you do so by setting x=4. So, the x-axis is the horizontal plane. If you make the costume move 4 steps vertically, then you do so by setting y=4. So, the y-axis is the vertical plane. If you set both x=4 and y=4 then the costume will move diagonally. In the example above, the costume, leaf1, has been moved on the x-axis by moving 90 steps on the x-axis while the costume, bud1, has been moved on the y-axis by 70 steps. Can you make the costumes move forward and backward on the x-axis and upward and downward on the y-axis?</p>",
		project: "xmls/cc_math_introduction/lesson-8.xml",
		tags: "response, csnap",
	},
	{
		title: "Gliding Your Costume",
		details:
			"<p>If you wanted to have three costumes on the screen and you would like them to be spaced apart then you can have the costumes glide on the screen. You can make your costume glide on the screen by setting the x coordinates to move n-number of steps. However, if you have more than one costume and you wish to make both of the costumes glide each time you use the glide function, you need to ensure that the costume is at the last position of x and then moves n-number of steps from there. For instance, in the example the costume, bud1, moves from (x=0,y=0) to (x=70, y=0), while the costume, petal2, moves from (x=70, y=0) to (x=140, y=0). Can you make the costumes glide vertically by changing the y-coordinates?</p>",
		project: "xmls/cc_math_introduction/lesson-9.xml",
		tags: "response, csnap",
	},
	{
		title: "Speeding Things Up",
		details:
			"<p>So far you have learned how to glide, change costume, costume color and size, make your costumes tilt at different angles, and move your costume on the screen. All the blocks that were contained in the setup and the glide block are no longer needed as we have already learned about all the blocks that were within these two blocks. Next, we are going to explore the CSDT interface and the terms that you have studied so far in detail. </p>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
];

const SECTION_3_CCM = [
	{
		title: "Reviewing Vocabulary",
		details:
			"<div class='row justify-content-center'><div class='col-md-3'><h3>Coding/Programming Blocks</h3><p> These are the programming blocks you can use in your Script or Program. A script lets you code designs.</p><p>The programming blocks appear as shown below. </p><img class='img-fluid rounded' src='./src/img/interface-1.png' alt=''><p>Click on <em>Purple 'Looks'</em> tab and <em>Green 'Pen'</em> at the top of this panel. See how the programming blocks available to you will change.</p></div><div class='col-md-3'><h3>Script</h3><p>The object on the stage is called a sprite. It always wears a 'costume'. In this case, it was a red petal costume. The script below told it where to stamp its image. Sprites can be made to move around, switch costumes, play music, and anything else you give it a script to do.</p><img class='img-fluid rounded' src='./src/img/interface-2.JPG' alt=''></div><div class='col-md-3'><h3>Output</h3><p>You will see this on your Stage</p><img class='img-fluid rounded' src='./src/img/interface-3.JPG' alt=''><p>Now you can experiment!</p></div></div> <p>Without adding any new blocks, what can you change about the images around the medicine wheel? How would you go about making those changes?</p>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
	{
		title: "The Stage",
		details:
			" <div class='row justify-content-center'> <div class='col-md-5 border'> <h3>Stage</h3> <p>This is the STAGE for displaying your design</p> <img src='./src/img/interface-4.png' class='img-fluid rounded' alt=''> <p>From left to right: Changing the stage size (3), Run, Pause, and Stop</p> <p>The Image</p> <img src='./src/img/interface-5.JPG' class='img-fluid rounded' alt=''> <p>Point at the picture at different points on the stage with the mouse. And then watch X: and Y: change at the bottom of the screen like below. </p> <img src='./src/img/interface-6.jpg' class='img-fluid rounded' alt=''> </div> <div class='col-md-5 border'> <p> The Stage is laid out with an x,y coordinate system with (0,0) in the middle as shown below. </p> <img src='./src/img/interface-7.png' class='img-fluid rounded' alt=''> </div> </div> <br>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
	{
		title: "Sprite1, Goal, Stage, and Menus",
		details:
			" <div class='row justify-content-center'> <div class='col-md-5 border'> <h3>Sprite1, Goal, and Stage – lower right in window</h3> <img src='./src/img/interface-8.jpg' class='img-fluid rounded' alt=''> <div class='row justify-content-center'> <div class='col-3'> <img src='./src/img/interface-9.jpg' alt='' class='img-fluid rounded'> </div> <div class='col-9'> <p> The 'sprite1' sprite is the one we control to draw and stamp. </p> <strong>Never delete or drag the 'sprite1' icon off the stage.</strong> </div> </div> <div class='row justify-content-center'> <div class='col-3'> <img src='./src/img/interface-10.jpg' alt='' class='img-fluid rounded'> </div> <div class='col-9'> <p> The 'goal' sprite is only shown to inspire our design </p> </div> </div> <div class='row justify-content-center'> <div class='col-3'> <img src='./src/img/interface-11.jpg' alt='' class='img-fluid rounded'> </div> <div class='col-9'> <p> The Stage can also have a Script. </p> </div> </div> </div> <div class='col-md-5 border'> <h3>Menus – top middle of the window</h3> <img src='./src/img/interface-12.jpg' alt='' class='img-fluid rounded'> <p> CSnap - can take you back to home screen </p> <p> File – Allows you to Save your work file, along with other choices </p> <p> Cloud – Login or access your saved work (your Profile) </p> <img src='./src/img/interface-13.jpg' alt='' class='img-fluid rounded'> <p>From here, you can choose: </p> <p> Scripts - use this to code designs </p> <p> Costumes – allows you to see the available costumes or create a new ones </p> <p> Sounds – include sounds in your design </p> <p> Click on the COSTUMES tab and go to the next page. </p> </div> </div>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
	{
		title: "Costumes",
		details:
			"<div class='row justify-content-center'> <div class='col-md-5 border'> <p>Click on the Costumes tab: </p> <img src='./src/img/interface-14.png' alt='' class='img-fluid rounded'> <p>You see the following costumes available in the Anishinaabe Software: </p> <div class='row justify-content-center'> <div class='col-4'> <img src='./src/img/interface-15.jpg' alt='' class='img-fluid rounded'> </div> <div class='col-4'> <img src='./src/img/interface-16.jpg' alt='' class='img-fluid rounded'> </div> </div> </div> <div class='col-md-5 border'> <p>Optional: </p> <p>You also see the 'Turtle Costume' shaped like an arrowhead.</p> <img src='./src/img/interface-17.png' alt='' class='img-fluid'> <p>The paintbrush allows you to make your own costumes.</p> </div> </div>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
	{
		title: "Saving Your Work",
		details:
			" <div class='row justify-content-center'> <div class='col-md-5 border'> <h3>How to save your work: </h3> <ol> <li class='list-item-csdt'>Make sure you are already logged in.</li> <li class='list-item-csdt'>Choose File (top left that looks like a page folder from the right top corner) </li> <li class='list-item-csdt'>Enter a name for your project. Or enter a name that your teacher has assigned to you to enter.</li> </ol> </div> <div class='col-md-5 border'> <img src='./src/img/interface-18.jpg' alt='' class='img-fluid rounded'> </div> </div>",
		project: "xmls/cc_math_introduction/lesson-10.xml",
		tags: "response, csnap",
	},
];

const SECTION_4_CCM = [
	{
		title: "Looks Blocks",
		details:
			"<div class='row justify-content-center'> <div class='col-md-3 border'> <h3>Looks Blocks</h3> <p>Control how the 'sprite' looks on the stage/</p> <p>Costume</p> <div class='row justify-content-center'> <div class='col-md-8'> <img src='./src/img/interface-19.png' alt='' class='img-fluid rounded'> </div> </div> <p>Size & Color</p> <div class='row justify-content-center'> <div class='col-md-8'> <img src='./src/img/interface-20.png' alt='' class='img-fluid rounded'> </div> </div> </div> <div class='col-md-3 border'> <h3>CSnap Script - Manipulate Parameters</h3> <p>A Parameter is a number or word that you can change in a block of code. You can use parameters to control your image. </p> <p>Parameters include: </p> <ul class='list-item-csdt' style='list-style-position: inside;'> <li class='list-item-csdt'>The size of the sprite</li> <li class='list-item-csdt'>The color of the sprite(numbers 0 to 100)</li> <li class='list-item-csdt'>The costume: flower, petal, etc.</li> </ul> <img src='./src/img/interface-21.jpg' alt='' class='img-fluid rounded'> <p><strong>Try the code above</strong> and see the Looks of the image change.</p> </div> <div class='col-md-3 border'> <h3> Changes on the Stage </h3> <img src='./src/img/interface-22.jpg' alt='' class='img-fluid rounded'> <p><strong>Remember to SAVE your work by clicking 'Save As...'</strong></p> </div> </div>",
		project: "xmls/cc_math_introduction/lesson-16.xml",
		tags: "response, csnap",
	},
	{
		title: "Motion Blocks",
		details:
			" <div class='row justify-content-center'> <div class='col-md-3 border'> <h3>Motion Blocks</h3> <img src='./src/img/interface-23.JPG' alt='' class='img-fluid rounded'> </div> <div class='col-md-3 border'> <h3>Script</h3> <img src='./src/img/interface-24.jpg' alt='' class='img-fluid rounded'> <p>Start of script: </p> <ul class='list-item-csdt' style='list-style-position: inside;'> <li class='list-item-csdt'>Clear the screen</li> <li class='list-item-csdt'>Use Turtle Costume</li> <li class='list-item-csdt'>Set size to 300%</li> <li class='list-item-csdt'>Put sprite in the middle of the screen (x=0, y=0)</li> <img src='./src/img/interface-25.jpg' alt='' class='img-fluid rounded'> <li class='list-item-csdt'>From the center, glide left 100 pixels and down 200 pixels</li> <li class='list-item-csdt'>Move to the right 100, stay 200 down</li> <li class='list-item-csdt'>Move to the upper left corner: left 200, up 200 from center</li> <li class='list-item-csdt'>Move right by 50</li> <li class='list-item-csdt'>Move down by 25</li> </ul> </div> <div class='col-md-3 border'> <h3>Changes on the Stage</h3> <div class='row justify-content-center'> <div class='col-md-7'> <img src='./src/img/interface-26.png' alt='' class='img-fluid rounded'> <img src='./src/img/interface-27.JPG' alt='' class='img-fluid rounded'> <img src='./src/img/interface-28.JPG' alt='' class='img-fluid rounded'> <img src='./src/img/interface-29.JPG' alt='' class='img-fluid rounded'> <img src='./src/img/interface-30.JPG' alt='' class='img-fluid rounded'> <img src='./src/img/interface-31.JPG' alt='' class='img-fluid rounded'> <img src='./src/img/interface-32.JPG' alt='' class='img-fluid rounded'> </div> </div> </div> </div>",
		project: "xmls/cc_math_introduction/lesson-17.xml",
		tags: "response, csnap",
	},
	{
		title: "Practice",
		details:
			" <div class='row justify-content-center'> <div class='col-md-5 border'> <p>At the right is a Stage. At about (200, 150) is an image of a Sprite with a * costume.</p> <p>Pick a Sprite costume (smiley face, star, peace sign, etc.)</p> <p>Draw your sprite on the graph at each of the following locations: </p> <ol style='list-style-position: inside;'> <li class='list-item-csdt'>(100, 200)</li> <li class='list-item-csdt'>(-200, 150)</li> <li class='list-item-csdt'>(-250, -250)</li> <li class='list-item-csdt'>(200, -250)</li> </ol> </div> <div class='col-md-5 border'> <img src='./src/img/interface-33.png' alt='' class='img-fluid rounded'> </div> </div> <br>",
		project: "xmls/cc_math_introduction/lesson-17.xml",
		tags: "csnap, response",
	},
];

const WORKBOOK_CC_MATH_INTRO = [
	{
		title: "Getting Started",
		lessons: SECTION_1_CCM,
	},
	{
		title: "My First Script",
		lessons: SECTION_2_CCM,
	},
	{
		title: "Touring the Interface",
		lessons: SECTION_3_CCM,
	},
	{
		title: "Types of Blocks",
		lessons: SECTION_4_CCM,
	},
];

export default WORKBOOK_CC_MATH_INTRO;
