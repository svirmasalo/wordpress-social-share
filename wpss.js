/**
* 1 - styleButtons (document.ready)
* 2 - formLinks (styleButtons)
* 3 - initEventHandlers (formLinks)
* 4 - ....
*/

console.log('WordPress Social Share active : https://github.com/svirmasalo/wordpress-social-share');


function formLinks(){

	let links = {
		'facebook':null,
		'twitter':null,
		'linkedin':null
	};
	/**
	* Twitter
	*/
	const twitterMetaData = {
		'dataSize' : 'large',
		'card' : $('head meta[name="twitter:card"]').attr('content'),
		'dataText' : $('head meta[name="twitter:description"]').attr('content'),
		'title' : $('head meta[name="twitter:image"]').attr('content'),
		'dataUrl' : $('head meta[property="og:url"]').attr('content'),
	}

	let twitter_shareUrlQuery = 'https://twitter.com/share?url=' + encodeURIComponent(twitterMetaData.dataUrl) + '&text=' + encodeURIComponent(twitterMetaData.dataText);
	$('#wpss-twitter a').attr('href',twitter_shareUrlQuery);

	/**
	* Facebook
	*/
	const facebookMetaData = {
		'locale' : $('head meta[property="og:locale"]').attr('content'),
		'localeAlt' : $('head meta[property="og:locale:alternate"]').attr('content'),
		'type' : $('head meta[property="og:type"]').attr('content'),
		'title' : $('head meta[property="og:title"]').attr('content'),
		'desc' : $('head meta[property="og:description"]').attr('content'),
		'url' : $('head meta[property="og:url"]').attr('content'),
		'siteName' : $('head meta[property="og:site_name"]').attr('content'),
		// HOX! note that 'last()' -method. It makes sure that the explicitly set image is used
		'image' : $('head meta[property="og:image"]').last().attr('content')
	}
	let facebook_shareUrlQuery = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(facebookMetaData.url)+'&t='+encodeURIComponent(facebookMetaData.title);
	$('#wpss-facebook a').attr('href',facebook_shareUrlQuery);
	/**
	* Pinterest
	*/
	const pinterestAttributes = {
		'type':'text/javascript',
		'charset':'UTF-8',
		'src' : 'https://assets/pinterest.com/js/pinmarklet.js'
	}
	const pinterestElement = document.createElement('script');
	$(pinterestElement).attr(pinterestAttributes);
	document.body.appendChild(pinterestElement);

	let pinterest_shareUrlQuery = "https://www.pinterest.com/pin/create/button/";

	/**
	* Linkedin
	*/
	const linkedinMetaData = {
		'url' : facebookMetaData.url,
		'title' : facebookMetaData.title,
		'summary' : facebookMetaData.desc /*+ ' ' + facebookMetaData.image*/,
		'source' : $('head title').html()
	}
	const linkedinShareBaseUrl = 'https://www.linkedin.com/shareArticle?mini=true&';
	let linkedin_shareUrlQuery = 
		linkedinShareBaseUrl +
		'&url=' + encodeURIComponent(linkedinMetaData.url) +
		'&title=' + encodeURIComponent(linkedinMetaData.title) +
		'&summary=' + encodeURIComponent(linkedinMetaData.summary) +
		'&source=' + encodeURIComponent(linkedinMetaData.source);
	$('#wpss-linkedin a').attr('href',linkedin_shareUrlQuery);

	links.facebook = facebook_shareUrlQuery;
	links.twitter = twitter_shareUrlQuery;
	links.linkedin = linkedin_shareUrlQuery;
	links.pinterest = pinterest_shareUrlQuery;


	createWpssBlock(links);
	
}


/**
* Form renderable element
*/

function createWpssBlock(links){
	/**
	* Structure:
	* section.wpss-wrap
	*  |- figure#wpss-facebook
	*   |--a
	*  |- figure#wpss-twitter
	*   |--a
	*  |- figure#wpss-linkedin
	*   |--a
	*  |- figure#wpss-pinterest
	*   |--a
	*/
	const container = document.createElement('SECTION');
	container.id = 'wpss-wrap';

	
	let figures = [];

	let figure = function(network){
		thisFig = document.createElement('FIGURE');
		thisFig.id = 'wpss-' + network;
		figures.push(thisFig);
		return thisFig;
	}
	let href = function(link){
		thisLink = document.createElement('A');
		thisLink.href = link;
		return thisLink;
	}
	fbFigure = new figure('facebook');
	twitteFigure = new figure('twitter');
	linkedinFigure = new figure('linkedin');
	pinterestFigure = new figure('pinterest');

	fbFigure.append(href(links.facebook));
	twitteFigure.append(href(links.twitter));
	linkedinFigure.append(href(links.linkedin));
	pinterestFigure.append(href(links.pinterest));

	for(let f of figures){
		console.log(f);
		container.append(f);
	}

	/**
	* Append created block into body
	*/
	const target = document.getElementsByTagName('MAIN')[0];
	//target.append(container);
	$(container).insertAfter('main header');



	styleButtons('local','black');

}


function styleButtons(iconSrc, color){


	const spriteUrl = '../images/some-logosprite-'+ color + '-full.png';
	const spriteNegaUrl = '../images/some-logosprite-'+ color + '-full.png';
	const buttonSize = $('#wpss-wrap figure').width();

	const spritePositions = {
		'twitter' : 'center 0',
		'linkedin' : 'center -' + buttonSize + 'px',
		'pinterest' : 'center -' + buttonSize*2 + 'px',
		'facebook': 'center -' + buttonSize*3 + 'px'
	};

	if (iconSrc == 'local'){
		$('#wpss-wrap figure a').each(function(k,v){
			$(this).css('background-image','url(' + spriteUrl + ')');
		});

		$('#wpss-twitter a').css('background-position',spritePositions.twitter);
		$('#wpss-linkedin a').css('background-position',spritePositions.linkedin);
		$('#wpss-facebook a').css('background-position',spritePositions.facebook);
		$('#wpss-pinterest a').css('background-position',spritePositions.pinterest);
	}
	if (iconSrc == 'fa'){
		
		$('#wpss-twitter a').html('<i class="fa fa-twitter fa-lg"></i>').attr('href','https://twitter.com/share?');
		$('#wpss-linkedin a').html('<i class="fa fa-linkedin fa-lg"></i>');
		$('#wpss-facebook a').html('<i class="fa fa-facebook fa-lg"></i>');
		$('#wpss-pinterest a').html('<i class="fa fa-pinterest fa-lg"></i>');		
		
	}

	initEventHandlers();

}



function initEventHandlers(){

	$('#wpss-twitter a').on('click',function(e){
		e.preventDefault();
		$(this).blur();
		window.open($(this).attr('href'), 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=300,top=200,left=" + ($(window).innerWidth() - 700) / 2);
	});
	$('#wpss-facebook a').on('click',function(e){
		e.preventDefault();
		$(this).blur();
		window.open($(this).attr('href'), 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=300,top=200,left=" + ($(window).innerWidth() - 700) / 2);
	});
	$('#wpss-pinterest a').on('click',function(e){
		e.preventDefault();
		$(this).blur();
		window.open($(this).attr('href'), 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=300,top=200,left=" + ($(window).innerWidth() - 700) / 2);
	});
	$('#wpss-linkedin a').on('click',function(e){
		e.preventDefault();
		$(this).blur();
		window.open($(this).attr('href'), 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=700,height=300,top=200,left=" + ($(window).innerWidth() - 700) / 2);
	});	

	/**
	* Disable unwanted
	*/
	/*
	$('#wpss-pinterest a').css('cursor','not-allowed');
	$('#wpss-pinterest a').on('click',function(e){
		e.preventDefault();
	});
	*/

}



$(document).ready(function(){
	formLinks();
	//createWpssBlock();
	
});