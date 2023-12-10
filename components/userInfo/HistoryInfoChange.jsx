import "../../assets/css/historyInfoChange.css"
import {useRef} from "react";

function HistoryInfoChange(props) {

    const refSlider = useRef(null)
    const refNoteText= useRef(null)
    const refHaveSeenText = useRef(null)

    function handleNotesTextClick() {
        refSlider.current.style.transform = "translateX(0)"
        refNoteText.current.className = "notes clicked"
        refHaveSeenText.current.className = "haveSeen unClicked"
        props.setUseState.setInfoContentStatus("notes")
    }

    function handleHaveSeenTextClick() {
        refSlider.current.style.transform = "translateX(200px)"
        refNoteText.current.className = "notes unClicked"
        refHaveSeenText.current.className = "haveSeen clicked"
        props.setUseState.setInfoContentStatus("haveSeen")
    }

    return (
        <div className="historyInfoChange">
            <div className="historyInfoTextContainer">
                <div className="notes clicked" onClick={handleNotesTextClick} ref={refNoteText}>笔记</div>
                <div className="haveSeen unClicked" onClick={handleHaveSeenTextClick} ref={refHaveSeenText}>留痕</div>
            </div>
            <div className="historyInfoChange-slider-Container">
                <div className="historyInfoChange-slider" ref={refSlider}></div>
            </div>
        </div>
    )
}

export default HistoryInfoChange