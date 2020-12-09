import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NewRoute from './NewRoute/NewRoute';
import ManagementSelector from '../../components/Navigation/ManagementSelector/ManagementSelector';


import styles from './Management.module.css';


class Management extends Component {

    state = {

    }

    render() {
        return (
            <div className={styles.Management}>
                <ManagementSelector />
                <Switch>
                    <Route exact path="/management/new-route" component={NewRoute}/>
                </Switch>
            </div>
        );
    }
}

export default Management;