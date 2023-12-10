import "../../assets/css/wanderingCard.css"
import {useRef} from "react";

function WanderingCard(props) {

    const refWanderingCardContainer = useRef(null)

    function handleCancelClick() {
        refWanderingCardContainer.current.style.animation = "wanderingCardContainer-fadeOut cubic-bezier(0.94, 0.03, 0.52, 1.4) 0.7s"
        setTimeout(()=>{
            props.setUseState.setIfWanderingCardRender(false)
        }, 650)
    }

    return (
        <div className="wanderingCardContainer" ref={refWanderingCardContainer}>
            <img className="img" src={require("../../assets/png/wandering.png")}></img>
            <div className="cancel" onClick={handleCancelClick}></div>
            <div className="text">{props.data.text}</div>
            <div className="time">{props.data.time}</div>
        </div>
    )
}

export default WanderingCard