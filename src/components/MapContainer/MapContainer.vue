<script setup>
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
window._AMapSecurityConfig = {
    securityJsCode: '54e6782ca534f2e54b980d5d92142e2c'  //高德安全密钥
}

let map = null;

onMounted(() => {
    AMapLoader.load({
        key: "08b23b2eb1ebe490ba1d242cc64bde53", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
        .then((AMap) => {
            map = new AMap.Map("container", {
                // 设置地图容器id
                viewMode: "2D", // 是否为3D地图模式
                zoom: 17, // 初始化地图级别
                center: [115.801325, 28.656317], // 初始化地图中心点位置
            });
            //异步加载工具条插件
            AMap.plugin("AMap.ToolBar", function () { //异步同时加载多个插件
                var toolbar = new AMap.ToolBar(); //创建工具条插件实例
                map.addControl(toolbar); //添加工具条插件到页面
            });
            // 异步加载地图组件
            AMap.plugin(["AMap.Geolocation", "AMap.ElasticMarker"], function () {
                // 添加定位插件
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位，默认为false
                    timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
                    convert: true             // 自动将GCJ-02坐标转换成浮点数坐标，默认：true
                });
                map.addControl(geolocation);
                // 添加弹性标记插件
                var elasticMarker = new AMap.ElasticMarker({
                    // 在这里配置弹性标记的相关选项
                });
                map.add(elasticMarker);
            });

        })
        .catch((e) => {
            console.log(e);
        });
});

onUnmounted(() => {
    map?.destroy();
});
</script>

<template>
    <div id="container">
    </div>
</template>

<style lang="less" scoped>
#container {
    width: 100%;
    height: 100%;
}
</style>
