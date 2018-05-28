	
	'use strict';	
	
	// CHECK WINDOW RESIZE
	var is_windowresize = false;
	$(window).resize(function(){
		is_windowresize = true;
	});
	
	
	//INITIALIZE MAP
	function initialize() {
		
		//DEFINE MAP OPTIONS
		//=======================================================================================
  		var mapOptions = {
    		zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP,	
    		center: new google.maps.LatLng(-20.7185421,-46.6106316),
			panControl: true,
  			zoomControl: true,
  			mapTypeControl: true,
  			//scaleControl: false,
  			streetViewControl: true,
  			overviewMapControl: true,
			//rotateControl:true,
			
  		};

		//CREATE NEW MAP
		//=======================================================================================
  		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		//MARKER ICON
		//=======================================================================================
		//var image = 'facebook30.svg';
		
		//ADD NEW MARKER
		//=======================================================================================
  		/*var marker = new google.maps.Marker({
    		position: map.getCenter(),
   		 	map: map,
    		title: 'Click to zoom',
			icon: image
  		});
		
		var marker1 = new google.maps.Marker({
    		position: new google.maps.LatLng(-12.042559, -77.027426),
   		 	map: map,
    		title: 'Click to zoom'
  		});*/
		
		
		//ADD NEW MARKER WITH LABEL
		//=======================================================================================
		var marker1 = new MarkerWithLabel({
       		position: new google.maps.LatLng(-20.719115, -46.610582),
       		draggable: false,
       		raiseOnDrag: false,
       		icon: ' ',
       		map: map, 
         	labelContent: '<div class="de-icon circle medium-size" style="background-color:#f0394d"><i class="de-icon-bell-alt" style="color:#fff"></i></div>',
       		labelAnchor: new google.maps.Point(29, 20),
       		labelClass: "labels" // the CSS class for the label
     		});
    
		var marker2 = new MarkerWithLabel({
       		position: new google.maps.LatLng(-20.7177572,-46.6103941),
       		draggable: false,
       		raiseOnDrag: false,
       		icon: ' ',
       		map: map, 
         	labelContent: '<div class="de-icon circle small-size" style="background-color:#f09422"><i class="de-icon-food" style="color:#fff"></i></div>',
       		labelAnchor: new google.maps.Point(0, 0),
       		labelClass: "labels" // the CSS class for the label
     		});
			

    	//marker.setMap( map );
		
		

		//ON MARKER CLICK EVENTS
		//=======================================================================================
  		google.maps.event.addListener(marker1, 'click', function() {
   	 		map.setZoom(17);
    		map.setCenter(marker.getPosition());
			infowindow.open(map,marker);
  		});
		
		google.maps.event.addListener(marker2, 'click', function() {
   	 		map.setZoom(17);
    		map.setCenter(marker.getPosition());
			infowindow1.open(map,marker1);
  		});

		//ON BOUND EVENTS AND WINDOW RESIZE
		//=======================================================================================
		google.maps.event.addListener(map, 'bounds_changed', function() {  		
			if (is_windowresize)
			{
				//map.setCenter(marker.getPosition());
				window.setTimeout(function() {
      				map.panTo(marker1.getPosition());
    			}, 500);
			}
			is_windowresize=false;
		});
	}

	// LOAD GMAP
	google.maps.event.addDomListener(window, 'load', initialize);
	
	
