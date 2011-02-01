/**
* jMemoGame
*
* @author Yann Michalski <yann.michalski@gmail.com>
* @version 1.0
* 
*/

var jMemoGame = {
	
	// index of the current level
	indexLevel : 0,
	
	// global score
	score: 0,
	
	// number of found cards
	nbFound: 0,
	
	// time left before loosing level
	timeLeft: 0,
	
	// TimeOut object used for managing the mask
	objToMask: 0,
	
	// TimeOut object used for managing the level countdown
	objToCountdown: 0,
	
	// Description of cards
	cards : [
		{name: 'chameau', imgShow: 'montrer-chameau.gif', imgHide: 'cacher-chameau.gif'},
		{name: 'chat', imgShow: 'montrer-chat.gif', imgHide: 'cacher-chat.gif'},
		{name: 'cheval', imgShow: 'montrer-cheval.gif', imgHide: 'cacher-cheval.gif'},
		{name: 'colibri', imgShow: 'montrer-colibri.gif', imgHide: 'cacher-colibri.gif'},
		{name: 'discus', imgShow: 'montrer-discus.gif', imgHide: 'cacher-discus.gif'},
		{name: 'ecureuil', imgShow: 'montrer-ecureuil.gif', imgHide: 'cacher-ecureuil.gif'},
		{name: 'ecu-volant', imgShow: 'montrer-ecu-volant.gif', imgHide: 'cacher-ecu-volant.gif'},
		{name: 'espadon', imgShow: 'montrer-espadon.gif', imgHide: 'cacher-espadon.gif'},
		{name: 'faon', imgShow: 'montrer-faon.gif', imgHide: 'cacher-faon.gif'},
		{name: 'hibou', imgShow: 'montrer-hibou.gif', imgHide: 'cacher-hibou.gif'},
		{name: 'koi', imgShow: 'montrer-koi.gif', imgHide: 'cacher-koi.gif'},
		{name: 'lapin', imgShow: 'montrer-lapin.gif', imgHide: 'cacher-lapin.gif'},
		{name: 'libellule', imgShow: 'montrer-libellule.gif', imgHide: 'cacher-libellule.gif'},
		{name: 'manchot', imgShow: 'montrer-manchot.gif', imgHide: 'cacher-manchot.gif'},
		{name: 'mouette', imgShow: 'montrer-mouette.gif', imgHide: 'cacher-mouette.gif'},
		{name: 'nautile', imgShow: 'montrer-nautile.gif', imgHide: 'cacher-nautile.gif'},
		{name: 'panda', imgShow: 'montrer-panda.gif', imgHide: 'cacher-panda.gif'},
		{name: 'papillon', imgShow: 'montrer-papillon.gif', imgHide: 'cacher-papillon.gif'},
		{name: 'renard', imgShow: 'montrer-renard.gif', imgHide: 'cacher-renard.gif'},
		{name: 'requin', imgShow: 'montrer-requin.gif', imgHide: 'cacher-requin.gif'},
		{name: 'rhino', imgShow: 'montrer-rhino.gif', imgHide: 'cacher-rhino.gif'}
	],
	
	// Description of levels
	levels: [
		{level: 1, x_max: 3, y_max: 4, time: 90, msgWin: 'Well done!'},
		{level: 2, x_max: 4, y_max: 4, time: 80, msgWin: 'Good!'},
		{level: 3, x_max: 5, y_max: 4, time: 70, msgWin: 'Superb!'},
		{level: 4, x_max: 6, y_max: 5, time: 70, msgWin: 'Marvelous!'},
		{level: 5, x_max: 6, y_max: 6, time: 65, msgWin: 'Outstanding! Be ready for the last level!'},
		{level: 6, x_max: 6, y_max: 7, time: 60, msgWin: 'Yipee! You completed all levels =)'}
	],
	
	/**
	* Launch game
	**/
	Play : function(){
		var objJMG = this;
		$().playground("#playground",{refreshRate: 10, width: 240, height: 308, position: 'relative'});
		$().playground().startGame(); 
		$('#bt-start').hover(
	      function () {
	        $(this).css('background-color', '#005B9F');
	      }, 
	      function () {
	        $(this).css('background-color', '#6096BF');
	      }
	    ).click(function(){
			objJMG.Init();
		});
	},
	
	/**
	* Build and start the current level
	**/
	Init : function(){
		var CarteDos = new Animation({ imageURL: '././images/memory/card.gif', numberOfFrame: 1, delta: 40, rate: 40, type: Animation.HORIZONTAL | Animation.ONCE}); 
		var tabcards = new Array();
		$('.card').each(function(){
			$(this).removeSprite();
		});
		if(this.indexLevel == 0){
			this.score = 0;
		}
		$('#time').html(this.levels[this.indexLevel].time + 's');
		$('#num-level').html(this.levels[this.indexLevel].level);
		$('#score').html(String(this.score));
		this.timeLeft = this.levels[this.indexLevel].time;
		this.CountDown();
		this.nbFound = 0;
		for (var i = 0; i < this.levels[this.indexLevel].x_max * this.levels[this.indexLevel].y_max; i+=1){
			tabcards[i] = Math.floor(i/2);
		}
		for(var j, x, i = tabcards.length; i; j = parseInt(Math.random() * i), x = tabcards[--i], tabcards[i] = tabcards[j], tabcards[j] = x);
		for (var i = 0; i < tabcards.length; i+=1){
			Coord_x = Math.floor(i/this.levels[this.indexLevel].y_max)*40
			Coord_y = Math.floor(i%this.levels[this.indexLevel].y_max)*44 + 2
			$().playground().addSprite('sprite' + i.toString(),{height: 40, width: 40, posx: Coord_x, posy: Coord_y, animation: CarteDos}); 
			$('#sprite' + i.toString()).addClass('card');	
			$('#sprite' + i.toString()).addClass(this.cards[tabcards[i]].name);
			this.SetAnimShow('#sprite' + i.toString(), tabcards[i]);
		}
		$('#start').css('display', 'none').css('opacity', 0);
		$("#mask").css("display", "none");
	},
	
	
	/**
	* Apply the hiding animation when clicking the card
	**/
	SetAnimShow : function(Sprite, IndexCard){
		var objJMG = this;
		$(Sprite).bind( 'click', function(){
			$(Sprite).addClass('shown');
			$(Sprite).addClass('found');
			objJMG.DisplayMask(300);
			Anim1 = new Animation({ imageURL: '././images/memory/montrer.GIF', numberOfFrame: 10, delta: 40, rate: 10, type: Animation.HORIZONTAL | Animation.ONCE | Animation.CALLBACK});
			Anim2 = new Animation({ imageURL: '././images/memory/' + objJMG.cards[IndexCard].imgShow, numberOfFrame: 10, delta: 40, rate: 10, type: Animation.HORIZONTAL | Animation.ONCE }); 
			$(Sprite).setAnimation(Anim1, function(){
				$(Sprite).setAnimation(Anim2);
			});
			objJMG.IsFound(Sprite, IndexCard);
		});
	},
	
	/**
	* Launch the hiding animation after 1.5 second
	**/
	ProgAnimHide : function(Sprite, IndexCard){
		var objJMG = this;
		window.setTimeout( function(){objJMG.SetAnimHide(Sprite, IndexCard);}, 1000);   //original 1500
		window.setTimeout( function(){objJMG.SetAnimShow(Sprite, IndexCard);}, 1200); 	//original 1700
		this.DisplayMask(1600);
	},
	
	/**
	* Hide the card
	**/
	SetAnimHide : function(Sprite, IndexCard){
		$(Sprite).removeClass('shown');
		var Anim1 = new Animation({ imageURL: '././images/memory/' + this.cards[IndexCard].imgHide, numberOfFrame: 10, delta: 40, rate: 10, type: Animation.HORIZONTAL | Animation.ONCE | Animation.CALLBACK}); 
		var Anim2 = new Animation({ imageURL: '././images/memory/cacher.GIF', numberOfFrame: 10, delta: 40, rate: 10, type: Animation.HORIZONTAL | Animation.ONCE});
		$(Sprite).setAnimation(Anim1, function(){
			$(Sprite).setAnimation(Anim2);
		});
	},
	
	/**
	* Display the transparent mask to block clicking
	**/
	DisplayMask : function(time){
			$('#mask').css('display', 'block');
			clearTimeout(this.objToMask);
			this.objToMask = window.setTimeout (function(){$("#mask").css("display", "none");}, time); 
	},

	/**
	* Check if the shown cards are a couple
	**/
	IsFound : function(Sprite, IndexCard){
		var objJMG = this;
		var coupleIsFound = true;
		$(Sprite).unbind('click');
		var CardName = this.cards[IndexCard].name;
		$('.shown').each(function(){
			if(!$(this).hasClass(CardName)){
				coupleIsFound = false;
				$('.shown').each(function(){
					for (var i = 0; i < objJMG.cards.length; i+=1){
						if($(this).hasClass(objJMG.cards[i].name)){
							objJMG.ProgAnimHide('#' + $(this).attr('id'), i);
							break;
						}
					}
					$(this).removeClass('found');
				});
			}
		});
		if($('.shown').length == 2){
			$('.shown').each(function(){
				$(this).removeClass('shown');
			});
		}else{
			coupleIsFound = false;
		}
		if (coupleIsFound){
			this.SetScore();
		}
	},
	
	/**
	* Set the global score
	**/
	SetScore : function(){
		this.nbFound++;
		this.score += $('#time').html().replace('s', '') * this.levels[this.indexLevel].time * this.levels[this.indexLevel].level
		$('#score').html(this.score).css('color', '#FF0000').animate({ color: '#000000'}, 1000 );
		if(this.nbFound == this.levels[this.indexLevel].x_max * this.levels[this.indexLevel].y_max/2){
			this.FinishGame('win');
		}
	},
	
	/**
	* Finish the current level
	**/
	FinishGame : function(state){
		$('#start').css('display', 'block').animate({opacity: 0.9}, 500 );
		if(state == 'win'){
			this.StopCountDown();
			$('#msg-endgame').css('color', '#EF5F00');
			$('#msg-endgame').html(this.levels[this.indexLevel].msgWin);
			this.indexLevel++;	
			if(this.indexLevel == this.levels.length){
				$('#bt-start').css('display', 'none');
				$('#continue').css('display', 'none');
			}
		}else{
			$('#msg-endgame').html('You lose. Try again!');
			this.indexLevel = 0;
		}
	},
	
	/**
	* Decrements the level countdown
	**/
	CountDown : function(){
		var objJMG = this;
		if(this.timeLeft < 0){
			this.FinishGame('lose');
		}else{
			this.objToCountdown = window.setTimeout(
				function() {
					$('#time').html(String(objJMG.timeLeft) + 's');
					--objJMG.timeLeft;
					objJMG.CountDown();
				}
				, 1000
			);
		}
	},
	
	/**
	* Stop the level countdown
	**/
	StopCountDown : function(){
		window.clearTimeout(this.objToCountdown);
	}
};



