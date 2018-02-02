import TcxFileParser from './tcxfileparser';
import SpeedMap from './speedmap';
import ScaleComponent from './scalecomponent';

const NON_MAP_ELEMENT_HEIGHTS = 64;

const SetMapHeight = () => {
  const map_height = window.innerHeight - NON_MAP_ELEMENT_HEIGHTS;
  document.getElementById('mapid').style.height = map_height + 'px';
}

SetMapHeight();

window.onresize = () => {
  SetMapHeight();
}

const map = new SpeedMap();

document.getElementById('rsm-file-upload').onchange = (event) => {
  const file_input = document.getElementById('file');
  const file = file_input.files[0];
  const fr = new FileReader();
  fr.onload = () => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(fr.result, "text/xml");
    // a tcx file dom, via xmldom
    new TcxFileParser().addToMap(doc, map);
  };
  fr.readAsText(file);
}

// fetch charleston data
fetch('../data/activity_925308754.tcx').then((response) => {
  return response.text();
}).then((text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/xml");
  // a tcx file dom, via xmldom
  new TcxFileParser().addToMap(doc, map);
});
