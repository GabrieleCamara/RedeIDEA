window.onload = function() {
  // Variável do Mapa
  var mapa = L.map('mapa', {
    center: [-15.15, -54.95],
    zoom: 4
  });

  // Base cartográfica adicionada ao mapa
  var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);

  // Base cartográfica para o minimap
  var OMS_Grayscale =   L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  	maxZoom: 19,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  // MiniMap
  var miniMap = new L.Control.MiniMap(OMS_Grayscale).addTo(mapa);

// Simbologia dos pontos em geoJSON
// Simbologia circulo para os pontos da camada IDE
var circleToIDE = {
    radius: 5,
    fillColor: "#008080",
    color: "#000",
    weight: 0.4,
    opacity: 1,
    fillOpacity: 0.8
};

// Simbologia circulo para os pontos da camada portais
var circleToPortais = {
    radius: 5,
    fillColor: "#ff8247",
    color: "#000",
    weight: 0.4,
    opacity: 1,
    fillOpacity: 0.8
};

// Adicionando os geojson ao mapa - IDE
  L.geoJSON(part, {
  pointToLayer: function (feicao, posicao) {
    return L.circleMarker(posicao, circleToIDE);
  },
  onEachFeature: function (feicao, camada) {
    camada.bindPopup(feicao.properties.nome + " (" + feicao.properties.sigla + ")" + "</br><b>Link IDE:</b> " + feicao.properties.link);
  }
}).addTo(mapa);

// Adicionando os geojson ao mapa - PORTAIS
  L.geoJSON(n_part, {
  pointToLayer: function (feicao, posicao) {
    return L.circleMarker(posicao, circleToPortais);
  },
  onEachFeature: function (feicao, camada) {
      camada.bindPopup(feicao.properties.nome + " (" + feicao.properties.sigla + ")"+ "<br/><b>Link Portal: </b> " + feicao.properties.link);
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
