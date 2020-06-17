import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Tab, Tabs} from "react-materialize";
import {fileHost, mediaHost} from "../../config/HostConfig";
import VideoPlayer from "../utils/VideoPlayer";

const articleManagerDetailAction = require('../../actions/main/ArticleManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

class ArticleManagerDetail extends React.Component {

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
        this.props.getArticleInfo();
    }

    // 更新
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 载体类型：图片
        if (this.props.articleManagerDetailReducer.articleInfo.length > 0 &&
            this.props.articleManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[1].value &&
            this.props.articleManagerDetailReducer.articleInfo[0].media.length > 0) {
            let viewer = new Viewer(document.getElementById('viewer'), {
                show: function (){  // 动态加载图片后，更新实例
                    viewer.update();
                },
            });
        }
    }

    /**
     * 显示2级评论列表
     */
    showDetail = (msgComId) => {
        $(".details").hide();
        $(".detail_" + msgComId).show();
        this.props.getComLv2List(msgComId);
    };

    render() {
        const {articleManagerDetailReducer,changeTab} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/article', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">文章管理 - 文章详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {articleManagerDetailReducer.articleInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">
                    {/* 作者昵称 */}
                    <div className="col s6">作者昵称：{articleManagerDetailReducer.articleInfo[0].user_detail_info[0].nick_name}</div>
                    {/* 发布时间 */}
                    <div className="col s6 right-align">发布时间：{formatUtil.getDateTime(articleManagerDetailReducer.articleInfo[0].created_at)}</div>
                    {/* 手机 */}
                    <div className="col s6 margin-top5">&nbsp;</div>
                    {/* 发布位置 */}
                    <div className="col s6 margin-top5 right-align">发布位置：{articleManagerDetailReducer.articleInfo[0].address_name}</div>
                    {/* 分割线 */}
                    <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>
                    {/* 文章内容 */}
                    <div className="col s12 margin-top10">{articleManagerDetailReducer.articleInfo[0].info}</div>

                    {/* 载体类型: 图片 */}
                    {articleManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[1].value && articleManagerDetailReducer.articleInfo[0].media.length > 0 &&
                    <ul id="viewer" className="margin-top0">
                        {articleManagerDetailReducer.articleInfo[0].media.map(function (item) {
                            return (
                                <div className="col s2 margin-top40">
                                    <div className="img-box z-depth-1 detail-box">
                                        <li className="picture-list vc-center">
                                            <img src={item !== '' ? "http://" + fileHost + "/api/image/" + item.url : ""} className="responsive-img"/>
                                        </li>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>}

                    {/* 载体类型: 视频 */}
                    {articleManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[2].value && articleManagerDetailReducer.articleInfo[0].media.length > 0 &&
                    <ul id="video" className="margin-top0">
                        {articleManagerDetailReducer.articleInfo[0].media.map(function (item) {
                            return (
                                <div className="col s12 margin-top40">
                                    {/*<VideoPlayer src="//vjs.zencdn.net/v/oceans.mp4" pic={item.preview === '' ? item.preview : "/assets/images/no_pic.png"}/>*/}
                                    <VideoPlayer src={"http://" + mediaHost + "/" + item.url} pic={item.preview !== '' ? item.preview : "/assets/images/no_pic.png"}/>
                                </div>
                            )
                        })}
                    </ul>}
                </div>}

                <div className="row margin-left20 margin-right20">
                    <Tabs className='tab-demo z-depth-1' onChange={changeTab}>
                        <Tab title="评论" idx="1000" className="margin-top10" active>
                            {articleManagerDetailReducer.commentArray.map(function (item) {
                                return (
                                    <div className="col s12 margin-top10">
                                        <div className="col s8 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                        <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                        <div className="col s12 margin-top10">{item.comment}</div>
                                        <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>
                                        <div className="col s6 margin-top10 blue-font">共{item.comment_num}条评论
                                            <span onClick={() => {this.showDetail(item._id)}} className="pointer">{item.comment_num > 0 ? ' 展开更多 >>' : ''}</span>
                                        </div>
                                        <div className="col s6 margin-top10 right-align">赞({item.agree_num})</div>

                                        <div className={`col s12 margin-top10 details detail_${item._id}`}>
                                        {articleManagerDetailReducer.commentLv2Array.map(function (item) {
                                            return (
                                                <div className="col s12 margin-top10">
                                                    <div className="col s1 margin-top10">&nbsp;</div>
                                                    <div className="col s7 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                                    <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                                    <div className="col s1 margin-top10">&nbsp;</div>
                                                    <div className="col s11 margin-top10">{item.comment}</div>
                                                    <div className="col s1">&nbsp;</div>
                                                    <div className="col s11 no-padding"><div className="col s12 margin-top10 divider"/></div>
                                                    <div className="col s1 margin-top10">&nbsp;</div>
                                                    <div className="col s6 margin-top10 blue-font">共{item.comment_num}条评论 {item.comment_num > 0 ? '展开更多 >>' : ''}</div>
                                                    <div className="col s5 margin-top10 right-align">赞({item.agree_num})</div>
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                )
                            },this)}
                        </Tab>

                        <Tab title="点赞" idx="1001" className="margin-top10">
                            {articleManagerDetailReducer.praiseArray.map(function (item) {
                                return (
                                    <div>
                                        <div className="col s8 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                        <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                        <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                                    </div>
                                )
                            },this)}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleManagerDetailReducer: state.ArticleManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getArticleInfo: () => {
        dispatch(articleManagerDetailAction.getArticleInfo(ownProps.match.params.id))
    },
    changeTab: () => {
        dispatch(articleManagerDetailAction.getCommentInfo(ownProps.match.params.id));
        dispatch(articleManagerDetailAction.getPraiseInfo(ownProps.match.params.id));
    },
    getComLv2List: (msgComId) => {
        dispatch(articleManagerDetailAction.getComLv2List(msgComId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleManagerDetail)