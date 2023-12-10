import React, {Component} from 'react';
import BScroll from '@better-scroll/core';
import "../../assets/css/index.css"

class ImageScroller extends Component {

    constructor(props) {
        super(props);
        this.img = React.createRef()
        this.refMap = this.props.useRef.refMap
        this.startX = this.props.startX
        this.startY = this.props.startY
    }

    componentDidMount() {
        // 在组件挂载后初始化 BetterScroll
        // alert(this.scrollContainer.current.innerHTML)
        this.scroll = new BScroll(this.refMap.current, {
            freeScroll: true, // 允许在任意方向滚动
            // 其他配置项根据需要添加
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.pos !== prevProps.pos) {
            this.scroll.scrollTo(this.props.pos[0], this.props.pos[1], 1600)
        }
    }

    render() {
        return (
            <div ref={this.refMap} className={"imgContainer"} style={{ width: '100%', height: '100%', overflow: 'hidden', transition: "all ease-in-out 0.5s", pointerEvents:"auto", position:"absolute", top:"0", left:"0"}}>
                    {/*<img  ref={this.img} className={"img"} src={require('../../assets/png/Illustration2c.jpg')} alt="Large Image" style={{width:"6135px", height:"6576px", pointerEvents:"auto"}}/>*/}
                <div className="background">
                    <div className="tiyuguang"></div>
                    <div className="jidianlou"></div>
                    <div className="xingonglou"></div>
                    <div className="baoanlou"></div>
                    <div className="jiushitang"></div>
                    <div className="zhihuakejilou"></div>
                    <div className="QicheDianziyuTiedaoZhuangbeiYanjiusuo"></div>
                    <div className="jiangonglou"></div>
                    <div className="yishitang"></div>
                    <div className="yinyueting"></div>
                    <div className="liuqishitang"></div>
                    <div className="huiyuanlou"></div>
                    <div className="kuaidizhan"></div>
                    <div className="xiaoyiyuan"></div>
                    <div className="waijinglou"></div>
                    <div className="yishulou"></div>
                    <div className="wenfalou"></div>
                    <div className="youyongguanheyumaoqiuguan"></div>
                    <div className="xuegonglou"></div>
                    <div className="xiuxxianyundongchang"></div>
                    <div className="tianjianyundongc"></div>
                    <div class="baifangyundongchang"></div>
                    <div class="sanshitang"></div>
                    <div class="jichushiyandalou"></div>
                    <div class="lishenglou"></div>
                    <div class="wenfalou"></div>
                    <div class="wenfalou"></div>
                </div>
            </div>
        )
    }
}

export default ImageScroller;