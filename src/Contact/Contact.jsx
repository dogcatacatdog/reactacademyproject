import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Contact.css";

// 기본 마커 아이콘 설정 (Leaflet 1.7+에서 필요)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 주소 → 좌표 변환 함수 (OpenStreetMap Nominatim API)
async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data && data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  // 서울 시청 기본 좌표
  return [37.5665, 126.9780];
}

// 지도 이동 컴포넌트
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function Contact() {
  const [address, setAddress] = useState("서울특별시 중구 세종대로 110");
  const [position, setPosition] = useState([37.5665, 126.9780]); // 서울 시청 기본값

  const handleSearch = async (e) => {
    e.preventDefault();
    const coords = await geocode(address);
    setPosition(coords);
  };

  return (
    <div className="contact-container">
      <h3>찾아오시는 길</h3>

      <div className="map-wrap">
        <MapContainer center={position} zoom={16} scrollWheelZoom={false} style={{ height: "340px", width: "100%" }}>
          <ChangeView center={position} />
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="address-info">
        <strong>주소:</strong> {address} <br></br>
        <strong>123타워 456호, 02-1234-5678</strong>
      </div>
    </div>
  );
}

export default Contact;