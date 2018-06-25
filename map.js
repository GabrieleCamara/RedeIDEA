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
  var OMS_Grayscale =   L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  	maxZoom: 19,
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  // MiniMap
  var miniMap = new L.Control.MiniMap(OMS_Grayscale).addTo(mapa);

  // Adicionando os wms ao mapa - IDE
  // L.tileLayer.wms('http://webserver.geomatica.ufpr.br/geoserver/wms',
  // {layers: 'geonode:ide',
  // transparent: 'true',
  // format: 'image/png'
  // }).addTo(mapa);

  // Adicionando os wms ao mapa - PORTAIS
//   L.tileLayer.wms('http://webserver.geomatica.ufpr.br/geoserver/wms',
//   {layers: 'geonode:portais',
//   transparent: 'true',
//   format: 'image/png'
// }).addTo(mapa);

// Simbologia dos pontos em geoJSON
// Criando a classe dos símbolos personalizados
  var Simbolo = L.Icon.extend ({
    options: {
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [-5, -24]
      }
    });

// Armazenando as imagens svg em um vetor
  var simbolo = [];
  for(var i=0; i<=2; i++) {
    simbolo[i] = new Simbolo({iconUrl: "simbolos/" + i + ".png"});
  }

// Adicionando os geojson ao mapa - IDE
  L.geoJSON(ide, {
  pointToLayer: function (feicao, posicao) {
    return L.marker(posicao, {icon: simbolo[2]});
  },
  onEachFeature: function (feicao, camada) {
    camada.bindPopup(feicao.properties.nome + " (" + feicao.properties.sigla + ")" + "</br><b>Link IDE:</b> " + feicao.properties.link_ide);
  }
}).addTo(mapa);

// Adicionando os geojson ao mapa - PORTAIS
  L.geoJSON(portais, {
  pointToLayer: function (feicao, posicao) {
    return L.marker (posicao, {icon: simbolo[1]});
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


  // Adicionando os geojson ao mapa - BRASIL
  // L.geoJSON(brasil, {
  //   style: function (feicao) {
  //     return {
  //       color: "#7d7d7d",
  //       weight: 1,
  //       fill: false
  //     }
  //   }
  // }).addTo(mapa);

}
