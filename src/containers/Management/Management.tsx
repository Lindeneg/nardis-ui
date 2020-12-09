import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NewRoute from './NewRoute/NewRoute';
import NavigationEntries from '../../components/Navigation/NavigationEntries/NavigationEntries';
import { managementNavigationBarEntries } from '../../common/constants';

import styles from './Management.module.css';


class Management extends Component {

    state = {

    }

    render() {
        return (
            <div className={styles.Management}>
                <NavigationEntries {...managementNavigationBarEntries} />
                <Switch>
                    <Route exact path="/management/new-route" component={NewRoute}/>
                </Switch>
            </div>
        );
    }
}

export default Management;