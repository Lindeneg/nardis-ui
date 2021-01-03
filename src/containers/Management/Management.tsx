import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NewRoute from './NewRoute/NewRoute';
import BuildQueue from './BuildQueue/BuildQueue';
import ManageRoute from './ManageRoute/ManageRoute';
import NavigationEntries from '../../components/Navigation/NavigationEntries/NavigationEntries';
import Styles from './Management.module.css';
import { managementNavigationBarEntries } from '../../common/constants';


class Management extends Component {

    // TODO use state for route editing management
    state = {

    }

    render() {
        return (
            <div className={Styles.Management}>
                <NavigationEntries style={{flexDirection: 'row', textAlign: 'center'}} {...managementNavigationBarEntries} />
                <Switch>
                    <Route exact path="/management/new-route" component={NewRoute}/>
                    <Route exact path="/management/build-queue" component={BuildQueue}/>
                    <Route exact path="/management/manage-route" component={ManageRoute}/>
                </Switch>
            </div>
        );
    }
}


export default Management;