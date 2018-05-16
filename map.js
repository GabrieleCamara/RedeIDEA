window.onload = function() {
  // Variável do Mapa
  var mapa = L.map("mapa", {
    center: [-15.15, -54.95],
    zoom: 4
  });

  // Base cartográfica adicionada ao mapa
  var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

  // Base cartográfica para o minimap
  var OMS_Grayscale = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

  // MiniMap
  var miniMap = new L.Control.MiniMap(OMS_Grayscale).addTo(mapa);

  // Adicionando os geojson ao mapa - IDE
  L.geoJSON(ide, {
    function (feicao, posicao) {
      return L.marker(posicao);
    },
    onEachFeature: function (feicao, camada) {
      camada.bindPopup(feicao.properties.nome + " (" + feicao.properties.sigla + ")" + "</br><b>Link IDE:</b> " + feicao.properties.link_ide);
    }
  }).addTo(mapa);

  // Adicionando os geojson ao mapa - PORTAIS
  L.geoJSON(portais, {
    function (feicao, posicao) {
      return L.marker (posicao);
    },
    onEachFeature: function (feicao, camada) {
        camada.bindPopup(feicao.properties.nome + " (" + feicao.properties.sigla + ")"+ "<br/><b>Link Portal: </b> " + feicao.properties.link_ide);
    }
  }).addTo(mapa);

  // Adicionando os geojson ao mapa - BRASIL
  L.geoJSON(brasil, {
    style: function (feicao) {
      return {
        color: "#7d7d7d",
        weight: 1,
        fill: false
      }
    }
  }).addTo(mapa);

}
