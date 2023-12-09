import HistoryInfoChange from "./HistoryInfoChange";
import "../../assets/css/userInfo.css"
import UserInfoContentCard from "./UserInfoContentCard";

function UserInfo() {
    return (
        <div className="userInfoContainer">
            <div className="headerOperate">
                <div className="setting"></div>
                <div className="notification"></div>
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
                <HistoryInfoChange />
                <div className="historyInfoContent">
                    <div className="waterfallFlowLeft">
                        <UserInfoContentCard imgPath={"../../assets/img.png"}/>
                    </div>
                    <div className="waterfallFlowRight"></div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo