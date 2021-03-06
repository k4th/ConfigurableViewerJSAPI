define([
	'esri/InfoTemplate',
	'esri/units',
	'esri/geometry/Extent',
	'esri/config',
	'esri/tasks/GeometryService'
], function(InfoTemplate, units, Extent, esriConfig, GeometryService) {

	// url to your proxy page, must be on same machine hosting you app. See proxy folder for readme.
	esriConfig.defaults.io.proxyUrl = 'proxy/proxy.ashx';
	esriConfig.defaults.io.alwaysUseProxy = false;
	// url to your geometry server.
	esriConfig.defaults.geometryService = new GeometryService('http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer');

	return {
		//default mapClick mode, mapClickMode lets widgets know what mode the map is in to avoid multipult map click actions from taking place (ie identify while drawing).
		defaultMapClickMode: 'identify',
		// map options, passed to map constructor. see: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
		mapOptions: {
			basemap: 'streets',
			center: [-96.59179687497497, 39.09596293629694],
			zoom: 5,
			sliderStyle: 'small'
		},
		// operationalLayers: Array of Layers to load on top of the basemap: valid 'type' options: 'dynamic', 'tiled', 'feature'.
		// The 'options' object is passed as the layers options for constructor. Title will be used in the legend only. id's must be unique and have no spaces.
		// 3 'mode' options: MODE_SNAPSHOT = 0, MODE_ONDEMAND = 1, MODE_SELECTION = 2
		operationalLayers: [{
			type: 'feature',
			url: 'http://services1.arcgis.com/g2TonOxuRkIqSOFx/arcgis/rest/services/MeetUpHomeTowns/FeatureServer/0',
			title: 'STLJS Meetup Home Towns',
			options: {
				id: 'meetupHometowns',
				opacity: 1.0,
				visible: true,
				outFields: ['*'],
				infoTemplate: new InfoTemplate('Hometown', '${*}'),
				mode: 0
			},
			editorLayerInfos: {
				disableGeometryUpdate: false
			}
		}, {
			type: 'dynamic',
			url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/PublicSafety/PublicSafetyOperationalLayers/MapServer',
			title: 'Louisville Public Safety',
			slider: true,
			noLegend: false,
			collapsed: false,
			options: {
				id: 'louisvillePubSaftey',
				opacity: 1.0,
				visible: true
			}
		}, {
			type: 'dynamic',
			url: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/DamageAssessment/MapServer',
			title: 'Damage Assessment',
			slider: true,
			noLegend: false,
			collapsed: false,
			options: {
				id: 'DamageAssessment',
				opacity: 1.0,
				visible: true
			}
		}],
		// set include:true to load. For titlePane type set position the the desired order in the sidebar
		widgets: {
			growler: {
				include: true,
				id: 'growler',
				widgetType: 'domNode',
				widgetClass: 'gis/dijit/Growler',
				srcNodeRef: 'growlerDijit',
				options: {}
			},
			geocoder: {
				include: true,
				id: 'geocoder',
				widgetType: 'domNode',
				widgetClass: 'esri/dijit/Geocoder',
				srcNodeRef: 'geocodeDijit',
				options: {
					map: true,
					autoComplete: true
				}
			},
			identify: {
				include: true,
				id: 'identify',
				widgetType: 'invisible',
				widgetClass: 'gis/dijit/identify',
				options: {
					map: true,
					mapClickMode: true,
					identifyTolerance: 5
				}
			},
			basemaps: {
				include: true,
				id: 'basemaps',
				widgetType: 'domNode',
				widgetClass: 'gis/dijit/Basemaps',
				srcNodeRef: 'basemapsDijit',
				options: {
					map: true,
					mode: 'agol', //must be either 'agol' or 'custom'
					title: 'Basemaps',
					mapStartBasemap: null, //valid options for 'agol' mode: null, 'streets', 'satellite', 'hybrid', 'topo', 'gray', 'oceans', 'national-geographic', 'osm'
					basemapsToShow: ['streets', 'satellite', 'hybrid', 'topo', 'gray', 'oceans', 'national-geographic', 'osm'] //basemaps to show in menu. If 'agol' mode use valid values from above, if 'custom' mode then define in basmaps dijit and refrenc by name here
				}
			},
			scalebar: {
				include: true,
				id: 'scalebar',
				widgetType: 'map',
				widgetClass: 'esri/dijit/Scalebar',
				options: {
					map: true,
					attachTo: 'bottom-left',
					scalebarStyle: 'line',
					scalebarUnit: 'dual'
				}
			},
			locateButton: {
				include: true,
				id: 'locateButton',
				widgetType: 'domNode',
				widgetClass: 'gis/dijit/LocateButton',
				srcNodeRef: 'locateButton',
				options: {
					map: true,
					highlightLocation: true,
					useTracking: true,
					geolocationOptions: {
						maximumAge: 0,
						timeout: 15000,
						enableHighAccuracy: true
					}
				}
			},
			overviewMap: {
				include: true,
				id: 'overviewMap',
				widgetType: 'map',
				widgetClass: 'esri/dijit/OverviewMap',
				options: {
					map: true,
					attachTo: 'bottom-right',
					color: '#0000CC',
					height: 100,
					width: 125,
					opacity: 0.30,
					visible: false
				}
			},
			homeButton: {
				include: true,
				id: 'homeButton',
				widgetType: 'domNode',
				widgetClass: 'esri/dijit/HomeButton',
				srcNodeRef: 'homeButton',
				options: {
					map: true,
					extent: new Extent({
						xmin: -180,
						ymin: -85,
						xmax: 180,
						ymax: 85,
						spatialReference: {
							wkid: 4326
						}
					})
				}
			},
			legend: {
				include: true,
				id: 'legend',
				widgetType: 'titlePane',
				widgetClass: 'esri/dijit/Legend',
				title: 'Legend',
				open: false,
				position: 0,
				options: {
					map: true,
					legendLayerInfos: true
				}
			},
			TOC: {
				include: true,
				id: 'toc',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/TOC',
				title: 'Layers',
				open: false,
				position: 1,
				options: {
					map: true,
					tocLayerInfos: true
				}
			},
			bookmarks: {
				include: true,
				id: 'bookmarks',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Bookmarks',
				title: 'Bookmarks',
				open: false,
				position: 2,
				options: {
					map: true,
					editable: true
				}
			},
			draw: {
				include: true,
				id: 'draw',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Draw',
				title: 'Draw',
				open: false,
				position: 3,
				options: {
					map: true,
					mapClickMode: true
				}
			},
			measure: {
				include: true,
				id: 'measurement',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Measurement',
				title: 'Measurement',
				open: false,
				position: 4,
				options: {
					map: true,
					mapClickMode: true,
					defaultAreaUnit: units.SQUARE_MILES,
					defaultLengthUnit: units.MILES
				}
			},
			print: {
				include: true,
				id: 'print',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Print',
				title: 'Print',
				open: false,
				position: 5,
				options: {
					map: true,
					printTaskURL: 'http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
					copyrightText: 'Copyright 2014',
					authorText: 'Me',
					defaultTitle: 'Viewer Map',
					defaultFormat: 'PDF',
					defaultLayout: 'Letter ANSI A Landscape'
				}
			},
			directions: {
				include: true,
				id: 'directions',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Directions',
				title: 'Directions',
				open: false,
				position: 6,
				options: {
					map: true,
					options: {
						routeTaskUrl: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Route',
						routeParams: {
							directionsLanguage: 'en-US',
							directionsLengthUnits: units.MILES
						}
					}
				}
			},
			editor: {
				include: true,
				id: 'editor',
				widgetType: 'titlePane',
				widgetClass: 'gis/dijit/Editor',
				title: 'Editor',
				open: false,
				position: 7,
				options: {
					map: true,
					mapClickMode: true,
					editorLayerInfos: true,
					settings: {
						toolbarVisible: true,
						showAttributesOnClick: true,
						enableUndoRedo: true,
						createOptions: {
							polygonDrawTools: ['freehandpolygon', 'autocomplete']
						},
						toolbarOptions: {
							reshapeVisible: true,
							cutVisible: true,
							mergeVisible: true
						}
					}
				}
			},
			streetview: {
				include: true,
				id: 'streetview',
				widgetType: 'floating',
				widgetClass: 'gis/dijit/StreetView',
				title: 'Google Street View',
				options: {
					map: true,
					mapClickMode: true,
					openOnStartup: true
				}
			}
		}
	};
});