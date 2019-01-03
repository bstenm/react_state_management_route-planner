(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{37:function(e,t,a){e.exports=a(86)},42:function(e,t,a){},48:function(e,t,a){},50:function(e,t,a){},52:function(e,t,a){},54:function(e,t,a){},56:function(e,t,a){},58:function(e,t,a){},86:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(32),i=a.n(o),l=(a(42),a(9)),c=(a(48),a(15)),s=a(36),p=a(1),u=a(2),d=a(4),g=a(3),f=a(5),m={mapLib:{js:{endPoint:"https://unpkg.com/leaflet@1.3.4/dist/leaflet.js",integrity:"sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="},css:{endPoint:"https://unpkg.com/leaflet@1.3.4/dist/leaflet.css",integrity:"sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="}},tileLayer:{id:"mapbox.outdoors",url:"https://a.tile.hosted.thunderforest.com/komoot-2/{z}/{x}/{y}.png",maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, Imagery \xa9 <a href="https://www.mapbox.com/">Mapbox</a>'},googleMapApi:{url:"https://maps.googleapis.com/maps/api/js",version:3.36},zoom:11,latitude:47.6,longitude:10.8,mapIconSize:[20,20],polyLineColor:"#007ed3",polylineWeight:4},y=a(13),v=a.n(y),h=console,O=function(e){return function(t){function a(e){var t;return Object(p.a)(this,a),(t=Object(d.a)(this,Object(g.a)(a).call(this,e))).buildUrl=function(){var e=m.googleMapApi,t=e.url,a={key:"AIzaSyAW1suvPj_eB7UX2zCagawL8OoZ59KHb2w",v:e.version,libraries:"places"},n=Object.keys(a).filter(function(e){return!!a[e]}).map(function(e){return"".concat(e,"=").concat(a[e])}).join("&");return"".concat(t,"?").concat(n)},t.state={googleMap:null,googleMapError:null},t}return Object(f.a)(a,t),Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;v()(this.buildUrl(),{success:function(){e.setState({googleMap:window.google.maps,googleMapError:null})},error:function(){var t="Could not load the Google Elevation Service";h.error(t),e.setState({googleMapError:t,googleMap:null})}})}},{key:"render",value:function(){var t=Object.assign({},this.props,this.state);return r.a.createElement(e,t)}}]),a}(r.a.Component)},b=(a(50),function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).initialiseMap=function(){var e=a.props.Leaflet,t=m.latitude,n=m.longitude,r=m.zoom,o=m.tileLayer,i=o.url,l=Object(s.a)(o,["url"]);a.map=e.map(a.node),a.map.setView([t,n],r),e.tileLayer(i,Object(c.a)({},l,{accessToken:"pk.eyJ1IjoiYnN0ZW5tIiwiYSI6ImNqcHB5YXcybTBvM3c0NW9nMng4M2s4MmoifQ.sFeV3UbPuiyznXU47qBsZQ"})).addTo(a.map),a.map.on("click",function(e){a.getElevationData(e.latlng,a.props.addWaypoint)})},a.getElevationData=function(e,t){var n=e.lat,r=e.lng;(new a.props.googleMap.ElevationService).getElevationForLocations({locations:[e]},function(e,a){var o,i=[n,r];"OK"===a&&e[0]&&(o=e[0].elevation,i=[n,r,o]),t(i)})},a.updateMapMarkers=function(){var e=[],t=[],n=a.props,r=n.Leaflet,o=n.waypointList,i=n.updateGeoJsonData;if(a.markerGroup&&a.markerGroup.clearLayers(),o.forEach(function(n,o){var i=r.divIcon({className:"black-dot",iconSize:m.mapIconSize,html:o+1}),l=r.marker(n,{icon:i,draggable:!0});l.on("dragend",function(e){var t=e.target._latlng,n=t.lat,r=t.lng;a.getElevationData({lat:n,lng:r},function(e){a.props.updateWaypoint({idx:o,data:e})})}),t.push(l),e.push(n)}),a.markerGroup=r.layerGroup(t),e.length>1){var l=r.polyline(e,{color:m.polyLineColor,weight:m.polylineWeight});a.markerGroup.addLayer(l)}a.markerGroup.addTo(a.map),i(a.markerGroup.toGeoJSON())},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props,a=t.Leaflet,n=t.googleMap,r=t.waypointList;this.error||!a||!n||e.Leaflet===a&&e.googleMap===n?JSON.stringify(r)!==JSON.stringify(e.waypointList)&&this.updateMapMarkers():this.initialiseMap()}},{key:"render",value:function(){var e=this,t=this.props,a=t.leafletError,n=t.googleMapError,o=a||n;return r.a.createElement("div",{className:"MapContainer"},o?r.a.createElement("span",{className:"MapContainer__error"},o," :("):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{ref:function(t){e.node=t},className:"MapContainer__map"}),r.a.createElement("div",{className:"MapContainer__loader"})))}}]),t}(r.a.Component));b.defaultProps={Leaflet:null,googleMap:null,leafletError:null,googleMapError:null,waypointList:[]};var E=Object(l.b)(function(e){return{waypointList:e.waypointList}},{addWaypoint:function(e){return{type:"ADD_WAYPOINT",payload:e}},updateWaypoint:function(e){return{type:"UPDATE_WAYPOINT",payload:e}}})(O(b)),w=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={Leaflet:null,leafletError:null},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=m.mapLib,a=t.js,n=t.css;v()([n.endPoint,a.endPoint],{async:!1,before:function(e,t){t.crossOrigin="",e===a.endPoint&&(t.integrity=a.integrity),e===n.endPoint&&(t.integrity=n.integrity)},success:function(){e.setState({Leaflet:window.L,leafletError:null})},error:function(){h.error("Could not load the map"),e.setState({leafletError:"Could not load the map",Leaflet:null})}})}},{key:"render",value:function(){return this.props.children(this.state)}}]),t}(r.a.Component),j=(a(52),a(14)),D=(a(54),a(56),a(34)),L=a.n(D),M=function(e){var t=e.id,a=e.remove,n=e.onDragStart,o=e.draggedOn;return r.a.createElement("li",{id:t,draggable:"true",onDragStart:n,className:L()("WaypointItem",{draggedOn:o})},r.a.createElement("i",{className:"fas fa-arrows-alt",title:"move"}),"Waypoint ",t+1,r.a.createElement("i",{title:"remove",className:"fas fa-trash-alt pull-right",onClick:function(){return a(t)},onKeyDown:function(){return a(t)},role:"button",tabIndex:"0"}))},I=function(e){var t=e.waypointList,a=e.removeWaypoint,n=e.onDrop,o=e.onDragOver,i=e.onDragStart,l=e.draggedOnId;return r.a.createElement("div",{onDrop:n,onDragOver:o,className:"WaypointList"},t.length?r.a.createElement("ul",null,t.map(function(e,t){var n=Object(j.a)(e,1)[0];return r.a.createElement(M,{id:t,key:n,remove:a,onDragStart:i,draggedOn:l===t})})):r.a.createElement("div",{className:"guidelines"},"Click on the map to add waypoints to your itinerary"))};I.defaultProps={waypointList:[],draggedOnId:null};var k=I,W=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={draggedOnId:null},a.onDragStart=function(e){e.dataTransfer.setData("text/plain",e.target.id)},a.onDragOver=function(e){e.preventDefault(),e.dataTransfer.dropEffect="move";var t=e.target.id;t=t||"0"===t?t:a.props.waypointList.length-1,t=parseInt(t,10),a.state.draggedOnId!==t&&a.setState({draggedOnId:t})},a.onDrop=function(e){e.preventDefault(),a.setState({draggedOnId:null});var t=e.dataTransfer.getData("text/plain"),n=e.target.id||a.props.waypointList.length-1;t!==n&&a.props.sortWaypoints({draggedId:t,droppedOnId:n})},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(k,{waypointList:this.props.waypointList,removeWaypoint:this.props.removeWaypoint,draggedOnId:this.state.draggedOnId,onDragOver:this.onDragOver,onDragStart:this.onDragStart,onDrop:this.onDrop})}}]),t}(r.a.Component);W.defaultProps={waypointList:[]};var S=Object(l.b)(function(e){return{waypointList:e.waypointList}},{removeWaypoint:function(e){return{type:"REMOVE_WAYPOINT",payload:e}},sortWaypoints:function(e){return{type:"SORT_WAYPOINTS",payload:e}}})(W),A=r.a.createContext({}),N=function(e){function t(){var e,a;Object(p.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(d.a)(this,(e=Object(g.a)(t)).call.apply(e,[this].concat(r)))).state={geoJsonData:{}},a.updateGeoJsonData=function(e){a.setState(function(){return{geoJsonData:e}})},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(A.Provider,{value:Object(c.a)({},this.state,{updateGeoJsonData:this.updateGeoJsonData})},this.props.children)}}]),t}(r.a.Component),P=(a(58),a(35)),C=a.n(P),T=a(20),x=a.n(T),J=function(e){var t=e.geoJsonData;return r.a.createElement("div",{className:"WaypointPanelHeader"},"Route Builder",!x()(t)&&!x()(t.features)&&r.a.createElement("a",{href:"data:text/xml;charset=utf-8,".concat(encodeURIComponent(C()(t))),download:"route.xml",title:"download gpx"},r.a.createElement("i",{className:"fa fa-download download-btn"})))},G=function(){return r.a.createElement(A.Consumer,null,function(e){var t=e.geoJsonData;return r.a.createElement(J,{geoJsonData:t})})},_=function(){return r.a.createElement("div",{className:"WaypointPanel"},r.a.createElement(G,null),r.a.createElement(S,null))},Y=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(N,null,r.a.createElement(w,null,function(e){return r.a.createElement(A.Consumer,null,function(t){return r.a.createElement(E,Object.assign({},e,{updateGeoJsonData:t.updateGeoJsonData}))})}),r.a.createElement(_,null)))},z=a(7),R=a(21),U=Object(z.c)({waypointList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case"ADD_WAYPOINT":return e.concat([n]);case"REMOVE_WAYPOINT":return e.filter(function(e,t){return t!==n});case"SORT_WAYPOINTS":var r=n.draggedId,o=n.droppedOnId,i=Object(R.a)(e),l=i.splice(r,1),c=Object(j.a)(l,1)[0];return i.splice(o,0,c),i;case"UPDATE_WAYPOINT":var s=n.idx,p=n.data,u=Object(R.a)(e);return u.splice(s,1),u.splice(s,0,p),u;default:return e}}}),Z=z.d.apply(void 0,[z.a.apply(void 0,[])].concat([])),B=Object(z.e)(U,{},Z);i.a.render(r.a.createElement(l.a,{store:B},r.a.createElement(Y,null)),document.getElementById("root"))}},[[37,2,1]]]);
//# sourceMappingURL=main.5271d786.chunk.js.map