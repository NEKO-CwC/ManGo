import "../../assets/css/headerBar.css"
import {useRef} from "react";

function HeaderBar(props) {

    const refPlaceSettingButton = useRef(null)

    function scaleMain() {
        props.useRef.refMap.current.style.transform = "scale(0.9)"
        props.useRef.refHeaderBar.current.style.transform = "scale(0.9)"
    }

    const handleUserIconClick = (e)=> {
        scaleMain()
        props.useStateFunc.setIfUserInfoRender(true)
    }

    const handleWanderingClick = () => {
        props.useStateFunc.setIfWanderingCardRender(true)
    }

    const handlePlaceSettingButtonClick = ()=>{
        refPlaceSettingButton.current.style.animation = "placeSettingButton-rotate ease-in-out 0.5s"
        setTimeout(()=>{
            refPlaceSettingButton.current.style.transform = "rotate(0)"
        })
    }

    const handlePlaceNameClick = ()=>{
        scaleMain()
        props.useStateFunc.setIfPushNoteRender(true)
    }

    return (
        <div ref={props.useRef.refHeaderBar} className="headerBar">
            <div className="userIcon" onClick={(e)=>{handleUserIconClick(e)}}></div>
            <div className="wandering" onClick={handleWanderingClick}></div>
            <div className="placeSetContainer">
                <div className="placeName" onClick={handlePlaceNameClick}>三食堂</div>
                {/*<div ref={refPlaceSettingButton} className="placeSettingButton" onClick={handlePlaceSettingButtonClick}></div>*/}
            </div>
        </div>
    )
}

export default HeaderBar