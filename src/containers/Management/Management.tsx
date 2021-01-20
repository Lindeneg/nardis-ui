import { Switch, Route, Redirect } from 'react-router-dom';

import NewRoute from './NewRoute/NewRoute';
import BuildQueue from './BuildQueue/BuildQueue';
import ManageRoute from './ManageRoute/ManageRoute';
import NavigationEntries from '../../components/Navigation/NavigationEntries/NavigationEntries';
import Styles from './Management.module.css';
import { managementNavigationBarEntries } from '../../common/constants';
import { Functional, Props } from '../../common/props';
import * as Nardis from 'nardis-game';
import NardisState from '../../common/state';
import { connect } from 'react-redux';


interface ManagementMappedProps {
    routes: Nardis.Route[],
    queue: Nardis.QueuedRouteItem[]
}

interface ManagementProps extends Props, ManagementMappedProps {}


const mapStateToProps = (state: NardisState): ManagementMappedProps => ({
    routes: state.routes,
    queue: state.queue
});


/**
 * Container with components to create/manage routes
 */
const management: Functional<ManagementProps> = (
    props: ManagementProps
): JSX.Element => (
    <div className={Styles.Management}>
        <NavigationEntries style={{flexDirection: 'row', textAlign: 'center'}} {...managementNavigationBarEntries} />
        <Switch>
            <Route exact path="/management/new-route" component={NewRoute}/>
            <Route exact path="/management/build-queue" component={BuildQueue}/>
            <Route exact path="/management/manage-route" component={ManageRoute}/>
            <Redirect 
                to={"/management" + (
                    props.queue.length > 0 ? '/build-queue' : (props.routes.length > 0 ? '/manage-route' : '/new-route')
                )} 
            />
        </Switch>
    </div>
);


export default connect(mapStateToProps)(management);