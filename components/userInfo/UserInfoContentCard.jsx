import {Component, createRef} from "react";
import "../../assets/css/userInfoContentCard.css"

class UserInfoContentCard extends Component {
    constructor(props) {
        super(props);
        this.refImg = createRef()
    }

    // componentDidMount() {
    //     this.refImg.current.style.background = `url(${this.props.imgPath})`
    // }

    render() {
        return (
            <div className="UserInfoContentCard">
                {this.props.props.imgPath && <img className="img" ref={this.refImg} src={require("../../assets/png/img.jpg")} alt="asd"/>}
                <div className="textContent">{this.props.props.text}</div>
                <div className="likeAndComment">
                    <div className="likeContainer">
                        <div className="likeIcon icon"></div>
                        <div className="likeCount">{this.props.props.likeCount}</div>
                    </div>
                    <div className="commentContainer">
                        <div className="commentIcon icon"></div>
                        <div className="CommentCount">{this.props.props.commentCount}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfoContentCard