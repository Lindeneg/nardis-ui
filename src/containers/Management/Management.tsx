import { Component } from 'react';

import NewRoute from './NewRoute/NewRoute';


import styles from './Management.module.css';


class Management extends Component {

    state = {

    }

    render() {
        return (
            <div className={styles.Management}>
                <NewRoute />
            </div>
        );
    }
}

export default Management;