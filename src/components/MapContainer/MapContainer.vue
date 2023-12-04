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
    height: 800px;
}
</style>
