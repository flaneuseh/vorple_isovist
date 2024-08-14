"StatelyGardens" by Kaylah Facey


[Include Vorple Notifications by Juhana Leinonen.]
[Include Vorple Command Prompt Control by Juhana Leinonen.]
[Include Vorple Element Manipulation by Juhana Leinonen.]
[Include Vorple Hyperlinks by Juhana Leinonen.]
[Release along with the "Vorple" interpreter.]
[Release along with Javascript "world.js".
Release along with the style sheet "world.css".]
[Include Basic Screen Effects by Emily Short.]
[Include Vorple Status Line by Juhana Leinonen.]
Include Isovist by Kaylah Facey

[
Section - Char Entry
[Char entry has been abstracted to JS control.]

Keychar is a number that varies. [setting up the parser to identify specific key presses during transitions]
Keypress is some text that varies.
To get char input:
	now keychar is the chosen letter;
	now keypress is keychar resolved to an indexed text.

To decide which indexed text is (N - a number) resolved to an/-- indexed text:
	if (N > 31 and N < 127) or (N > 160 and N < 384):[i.e., we have received printable input]
		decide on “[char-code (N)]”;
	otherwise:
		decide on “”.
		
To say character description of (N - a number):
	let char be N resolved to an indexed text;
	if char is not "":
		say char;
	else if N is -4:
		say "[bracket]up[close bracket]";
	else:
		say "[bracket]unknown - code [N][close bracket]".

To say char-code (N - a number):
	(- print (char) {N}; -).
	
To decide what number is the chosen letter:
	(- VM_KeyChar() -).
	]

[
Chapter - Isovist

[Isovist has been abstracted to the Isovist extension]
A thing can be geometric. A thing is usually not geometric. 
A geo-room is a kind of container. A geo-room is always geometric. A geo-room is never portable.
The near left isovist is a list of things that varies. The far left isovist is a list of things that varies.
The near right isovist is a list of things that varies. The far right isovist is a list of things that varies.
The near front isovist is a list of things that varies. The far front isovist is a list of things that varies.
The containment isovist is a list of things that varies.
Every thing has some text called the near appearance. Every thing has some text called the far appearance text. Every thing has some text called the far description text.

To update the isovist:
	let the containment be a list of things;
	let the near right be a list of things; 
	let the far right be a list of things;
	let the near left be a list of things;
	let the far left be a list of things;
	let the near front be a list of things;
	let the far front be a list of things;
	repeat with X running through the geometric things:
		if X is a container and the player is geometrically enclosed by X:
			add X to the containment;			
		else if X is geometrically visible to the "right":			
			if X is close:
				add X to the near right;
			else:
				add X to the far right;
		else if X is geometrically visible to the "left":			
			if X is close:
				add X to the near left;
			else:
				add X to the far left;
		else if X is geometrically visible to the "front":			
			if X is close:
				add X to the near front;
			else:
				add X to the far front;
	now the near right isovist is the near right;
	now the far right isovist is the far right;
	now the near left isovist is the near left;
	now the far left isovist is the far left;
	now the near front isovist is the near front;
	now the far front isovist is the far front;
	now the containment isovist is the containment.
	
To decide whether (N - a thing) is geometrically visible to the (T - some text):
	execute JavaScript command "return isovist.getVisibility('player', '[T]', '[N]')";
	if the JavaScript command returned true:
		decide yes;
	decide no.
	
To decide whether (N - a thing) is close:
	execute JavaScript command "return isovist.getDistance('player', '[N]')";
	let distance be the number returned by the JavaScript command;
	if distance is less than 100:
		decide yes;
	decide no.
	
To decide whether (N - a thing) is not close:
	if N is close:
		decide no;
	decide yes.
	
To say isovist description:
	say "[enclosure description].\nDirectly in front of you: [near appearance of the near front isovist]. Further back: [far appearance of the far front isovist].\nDirectly to your left: [near appearance of the near left isovist]. Further back: [far appearance of the far left isovist]. \nDirectly to your right: [near appearance of the near right isovist]. Further back: [far appearance of the far right isovist]."
	
To say short description of the (L - a list of things):
	if L is empty:
		say "nothing";
	else:
		say "[L with indefinite articles]".

To say near appearance of the (L - a list of things):
	if L is empty:
		say "There is nothing of note.";
	else:
		let U be a list of things;
		let described be false;
		repeat with N running through L:
			if the near appearance of N is "":
				add N to U;
			else:
				place a link to command "examine [N]" reading "[near appearance of N] ";
				now described is true;
		if U is not empty:
			say "There is";
			if described is true:
				say " also";
			let i be 0;
			repeat with N running through U:
				increase i by 1;
				place a link to command "examine [N]" reading "[N with indefinite article]";
				if i is less than the number of entries in U:
					say ", ";
			say ".".
		

To say far appearance of the (L - a list of things):
	if L is empty:
		say "There is nothing of note.";
	else:
		let U be a list of things;
		let described be false;
		repeat with N running through L:
			if the far appearance text of N is "":
				add N to U;
			else:
				place a link to command "examine [N]" reading "[far appearance of N] ";
				now described is true;
		if U is not empty:
			say "There is";
			if described is true:
				say " also";
			let i be 0;
			repeat with N running through U:
				increase i by 1;
				place a link to command "examine [N]" reading "[N with indefinite article]";
				if i is less than the number of entries in U:
					say ", ";
			say ".".


To say (N - a thing) with indefinite article:
	say "[indefinite article of N] [N]".

To say enclosure description:
	say "You are ";
	repeat with R running through the geo-rooms:
		if the player is geometrically enclosed by R:
			say "[enclosement description of R]";
	repeat with C running through the geometric containers:
		if C is not a geo-room and the player is geometrically enclosed by C:
			say ", ";
			place a link to command "examine [C]" reading "[enclosement description of C]".
			
To say far appearance of (N - a thing):
	If the far appearance text of N is not "":
		say "[far appearance text of N] ";
	else:
		say "You can just make out [a N]. ".
		
To say far description of (N - a thing):
	if the far description text of N is not "":
		say "[far description of N]";
	else:
		say "You're too far away to make out any details of [the noun].".

Force-taking is an action applying to one visible thing. Understand "force-take [any thing]" as force-taking.
Carry out force-taking:
	now the noun is carried by the player;
	execute JavaScript command "return isovist.take('player', '[the noun]')";
	if the JavaScript command returned true:
		update the isovist;
		say "Taken.";
		try looking;
	else:
		say "You can't take [the noun].".
		
Instead of examining:
	say "([The noun]): ";
	if the noun is geometric and the noun is not close:
		say "[far description of the noun]";
	else:
		say "[description of the noun]";
		if the noun is portable:
			say "(";
			place a link to command "force-take [the noun]" reading "take";
			say ")";
		say "[paragraph break]".
			
A container has some text called the enclosement description.
The enclosement description of a container (called the C) is usually "in the [printed name]".

To decide whether the player is geometrically enclosed by (N - a thing):
	execute JavaScript command "return isovist.contains('[N]', 'player')";
	if the JavaScript command returned true:
		decide yes;
	decide no.
	
After deciding the scope of the player:
	update the isovist;
	repeat with X running through the near left isovist:
		place X in scope;
	repeat with X running through the far left isovist:
		place X in scope;
	repeat with X running through the near right isovist:
		place X in scope;
	repeat with X running through the far right isovist:
		place X in scope;
	repeat with X running through the near front isovist:
		place X in scope;
	repeat with X running through the far front isovist:
		place X in scope;
	repeat with X running through the containment isovist:
		place X in scope.

To say locale details: describe locale for the holder of the player.

Updating the isovist is an action applying to nothing. Understand "isovist" as updating the isovist.
Carry out updating the isovist:
	update the isovist.
	[execute JavaScript command "isovist.setText('status-line-isovist', '[isovist description]')".]

To decide whether the player is geometrically located:
	repeat with X running through the geometric things:
		if X is a container and the player is geometrically enclosed by X:
			decide yes;
	decide no.
	
To decide whether the player is not geometrically located:
	if the player is geometrically located:
		decide no;
	decide yes.

Before looking for the first time:
	say "This game uses tank movement commands. Use WS to move forward and back, and AD to turn right and left without moving. To quit, press Q.";
	execute JavaScript command "isovist.loadWorld()";
	update the isovist;
	continue the action.	

Before looking:
	if the player is not geometrically located:
		say "You can't go any further that way.";
		execute JavaScript command "isovist.reverse('player')";
		update the isovist;		
		continue the action.

Instead of looking:
	say "[enclosure description].";
	say "Directly in front of you: [near appearance of the near front isovist]";
	say "Further to the front: [far appearance of the far front isovist]";
	say "Directly to your left: [near appearance of the near left isovist]";
	say "Further to the left: [far appearance of the far left isovist]";
	say "Directly to your right: [near appearance of the near right isovist]";
	say "Further to the right: [far appearance of the far right isovist]".				
	
]
	
Chapter - Game

The Stately Gardens are a room. 

The Ha-ha is a geo-room. The description is "[first time]The land dips here so suddenly that you do not know the dip is there until you're in it; but it prevents livestock from crossing barriers, and that is the important thing.[only]You are at the base of a steep-sided depression, so the lawn continues north and south more or less at the level of your head."
The Sheep Field is a geo-room.
The black sheep is geometric scenery. The near appearance is "A black sheep grazes placidly nearby." The description of the black sheep is "It reminds you of your Uncle Tim."
The Gravel Circle is a geo-room. The description is "A circle of raked gravel, which crunches pleasingly beneath you."
The half-size Bentley is a geometric container. The Bentley is scenery. The near appearance is "A sort of child's-toy version of a Bentley is parked close at hand." The description of the half-size Bentley is "Of beautiful and unambiguously luxurious lines, but sized down to hold only one or (at a stretch) two people, and powered by electricity." The enclosement description is "sitting in [the Bentley]".
There is a geo-room called The Upper Terrace. The enclosement description is "on [the Upper Terrace]".
A thing called The Obelisk is geometric scenery. The near appearance is "Now that you are at the foot of it, you can properly appreciate the stupid immensity of The Obelisk, pointing stonily at heaven." The description of the obelisk is "It stands ridiculously tall, and has an inscription on the face." The inscription is part of the obelisk. The description of the inscription is "You can't read the squirming, pointed letters, but they make you uneasy.".

The Croquet Ground is a geo-room. The enclosement description is "on [the Croquet Ground]".
The stone bench is a geometric container. The bench is scenery. The near appearance is "There is a stone bench here -- a sort of stone sofa, really, with nymphs disporting themselves on the arms and back." The description of the bench is "It used to be a Roman sarcophagus -- hence the nymphs -- but someone has thoughtfully recarved it as lawn furniture." The enclosement description is "sitting on [the stone bench]".
There is a geo-room called The Middle Terrace. The enclosement description is "on [the Middle Terrace]".
The Lily Pond is a geometric container. The Lily Pond is scenery. The enclosement description is "soaked up to your knees in [the Lily Pond]". The description is "A perfectly round lily pond, bordered with stones. Its surface patchily reflects [the marble anteater] on the south bank."
The Lawn is a geo-room. The enclosement description is "on [the Lawn]".
There is a geo-room called The Lower Terrace. The enclosement description is "on [the Lower Terrace]". The description is "A short, round, entirely artificial hillock."
The marble anteater is geometric scenery. The near appearance is "A marble anteater stands on a pedestal at the top of the Lower Terrace." The far appearance text is "[the near appearance of the marble anteater]". The description is "The anteater is very much more than life-size."
The Rose Garden is a geo-room. 
The thicket of red roses is a geometric container. The thicket is scenery. The description is "Heavy red roses grow over a roughly horseshoe-shaped wall around you." The enclosement description is "surrounded by [a thicket]".
	
[When play begins:
	construct a Vorple status line with 1 column.]
	

[Rule for constructing the Vorple status line:
	clear the Vorple status line;
	set the output focus to the element called "status-line-middle";
	say "[isovist description].']
				
[When play begins (this is the plain status line setup rule): 
	now the middle Vorple status line is "[locale details]".
	
Rule for constructing the Vorple status line:
	clear the Vorple status line;
	set the output focus to the element called "status-line-middle";
	say "[locale details]";
	[let info be indexed text;
	let info be "[locale details]";
	let K be the number of lines in info;
	repeat with L running from 1 to K:
		let passage be line number L in info;
		repeat with M running from 1 to K:
			replace unpunctuated word number (10 * M) in passage with "[unpunctuated word number (10 * M) in passage][line break]";
		replace line number L in info with passage;
	let K be the number of lines in info;
	let P be the number of paragraphs in info;
	unless K is 0, let K be K + (P - 1);
	let whereabouts be indexed text;
	let whereabouts be "[the player's surroundings]: [description of the location of the player]";
	let N be the number of unpunctuated words in whereabouts;
	let N be N / 10;
	repeat with M running from 1 to N:
		replace unpunctuated word number (10 * M) in whereabouts with "[unpunctuated word number (10 * M) in whereabouts][line break]";
	let N be the number of lines in whereabouts;
	unless K is 0:
		deepen the status line to N + 1 + K rows;
	otherwise:
		deepen the status line to N rows;
	move the cursor to 1;
	say "[whereabouts][line break][info]";
]	set the output focus to the main window;
	rule succeeds.
]
	
[The following is now being handled by JS]
[Every turn:
	update the isovist.
	execute JavaScript command "isovist.setText('status-line-isovist', '[isovist description]')".]
	
[The game now uses purely tank movement, and keypresses are handled entirely by JS]
[Understand the command "move" as something new. Understand "move" as moving. Moving is an action applying to nothing. Carry out moving: enter tank movement mode.]
[To enter tank movement mode:
	say "This game uses tank movement commands. Use WS to move forward and back, and AD to turn right and left without moving. To quit, press Q."; [Press the SPACE key to enter parser mode.]
	now keypress is "m";
	while keypress is not "q" and keypress is not "Q":
		get char input;
		if keypress is "w" or keypress is "W":
			execute JavaScript command "isovist.stepForward('player')";
			update the isovist;
			place a link to execute the JavaScript command "isovist.command('look')" reading "Obelisk?";
			[try looking;]
		else if keypress is "a" or keypress is "A":
			execute JavaScript command "isovist.turnLeft('player')";
			update the isovist;
			[try looking;]
		else if keypress is "s" or keypress is "S":
			execute JavaScript command "isovist.stepBack('player')";
			update the isovist;
			[try looking;]
		else if keypress is "d" or keypress is "D":	
			execute JavaScript command "isovist.turnRight('player')";
			update the isovist;
			[try looking;]
	[say "Enter commands normally. To enter movement mode, say 'MOVE'.".]
	say "Thanks for playing! Goodbye";
	end the story finally.]