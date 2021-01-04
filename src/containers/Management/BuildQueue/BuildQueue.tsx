import { connect } from "react-redux";

import { QueuedRouteItem, Route } from "nardis-game";

import NardisState from "../../../common/state";
import { MapDispatch, OnDispatch, Props } from "../../../common/props";
import Styles from './BuildQueue.module.css';

import MetaRoute from '../../../components/Information/MetaRoute/MetaRoute';
import { Component, Fragment } from "react";
import { metaRouteHeaderNames } from "../../../common/constants";
import { NardisAction, RemoveRouteFromQueue } from "../../../common/actions";


interface BuildQueueState {
    re: boolean
};

interface BuildQueueMappedProps {
    queue: QueuedRouteItem[],
};

interface BuildQueueDispatchedProps {
    removeFromPlayerQueue: RemoveRouteFromQueue,
};

interface BuildQueueProps extends Props, BuildQueueMappedProps, BuildQueueDispatchedProps {}


const mapStateToProps = (
    state: NardisState
): BuildQueueMappedProps => ({
    queue: state.queue
});

const mapDispatchToProps: MapDispatch<BuildQueueDispatchedProps> = (
    dispatch: OnDispatch
): BuildQueueDispatchedProps => (
    {
        removeFromPlayerQueue: (route: Route) => dispatch(
            {
                type: NardisAction.REMOVE_FROM_PLAYER_QUEUE,
                payload: {
                    removeFromPlayerQueue: {
                        route
                    }
                }
            }
        )
    }
);


class BuildQueue extends Component<BuildQueueProps, BuildQueueState> {

    state: BuildQueueState = {
        re: false
    };

    deleteRouteFunc = (route: Route): void => {
        this.props.removeFromPlayerQueue(route);
        this.setState({...this.state});
    }

    render () {
        return (
        <Fragment>
            <hr/>
            {this.props.queue.length <= 0 ? <p className={Styles.NoRoutes}>NO ROUTES IN QUEUE</p> :
            <div className={Styles.Container}>
            {this.props.queue.map((item: QueuedRouteItem, index: number): JSX.Element => (
                <MetaRoute
                    key={index}
                    cityOne={{city: item.route.getCityOne(), color: 'yellow'}}
                    cityTwo={{city: item.route.getCityTwo(), color: 'lightgreen'}}
                    editRouteDisabled={true}
                    editRouteFunc={() => null}
                    // TODO inactive delete func when queued route is loading
                    deleteRouteFunc={() => this.deleteRouteFunc(item.route)}
                    id={item.route.id}
                    headers={metaRouteHeaderNames}
                    values={[
                        item.route.getDistance() + 'KM', 
                        item.route.getTrain().speed + 'KM/TURN',
                        item.turnCost > 0 ? item.turnCost.toString() : 'LOADING CARGO', 
                        item.route.getTrain().upkeep + 'G/TURN'
                    ]}
                />
            ))}
            </div>}
        </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BuildQueue);