import React from 'react';
import {connect} from 'react-redux';



class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>Main</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Container)