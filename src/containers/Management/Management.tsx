import { Component } from 'react';
import { connect } from 'react-redux';

import { NardisState } from '../../common/state';


class Management extends Component {

    state = {

    }

    render() {
        return (
            <div>Management</div>
        );
    }
}

const mapStateToProps = (state: NardisState): {gameCreated: boolean} => ({
    gameCreated: state.gameCreated
});

export default Management;