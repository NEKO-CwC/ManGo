import React, {Component} from 'react';
import BScroll from '@better-scroll/core';

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
        this.scroll = new BScroll(this.props.useRef.refMap.current, {
            // 配置
            startX: this.props.startX,
            startY: this.props.startY,
            // startX: -4390,
            // startY: -174,
            scrollX: true,  // 启用横向滚动
            scrollY: true,  // 启用纵向滚动
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
            <div ref={this.refMap} className={"imgContainer"} style={{ width: '100%', height: '100%', overflow: 'hidden', transition: "all ease-in-out 0.5s "}}>
                    <img ref={this.img} className={"img"} src={require('../../assets/png/Illustration2c.jpg')} alt="Large Image" style={{width:"6135px", height:"6576px"}}/>
            </div>
        )
    }
}

export default ImageScroller;