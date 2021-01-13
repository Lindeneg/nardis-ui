import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Route } from "nardis-game";

import NardisState from "../../../common/state";
import EditRoute from '../EditRoute/EditRoute';
import DeleteModal from './Helpers/DeleteModal/DeleteModal';
import getMetaRoute from "./getMetaRoute";
import Styles from './ManageRoute.module.css';
import { NardisAction } from "../../../common/actions";
import { IdFunc, MapDispatch, OnDispatch, Props } from "../../../common/props";


interface ManageRouteState {
    deleteInitiated: boolean,
    editInitiated: boolean,
    id: string
};

interface BuildRouteMappedProps {
    routes: Route[]
};

interface BuildRouteDispatchedProps {
    removeRouteFromRoutes: IdFunc,
};

interface ManageRouteProps extends Props, BuildRouteMappedProps, BuildRouteDispatchedProps {}


const mapStateToProps = (
    state: NardisState
): BuildRouteMappedProps => ({
    routes: state.routes
});

const mapDispatchToProps: MapDispatch<BuildRouteDispatchedProps> = (
    dispatch: OnDispatch
): BuildRouteDispatchedProps => (
    {
        removeRouteFromRoutes: (routeId: string) => dispatch(
            {
                type: NardisAction.REMOVE_FROM_PLAYER_ROUTE,
                payload: {
                    removeRouteFromRoutes: {
                        routeId
                    }
                }
            }
        )
    }
);


/**
 * 
 */
class ManageRoute extends Component<ManageRouteProps, ManageRouteState> {

    state: ManageRouteState = {
        deleteInitiated: false,
        editInitiated: false,
        id: ''
    };

    onDelete: IdFunc = (id: string) => {
        if (!this.state.deleteInitiated) {
            this.setState({deleteInitiated: true, editInitiated: false, id});
        } else {
            if (id === this.state.id) {
                this.props.removeRouteFromRoutes(id);
            }
            this.setState({deleteInitiated: false, editInitiated: false, id: ''});
        }
    }

    onEdit: IdFunc = (id: string) => {
        if (this.state.editInitiated && id !== this.state.id) {
            this.setState({deleteInitiated: false, editInitiated: false, id: ''});
        } else {
            this.setState({deleteInitiated: false, editInitiated: true, id});
        }
    }

    render () {
        return (
            <Fragment>
                <DeleteModal 
                    show={this.state.deleteInitiated}
                    onDelete={this.onDelete}
                    id={this.state.id}
                    value={0 /* TODO implement resell value of active route */}
                />
                <hr/>
                {this.props.routes.length <= 0 ? <p className={Styles.NoRoutes}>NO ACTIVE ROUTES</p> 
                :
                this.state.editInitiated ? <EditRoute 
                    route={this.props.routes.filter(e => e.id === this.state.id)} 
                    onCancel={this.onEdit.bind(null, '')} />
                : 
                <div className={Styles.Container}>
                    {this.props.routes.map((route: Route, index: number): JSX.Element => getMetaRoute({
                        route,
                        index,
                        editDisabled: false,
                        deleteDisabled: false,
                        onEdit: this.onEdit,
                        onDelete: this.onDelete
                    }))}
                </div>}
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageRoute);