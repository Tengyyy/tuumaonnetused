import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';

import Select from 'react-select';



import mapStyles from './mapStyles';

import accidentList from './AccidentList/AccidentList.js';

import blackMarker from './blackMarker.png';
import blueMarker from './blueMarker.png';
import pinkMarker from './pinkMarker.png';
import redMarker from './redMarker.png';
import vasakNool from './vasakNool.png';



const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}
let center = {
  lat: 0,
  lng: 0
}

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  
  minZoom: 2,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
    strictBounds: false,
    
  },

}


const markers = {
  civilian: {
    url: redMarker,
    
    
  },
  industrial: {
    url: blackMarker,
    
  },
  military: {
    url: pinkMarker,
    
    
  },
  testing: {
    url: blueMarker,
    
    
  },
}

const searchList = accidentList.map(
  ({ title }) => {
    return{ 
     value: title, 
     label: title 
    }
   }
  );

searchList.sort((a, b) => (a.label > b.label) ? 1 : -1)


const customStyles = {
  

  control: (base, state) => ({
    ...base,
    fontFamily: 'Times New Roman, Times, Serif',
    fontSize: 18,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    border: 'solid 1px',
   
    
    
  }),

  option: (styles) => {
    return {
      ...styles,
      cursor: 'pointer',
      
      lineHeight: 2,
      fontSize: 18,
     
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Times New Roman, Times, Serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
    borderBottom: 'solid 1px',
    borderLeft: 'solid 1px',
    borderRight: 'solid 1px',
  }),

  

  clearIndicator: styles => ({
    ...styles,
    cursor: 'pointer',
  }),
  dropdownIndicator: styles => ({
    ...styles,
    cursor: 'pointer',
  }),

}




function findWithAttr(array, attr, value) {
  for(let i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}


            

  window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};






 export default function  App() {
  
  const [selectedAccident, setSelectedAccident] = useState(null);
  
  const { isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
    
  


  
  
  

  
  const [legend, setLegend] = useState(null);

  const [zoomLevel, setZoomLevel] = useState(2);

  const [selectedSearchOption, setSelectedSearchOption] = useState(null);





  const [infoWindow, setInfoWindow] = useState('infoWindowClosed');
  
  const [ infoWindowArrow, setInfoWindowArrow ] = useState('arrowHidden');
  const [ infoWindowArrowSpan, setInfoWindowArrowSpan ] = useState('arrowHidden');

  

const mapRef = React.useRef();
const onMapLoad = React.useCallback((map) => {
  mapRef.current = map;
}, []);


const panTo = React.useCallback(({lat, lng}) => {
  let zoom = mapRef.current.getZoom();

  if(zoom >= 8){
    
    mapRef.current.panTo({lat, lng});
  }else {
    mapRef.current.setZoom(8);
    mapRef.current.panTo({lat, lng});
  }
}, []);



  if (loadError) return 'Kaardi laadimine ebaõnnestus';
  if (!isLoaded) return 'Laadin kaarti';
  return (
    <div id="body">
    <h1 id="title">Tuumaõnnetused</h1>  
    <GoogleMap
    mapContainerStyle={mapContainerStyle} 
    zoom={zoomLevel} 
    minZoom={2}
    center={center}
    options={options}
    onLoad={onMapLoad}
    onClick={() =>{
      setSelectedAccident(null);
    }}
    >   
   {accidentList.map(accident => (     
      <Marker        
       key={accident.id}
       position={accident.coords}           
       icon={{
         url: markers[accident.category].url,
         scaledSize: new window.google.maps.Size(30, 30),
       }}     
       onClick={() => {
         setSelectedAccident(accident);  
         panTo(accident.coords);
         setInfoWindow('infoWindowOpen');
         setInfoWindowArrow('arrowLeft');    
         setInfoWindowArrowSpan('Peida õnnetuse kirjeldus'); 
       }}
       className="accidentMarker"
   /> 
   ))} 
    
       {selectedAccident && 
        <div>
        <div className={infoWindow}>
          <div className="innerContainer">
            <button className="close"
              onClick={() => {
                setInfoWindow('infoWindowClosed');
                setInfoWindowArrow('arrowRight');
                setInfoWindowArrowSpan('Kuva õnnetuse kirjeldus');
              }}>
        &times;
      </button> {/* Nuppu on näha vaid telefonil või teistel kitsastel ekraanidel*/}
            
            <h2>
              {selectedAccident.title}
            </h2>
            <p>{selectedAccident.description}</p>
            <p>{selectedAccident.description2}</p>
            <p>{selectedAccident.description3}</p>
            <p>{selectedAccident.description4}</p>

            <a href={selectedAccident.link} target="_blank" rel="noreferrer" className="moreInfo">Loe lisaks!</a>
          
            <div className="imageContainer">
              { selectedAccident.image && <figure>
                <img src={selectedAccident.image} className="infoImage" alt="informatiivne pilt" />
                <figcaption>{selectedAccident.image1Caption}</figcaption>
              </figure>

              }

              { selectedAccident.image2 &&
              <figure>
                <img src={selectedAccident.image2} className="infoImage" alt="informatiivne pilt" />
                <figcaption>{selectedAccident.image2Caption}</figcaption>
              </figure>

              }
            </div>
          </div>
        </div>
        <span title={infoWindowArrowSpan}><button className={infoWindowArrow}
          onClick={() => {
            if(infoWindowArrow === 'arrowRight'){
              setInfoWindow('infoWindowOpen');
              setInfoWindowArrow('arrowLeft');
              setInfoWindowArrowSpan('Peida õnnetuse kirjeldus'); 
            }else if (infoWindowArrow === 'arrowLeft')  { 
              setInfoWindow('infoWindowClosed');
              setInfoWindowArrow('arrowRight');
              setInfoWindowArrowSpan('Kuva õnnetuse kirjeldus'); 
            }
          }}>
          <img src={vasakNool} alt="nool" className="arrow" />
        </button></span>
        <Marker        
          key={selectedAccident.id}
          position={selectedAccident.coords}           
          icon={{
            url: markers[selectedAccident.category].url,
            scaledSize: new window.google.maps.Size(65, 65),
          }}     
          onClick={() => {
            panTo(selectedAccident.coords);
            setInfoWindow('infoWindowOpen');
            setInfoWindowArrow('arrowLeft');
            setInfoWindowArrowSpan('Peida õnnetuse kirjeldus');     
          }}
        /> 
        </div>
        
      }   

    </GoogleMap>    
    <div className="container">      
      <Legend  legend={legend} setLegend={setLegend} />
      
      <InfoLogo legend={legend} setLegend={setLegend} />  
        
    </div>
    <div className="searchBarContainer">
      <Search setZoomLevel = {setZoomLevel} setSelectedAccident={setSelectedAccident} setSelectedSearchOption={setSelectedSearchOption} selectedSearchOption={selectedSearchOption} panTo={panTo} setInfoWindow={setInfoWindow} setInfoWindowArrow={setInfoWindowArrow} setInfoWindowArrowSpan={setInfoWindowArrowSpan} />
    </div>
  </div>    
    );
}
function Legend({ legend, setLegend }){ 
  if(legend){

    return (
    <div id="legend">
      <button className="close2"
        onClick={() => {
          setLegend(null);
          document.querySelector('#infoButton').style.transform = 'scale(2)';
          document.querySelector('#infoButton').style.filter = 'none';
        }}>
        &times;
      </button>
      <img src={blackMarker} alt="must" className="legendImage"/>
      <p className="definition"> - Tööstuslik õnnetus</p>
      <br/>
      <img src={blueMarker} alt="sinine" className="legendImage"/>
      <p className="definition"> - Õnnetus testimisel</p>
      <br/>
      <img src={pinkMarker} alt="roosa" className="legendImage"/>
      <p className="definition"> - Sõjaline õnnetus</p>
      <br/>
    <img src={redMarker} alt="punane" className="legendImage"/>
      <p className="definition"> - Tsiviilõnnetus</p>
      <br/>
    </div>
    )
  } return null; 
}

function InfoLogo({legend, setLegend}){
  
  return (
    <span title="Kaardi legend">
      <button id="infoButton"
        onClick={() => {
          if(!legend){
          
            document.querySelector('#infoButton').style.transform = 'scale(2)';
            document.querySelector('#infoButton').style.filter = 'invert(35%) sepia(13%) saturate(3583%) hue-rotate(186deg) brightness(99%) contrast(79%)';
            setLegend('on');
          }
          else {
            document.querySelector('#infoButton').style.transform = 'scale(2)';
            document.querySelector('#infoButton').style.filter = 'none';
            setLegend(null);
          }
        }}>
      </button>
    </span>
  );
}

function Search({ setSelectedAccident, selectedSearchOption, setSelectedSearchOption, panTo, setInfoWindow, setInfoWindowArrow, setInfoWindowArrowSpan }) {
  return (
  <Select 
        options={searchList}
        isClearable= {true}
        isSearchable= {!window.mobileCheck()}
        placeholder="Otsi tuumaõnnetust. . ." 
        styles={customStyles}
        value={selectedSearchOption}
        onChange={(value) => {
          setSelectedSearchOption(value)
              if(value !== null){
                panTo(accidentList[findWithAttr(accidentList, 'title', value.value)].coords);
                setSelectedAccident(accidentList[findWithAttr(accidentList, 'title', value.value)]);
                setInfoWindow('infoWindowOpen');
                setInfoWindowArrow('arrowLeft');
                setInfoWindowArrowSpan('Peida õnnetuse kirjeldus'); 
            }
            }         
        }                  
      />
  )
}