import './App.css';

import Login from "./components/account/Login.jsx"
import ImageScroller from "./components/map/ImageScroller";
import {useEffect, useRef, useState} from "react";
import UserInfo from "./components/userInfo/UserInfo";
import HeaderBar from "./components/map/HeaderBar";
import WanderingCard from "./components/wanderingCard/WanderingCard";
import PushNote from "./components/pushNote/PushNote";
import axios from "axios";
import {checkCookie} from "./jsx/FUNCTIONS";

var coordtransform=require('coordtransform');

function App() {
    const [pos, setPos] = useState([])
    const [loginStatus, setLoginStatus] = useState(false)
    const [ifUserInfoRender, setIfUserInfoRender] = useState(false)
    const [ifWanderingCardRender, setIfWanderingCardRender] = useState(false)
    const [ifPushNoteRender, setIfPushNoteRender] = useState(false)

    const refMap = useRef(null)
    const refHeaderBar = useRef(null)

    let placeIds
    let token

    const text = "突然抬头看到，一刹那感觉又回到了高中的晚饭后明明那么忙的日子，现在却只剩对它的怀念。这才明白那句：一段人生结束的标志，就是它开始被浪漫化突然抬头看到，一刹那感觉又回到了高中的晚饭后明明那么忙的日子，现在却只剩对它的怀念。这才明白那句：一段人生结束的标志，就是它开始被浪漫化"
    let imgPath
    const time = "2023.10.07"

    useEffect(() => {
        if (checkCookie("token")) {
            setLoginStatus(true)
            token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
            console.log(token)
        }

        const LBLongitude =  115.78934;
        const LBLatitude = 28.641954;
        // 地图右下角经纬度
        const RTLongitude = 115.814322;
        const RTLatitude = 28.667798;
        // 地图像素
        const imageWidth = 6991;
        const imageHeight = 12177 ;
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
            let y = 200-(imageHeight-(latitude - LBLatitude) * latPx-(document.body.clientHeight/2));
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
            // setPos([115.807289,28.665251])
            // setPos([115.807177,28.665303])

            // axios.post("http://47.120.18.202:8888/places/get", {
            //     x:pos[0],
            //     y:pos[1],
            // }, {"Authorization": token})
            setTimeout(()=>{
                axios.post("http://47.120.18.202:8888/places/get", {
                    x:pos[0],
                    y:pos[1],
                }, {
                    headers: {
                        'Authorization': token
                    }
                })
                    .then(response => {
                        console.log(response.data)
                        placeIds = response.data.place_id;
                        console.log(placeIds)
                        placeIds.forEach(placeId => {
                            console.log(0)
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }, 2000)
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
    }, []);

    return (
        <div className="App">
            <ImageScroller pos={pos} useRef={{refMap}}/>
            {ifPushNoteRender && <PushNote setUseState={{setIfPushNoteRender}} useRef={{refMap, refHeaderBar}}/>}
            {ifUserInfoRender && <UserInfo setUseState={{setIfUserInfoRender}} useRef={{refMap, refHeaderBar}}/>}
            {ifWanderingCardRender && <WanderingCard data={{imgPath, text, time}} useState={{ifWanderingCardRender}} setUseState={{setIfWanderingCardRender}}/>}
            {loginStatus && <HeaderBar useStateFunc={{setIfUserInfoRender, setIfWanderingCardRender, setIfPushNoteRender}} useRef={{refHeaderBar, refMap}}/>}
            {!loginStatus && <Login setVarFunc={{setLoginStatus}}/>}
        </div>
    );
}

export default App;
