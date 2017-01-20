console.log('"I am here"');


function initButtons(iconSrc, color){


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

	appendShares();

}

function appendShares(){
	const twitterMetaData = {
		'dataSize' : 'large',
		'card' : $('head meta[name="twitter:card"]').attr('content'),
		'dataText' : $('head meta[name="twitter:description"]').attr('content'),
		'title' : $('head meta[name="twitter:image"]').attr('content'),
		'dataUrl' : $('head meta[property="og:url"]').attr('content'),
	}

	let twitter_shareUrlQuery = 'url=' + encodeURIComponent(twitterMetaData.dataUrl) + '&text=' + encodeURIComponent(twitterMetaData.dataText);
	$('#wpss-twitter a').attr('href','https://twitter.com/share?'+twitter_shareUrlQuery);

	const facebookMetaData = {
		'locale' : $('head meta[property="og:locale"]').attr('content'),
		'localeAlt' : $('head meta[property="og:locale:alternate"]').attr('content'),
		'type' : $('head meta[property="og:type"]').attr('content'),
		'title' : $('head meta[property="og:title"]').attr('content'),
		'desc' : $('head meta[property="og:description"]').attr('content'),
		'url' : $('head meta[property="og:url"]').attr('content'),
		'siteName' : $('head meta[property="og:site_name"]').attr('content'),
		'image' : $('head meta[property="og:image"]').attr('content')
	}
	let facebook_shareUrlQuery = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(facebookMetaData.url)+'&t='+encodeURIComponent(facebookMetaData.title);
	$('#wpss-facebook a').attr('href',facebook_shareUrlQuery);

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

	$('#wpss-linkedin a, #wpss-pinterest a').css('cursor','not-allowed');
	$('#wpss-linkedin a, #wpss-pinterest a').on('click',function(e){
		e.preventDefault();
	});

}


$(document).ready(function(){
	initButtons('local','black');
});