import Tag from "./Tag";
import "../../assets/css/pushNote.css"
import {useRef, useState} from "react";
import unVisibleLogo from "../../assets/svg/pushNote/unVisible.svg"
import visibleLogo from "../../assets/svg/pushNote/visible.svg"
import Swal from "sweetalert2"

function PushNote(props) {

    const refAddImageInput = useRef(null)
    const refLogo = useRef(null)
    const refSettingIcon = useRef(null)
    const refPushNoteContainer = useRef(null)
    const refAddText = useRef(null)

    const [identityText, setIdentityText] = useState("公开")

    // const imgToPreload = ["../../assets/svg/pushNote/unVisible.svg", "../../assets/svg/pushNote/visible.svg"]
    // imgToPreload.forEach(imgPath=>{
    //     const img = new Image();
    //     img.src = imgPath;
    // })

    const handleImageUpload = (e)=> {
        const file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                refLogo.current.style.backgroundImage = `url(${e.target.result})`;
                refLogo.current.style.width = "100%";
                refLogo.current.style.height = "100%";
                refLogo.current.style.backgroundSize = "cover";
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSettingIconClick = (e)=>{
        e.target.style.backgroundImage = identityText === "公开" ?
            `url(${unVisibleLogo})` :
            `url(${visibleLogo})`
        setIdentityText(identityText === "公开" ? "私密" : "公开")
    }

    const handlePushClick = ()=>{
        if (!refAddText.current.value) {
            Swal.fire({
                "title": "至少请输入文字再发表哦",
                "icon": "error"
            })
        } else {
            Swal.fire({
                "title": "发布笔记成功\n有更多人看见了你在学校中的点点滴滴",
                "icon": "success"
            })
            pushNoteContainerFade()
        }
    }

    const handleReturnClick = ()=>{
        pushNoteContainerFade()
    }

    function pushNoteContainerFade() {
        refPushNoteContainer.current.style.animation = "pushNoteContainer-fadeOut ease-in-out 0.7s"
        setTimeout(()=>{
            props.setUseState.setIfPushNoteRender(false)
        }, 650)
        props.useRef.refMap.current.style.transform = "scale(1)"
        props.useRef.refHeaderBar.current.style.transform = "scale(1)"
    }

    return (
        <div className="pushNoteContainer" ref={refPushNoteContainer}>
            <div className="bg"></div>
            <div className="returnContainer">
                <div className="pushNoteReturn" onClick={handleReturnClick}></div>
            </div>
            <div className="addImageContainer">
                <div className="addImage">
                    <div ref={refLogo} className="logo"></div>
                    <input ref={refAddImageInput} type="file" className="addImageInput" accept="image/*"
                           onChange={(e)=>{handleImageUpload(e)}} />
                </div>
            </div>
            <div className="tagContainer">
                <Tag text={"#neko"}/>
                <Tag text={"#晚霞小分队"}/>
            </div>
            <textarea ref={refAddText} className="addText" placeholder={"这一刻的想法..."}/>
            <div className="identity">
                <div className="whoCanSee">
                    <div className="userIcon"></div>
                    <div className="text">谁可以看</div>
                </div>
                <div className="identitySetting">
                    <div className="text">{identityText}</div>
                    <div className="settingIcon" onClick={(e)=>{handleSettingIconClick(e)}}></div>
                </div>
            </div>
            <div className="push" onClick={handlePushClick}>分享笔记</div>
        </div>
    )
}


export default PushNote