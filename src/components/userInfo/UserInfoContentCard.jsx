import {Component, createRef} from "react";
import "../../assets/css/userInfoContentCard.css"

class UserInfoContentCard extends Component {
    constructor(props) {
        super(props);
        this.refImg = createRef()

    }

    componentDidMount() {
        console.log(this.props.imgPath)
        this.refImg.current.style.background = `url(${this.props.imgPath})`
    }

    render() {
        return (
            <div className="UserInfoContentCard">
                <div className="img" ref={this.refImg} style={{width: 100%, height: 145px}}></div>
                <div className="textContent"></div>
                <div className="likeAndComment"></div>
            </div>
        )
    }
}

export default UserInfoContentCard