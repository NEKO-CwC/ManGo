import "../../assets/css/headerBar.css"

function HeaderBar(props) {

    const handleUserIconClick = (e)=> {
        props.useRef.refMap.current.style.transform = "scale(0.8)"
        props.useRef.refHeaderBar.current.style.transform = "scale(0.8)"
        props.useStateFunc.setIfUserInfoRender(true)
    }

    return (
        <div ref={props.useRef.refHeaderBar} className="headerBar">
            <div className="userIcon" onClick={(e)=>{handleUserIconClick(e)}}></div>
            <div className="placeSetContainer">
                <div className="placeName">三食堂</div>
                <div className="placesSettingButton"></div>
            </div>
            <div className="wandering"></div>
        </div>
    )
}

export default HeaderBar