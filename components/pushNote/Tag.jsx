import {Component} from "react";
import "../../assets/css/tag.css"

class Tag extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className="tag">{this.props.text}</div>
        )
    }
}

export default Tag