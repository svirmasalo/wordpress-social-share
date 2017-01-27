console.log('WordPress Social Share active : https://github.com/svirmasalo/wordpress-social-share');


function formLinks(placeInDom,iconSrc){
	console.log(iconSrc);

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
	/**
	* Pinterest
	*/
	const pinterestUrlParameters ={
		pinUrl : facebookMetaData.url,
		pinImg : facebookMetaData.image,
		pinDesc : facebookMetaData.title
	}
	const pinterestShareAttributes = {
		'data-do-pin':'buttonPin',
	}

	let pinterest_shareUrlQuery = "https://www.pinterest.com/pin/create/button/?"+
		"url="+encodeURIComponent(pinterestUrlParameters.pinUrl) +
		"&media="+encodeURIComponent(pinterestUrlParameters.pinImg) +
		"&description="+encodeURIComponent(pinterestUrlParameters.pinDesc);
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



	let createLinkElement = function(link,attr){

		let thisLink = document.createElement('A');

		if (attr != '' && attr != null){
			$(thisLink).attr(attr);
		}

		thisLink.href = link;
		return thisLink;
	}

	let facebookLinkElement = new createLinkElement(facebook_shareUrlQuery,null);
	let linkedinkLinkElement = new createLinkElement(linkedin_shareUrlQuery,null);
	let twitterLinkElement = new createLinkElement(twitter_shareUrlQuery,null);
	let pinterestLinkElement = new createLinkElement(pinterest_shareUrlQuery,pinterestShareAttributes);

	links.facebook = facebookLinkElement;
	links.twitter = linkedinkLinkElement;
	links.linkedin = twitterLinkElement;
	links.pinterest = pinterestLinkElement;

	createWpssBlock(links,placeInDom, iconSrc);
	
}

/**
* Form renderable element
*/

function createWpssBlock(links, placeInDom, iconSrc){
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
		let thisFig = document.createElement('FIGURE');
		thisFig.id = 'wpss-' + network;
		figures.push(thisFig);
		return thisFig;
	}
	let fbFigure = new figure('facebook');
	let twitteFigure = new figure('twitter');
	let linkedinFigure = new figure('linkedin');
	let pinterestFigure = new figure('pinterest');

	fbFigure.append(links.facebook);
	twitteFigure.append(links.twitter);
	linkedinFigure.append(links.linkedin);
	pinterestFigure.append(links.pinterest);

	for(let f of figures){
		container.append(f);
	}

	/**
	* Append created block into body
	*/
	if(typeof placeInDom === 'string'){
		const target = document.getElementsByTagName(placeInDom)[0];
		target.append(container);
	}else{
		$(container).insertAfter(placeInDom);
	}

	styleButtons(iconSrc,'black',);

}

function styleButtons(iconSrc, color){
	console.log(iconSrc);
	/**
	* Just a few style things if you are not using font awesome
	*/ 

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

}


/**
* Call wpss from here or from document
*/

/*
$(document).ready(function(){
	formLinks($('main header')); //Element to append this into
});
*/