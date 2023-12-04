<template>
    <div id="index_container">
        <div id="map_wrap">
            <map-container></map-container>
        </div>
    </div>
</template>

<script>
import MapContainer from '@/components/MapContainer/MapContainer.vue'
export default {
    components: { MapContainer }
}
</script>

<style lang="less" scoped>
#index_container {
  overflow: hidden;
  background-color: rgb(207, 229, 248);
  height: 100%;
  width: 100%;
  position: relative;
}
#map_wrap {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    height: 50%;
    width: 50%;
  }
</style>