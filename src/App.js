import './App.css';

import Login from "./components/account/Login.jsx"
import ImageScroller from "./components/map/ImageScroller";
import {useEffect, useRef, useState} from "react";
import UserInfo from "./components/userInfo/UserInfo";
import HeaderBar from "./components/map/HeaderBar";

var coordtransform=require('coordtransform');

function App() {

    const [pos, setPos] = useState([])
    const [loginStatus, setLoginStatus] = useState(true)
    const [ifUserInfoRender, setIfUserInfoRender] = useState(false)

    const refMap = useRef(null)
    const refHeaderBar = useRef(null)

    const handleButtonClick = ()=>{

        const LBLongitude = 115.789166;
        const LBLatitude = 28.646927;
        // 地图右下角经纬度
        const RTLongitude = 115.811066;
        const RTLatitude = 28.667599;
        // 地图像素
        const imageWidth = 6135;
        const imageHeight = 6576;
        let longitude
        let latitude
        let accuracy

        const options = {
            "enableHighAccuracy": true,
            "maximumAge": 0
        }

        // 计算经纬度对应的像素位置，左下角为(0,0)
        function calculatePixelPosition(longitude, latitude) {
            let lonPx = imageWidth / (RTLongitude - LBLongitude);
            let latPx = imageHeight / (RTLatitude - LBLatitude);
            let x = -((longitude - LBLongitude) * lonPx-(document.body.clientWidth/2));
            let y = -(imageHeight-(latitude - LBLatitude) * latPx-(document.body.clientHeight/2));
            return [x, y];
        }

        function success (position){
            longitude = position.coords.longitude
            latitude = position.coords.latitude
            accuracy = position.coords.accuracy
            const Array= coordtransform.wgs84togcj02(longitude, latitude)
            longitude = Array[0]
            latitude = Array[1]
            const Array1 = calculatePixelPosition(longitude, latitude);
            setPos(Array1)
        }

        function error() {
            alert("定位出错，请尝试重新获取位置信息")
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            // 不支持 Geolocation API
            alert("未开启手机定位权限，请重新授权后返回网站")
        }
    }

    useEffect(() => {
        handleButtonClick()
    }, []);

    return (
        <div className="App">
            {ifUserInfoRender && <UserInfo />}
            {loginStatus && <HeaderBar useStateFunc={{setIfUserInfoRender}} useRef={{refHeaderBar, refMap}}/>}
            {!loginStatus && <Login setVarFunc={{setLoginStatus}}/>}
            <ImageScroller pos={pos} useRef={{refMap}}/>
        </div>
    );
}

export default App;
