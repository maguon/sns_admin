import React from 'react';

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    }

    render() {
        return (
            <footer>
                <div className="footer">
                    <span className="footer-msg">鸿溧科技</span>
                    <span className="footer-msg">广运车管理系统1.0版</span>
                </div>
            </footer>
        )
    }
}

module.exports = Footer;