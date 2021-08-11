import { Loader } from "@googlemaps/js-api-loader";

const officeCoords: google.maps.LatLngLiteral = { lat: 50.026349549948726, lng: 36.21991355607748 };
const loader = new Loader({
    apiKey: "AIzaSyD43rabCWh3DXuaexPLv1178qsFecmazKI",
    version: "weekly"
});

loader.load().then(() => initMap());

function initMap(): void {
    const map: google.maps.Map = new google.maps.Map(document.getElementById("map"), {
        center: officeCoords,
        zoom: 15,
        styles: [
            {
                elementType: "geometry",
                stylers: [{ color: "#242f3e" }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
    });
    const marker: google.maps.Marker = new google.maps.Marker({
        map,
        position: officeCoords,
        title: "We are here!"
    })
};
