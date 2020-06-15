import React from 'react';

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        this.props = {
            controls: true,
            preload: "none",
            // 设置控制条组件
            controlBar: {
                /* 设置控制条里面组件的相关属性及显示与否  */
                // currentTimeDisplay:true,
                // timeDivider:true,
                // durationDisplay:true,
                // remainingTimeDisplay:false,
                /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                children: [
                    // 播放/暂停按钮
                    {name: 'playToggle'},
                    // 视频当前已播放时间
                    {name: 'currentTimeDisplay'},
                    // 播放进度条
                    {name: 'progressControl'},
                    // 视频播放总时间
                    {name: 'durationDisplay'},
                    // // 视频播放总时间
                    // {name: 'remainingTimeDisplay'},
                    // 倍数播放，可以自己设置
                    {name: 'playbackRateMenuButton', 'playbackRates': [0.5, 1, 1.5, 2, 2.5]},
                    // 音量控制：不使用水平方式
                    {name: 'volumePanel', inline: false},
                    // 全屏
                    {name: 'fullscreenToggle'}
                ]
            },
            poster: this.props.pic,
            width: 700,
            height: 400,
            sources: [{
                src: this.props.src,
                type: 'video/mp4'
            }]
        };

        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {});
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return (
            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js vjs-default-skin" preload="none"/>
                </div>
            </div>
        );
    }
}