import HistoryInfoChange from "./HistoryInfoChange";
import "../../assets/css/userInfo.css"
import UserInfoContentCard from "./UserInfoContentCard";
import {useEffect, useRef, useState} from "react";
import BScroll from '@better-scroll/core';

function UserInfo(props) {
    const refWrapper = useRef(null)
    const refContent = useRef(null)
    const refLeft = useRef(null)
    const refRight = useRef(null)
    const refContainer = useRef(null)

    const [infoContentStatus, setInfoContentStatus] = useState("notes")

    let flowLeftScroll

    useEffect(() => {
        if (refWrapper.current) {
            flowLeftScroll = new BScroll(refWrapper.current, {
                scrollY: true,
                freeScroll: true,
            })
            console.log(flowLeftScroll)
        }
    }, []);

    const data = {
        notes: {
            left: <div ref={refLeft} className="waterfallFlowLeft">
                            <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            </div>,
            right: <div ref={refRight} className="waterfallFlowRight">
                                    <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                            <UserInfoContentCard props={{
                                text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                                likeCount: 64,
                                commentCount: 1
                            }}/>
                    </div>
        },
        haveSeen: {
            left: <div ref={refLeft} className="waterfallFlowLeft">
                <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
            </div>,
            right: <div ref={refRight} className="waterfallFlowRight">
                <UserInfoContentCard props={{imgPath: "../../assets/png/img.jpg",
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
                <UserInfoContentCard props={{
                    text: "一个晚上，两只猫，让我花了867一个晚上，两只猫32，让我花了867",
                    likeCount: 64,
                    commentCount: 1
                }}/>
            </div>
        }
    }

    const handleReturnClick = ()=>{
        props.useRef.refMap.current.style.transform = "scale(1)"
        props.useRef.refHeaderBar.current.style.transform = "scale(1)"
        refContainer.current.style.animation = "fadeOut ease-in-out 0.7s"
        setTimeout(()=>{props.setUseState.setIfUserInfoRender(false)}, 650)
    }

    return (
        <div ref={refContainer} className="userInfoContainer">
            <div className="headerOperate">
                <div className="setting"></div>
                <div className="return" onClick={handleReturnClick}></div>
            </div>
            <div className="basicUserInfo">
                <div className="userHeadIcon"></div>
                <div className="userTextInfo">
                    <div className="userInfoImportant">
                        <div className="userName">NEKO</div>
                        <div className="sex"></div>
                    </div>
                    <div className="userInfoNormal">
                        <div className="email">2840720893@qq.com</div>
                        <div className="day">day 180</div>
                    </div>
                </div>
            </div>
            <div className="statistics">
                <div className="likeCount">共获421赞</div>
                <div className="noteCount">共发布39篇</div>
            </div>
            <div className="historyInfo">

                <HistoryInfoChange scroll={flowLeftScroll} useRef={{refContent}} data={{data}} setUseState={{setInfoContentStatus}}/>

                <div ref={refWrapper} className="historyInfoWrapper">
                    <div ref={refContent} className="historyInfoContent" style={{overflow:"hidden"}}>
                        {infoContentStatus === "notes" ? data.notes.left : data.haveSeen.left}
                        {infoContentStatus === "notes" ? data.notes.right : data.haveSeen.right}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo