Isovist by Kaylah Facey begins here.

Include Vorple Hyperlinks by Juhana Leinonen.

A thing can be geometric. A thing is usually not geometric. 
A geo-room is a kind of container. A geo-room is always geometric. A geo-room is never portable. A geo-room can be dark.

The near left isovist is a list of things that varies. The far left isovist is a list of things that varies.
The near right isovist is a list of things that varies. The far right isovist is a list of things that varies.
The near front isovist is a list of things that varies. The far front isovist is a list of things that varies.
The containment isovist is a list of things that varies.
Every thing has some text called the near appearance. Every thing has some text called the far appearance text. Every thing has some text called the far description text.

The threshold distance is a number that varies. The threshold distance is 100.

To update the isovist:
	let the containment be a list of things;
	let the near right be a list of things; 
	let the far right be a list of things;
	let the near left be a list of things;
	let the far left be a list of things;
	let the near front be a list of things;
	let the far front be a list of things;
	repeat with X running through the geometric things:
		repeat with the dark room running through the dark geo-rooms:
			if X is geometrically enclosed by the dark room:
				continue;
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

[P - a perspective; e.g. "front"]
To decide whether (N - a thing) is geometrically visible to the (P - some text):
	execute JavaScript command "return isovist.getVisibility('player', '[P]', '[N]')";
	if the JavaScript command returned true:
		decide yes;
	decide no.
	
To decide whether (N - a thing) is close:
	execute JavaScript command "return isovist.getDistance('player', '[N]')";
	let distance be the number returned by the JavaScript command;
	if distance is less than the threshold distance:
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

Before taking:
	if the noun is geometric:
		try geo-taking the noun instead.

Geo-taking is an action applying to one visible thing. Understand "geo-take [any thing]" as geo-taking.
Check geo-taking:
	if the noun is not close:
		say "The [noun] is too far away to reach." instead.
Carry out geo-taking:
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
			place a link to command "take [the noun]" reading "take";
			say ")";
		say "[paragraph break]".
			
A container has some text called the enclosement description.
The enclosement description of a container (called the C) is usually "in the [printed name]".

To decide whether (N - a thing) is geometrically enclosed by (C - a thing):
	execute JavaScript command "return isovist.contains('[C]', '[N]')";
	if the JavaScript command returned true:
		decide yes;
	decide no.

To say locale details: describe locale for the holder of the player.

Updating the isovist is an action applying to nothing. Understand "isovist" as updating the isovist.
Carry out updating the isovist:
	update the isovist.
	
To decide whether the player is geometrically located:
	repeat with X running through the geometric things:
		if the player is geometrically enclosed by X:
			decide yes;
	decide no.
	
To decide whether the player is not geometrically located:
	if the player is geometrically located:
		decide no;
	decide yes.

When play begins:
	say "This game uses tank movement commands. Use WS to move forward and back, and AD to turn right and left without moving. To quit, press Q.";
	execute JavaScript command "isovist.loadWorld()";
	update the isovist.

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

Isovist ends here.
