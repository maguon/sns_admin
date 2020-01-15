import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../utils/FormatUtil');
const mainPanelAction = require('../../actions/main/MainPanelAction');

// 综合页面
class MainPanel extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        this.props.initData();
    }

    render() {
        const {mainPanelReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">综合页面</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row margin-top40 pink-font">
                    {/* 今日新增用户数 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s12 fz16 grey-text text-darken-2 margin-bottom15">用户数</div>
                            <div className="col s12 right-align">今日新增：{formatUtil.formatNumber(mainPanelReducer.todayUserCount)}</div>
                        </div>
                    </div>

                    {/* 今日发布文章/求助 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s12 fz16 grey-text text-darken-2 margin-bottom15">今日发布</div>
                            <div className="col s6">文章：{formatUtil.formatNumber(mainPanelReducer.todayArticle)}</div>
                            <div className="col s6 right-align">求助：{formatUtil.formatNumber(mainPanelReducer.todayHelp)}</div>
                        </div>
                    </div>

                    {/* 今日评论/解答 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s12 fz16 grey-text text-darken-2 margin-bottom15">今日评论</div>
                            <div className="col s6">评论：{formatUtil.formatNumber(mainPanelReducer.todayComment)}</div>
                            <div className="col s6 right-align">解答：{formatUtil.formatNumber(mainPanelReducer.todayAnswer)}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mainPanelReducer: state.MainPanelReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    initData: () => {
        dispatch(mainPanelAction.getTodayUserCount());
        dispatch(mainPanelAction.getTodayMsgCount());
        dispatch(mainPanelAction.getTodayMsgCommentCount());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel)