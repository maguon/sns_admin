import React from 'react';

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        this.props = {
            controls: true,
            poster: this.props.pic,
            width: 700,
            height: 400,
            sources: [{
                src: this.props.src,
                type: 'video/mp4'
            }]
        };

        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
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
                    <video ref={ node => this.videoNode = node } className="video-js vjs-default-skin" preload="none"/>
                </div>
            </div>
        );
    }
}