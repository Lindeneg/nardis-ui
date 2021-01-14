import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { Resource, Route, RoutePlanCargo, Train } from "nardis-game";

import NardisState from "../../../common/state";
import EditRoute from './EditRoute/EditRoute';
import DeleteModal from './Helpers/DeleteModal/DeleteModal';
import getMetaRoute from "./Helpers/getMetaRoute";
import Styles from './ManageRoute.module.css';
import { GetPossibleTrains, NardisAction } from "../../../common/actions";
import { IdFunc, MapDispatch, OnDispatch, PossibleTrain, Props } from "../../../common/props";
import { CargoChange } from "../NewRoute/NewRoute";
import { RouteRevolution } from "../../../common/constants";
import { addCargo, removeCargo } from './Helpers/manipulateCargo';


interface ManageRouteState {
    deleteInitiated: boolean,
    editInitiated: boolean,
    possibleTrains: PossibleTrain[],
    id: string,
    train: Train | null,
    editCost: number,
    routePlan: RoutePlanCargo | null,
    showModal: boolean
};

interface BuildRouteMappedProps {
    routes: Route[],
    getPossibleTrains : GetPossibleTrains
};

interface BuildRouteDispatchedProps {
    removeRouteFromRoutes: IdFunc,
};

interface ManageRouteProps extends Props, BuildRouteMappedProps, BuildRouteDispatchedProps {}


const mapStateToProps = (
    state: NardisState
): BuildRouteMappedProps => ({
    routes: state.routes,
    getPossibleTrains: state.getPossibleTrains
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
        showModal: false,
        possibleTrains: this.props.getPossibleTrains(),
        id: '',
        editCost: 0,
        train: null,
        routePlan: null
    };

    onDelete: IdFunc = (id: string): void => {
        if (!this.state.deleteInitiated) {
            this.setState({
                ...this.state, 
                id,
                deleteInitiated: true
            });
        } else {
            if (id === this.state.id) {
                this.props.removeRouteFromRoutes(id);
            }
            this.setState({
                ...this.state, 
                id: '',
                deleteInitiated: false, 
            });
        }
    }

    onEdit: IdFunc = (id: string): void => {
        if (this.state.editInitiated && id !== this.state.id) {
            this.setState({
                ...this.state, 
                id: '', 
                editInitiated: false, 
                train: null, 
                routePlan: null
            });
        } else {
            const route: Route[] = this.props.routes.filter(e => e.id === id);
            this.setState({
                ...this.state, 
                id,
                editInitiated: true, 
                train: route.length > 0 ? route[0].getTrain() : null,
                routePlan: route.length > 0 ? route[0].getRoutePlan() : null,
            });
        }
    }

    onCargoAdd: CargoChange = (resource: Resource, revolution: RouteRevolution): void => {
        this.setState({
            ...this.state,
            routePlan: {
                ...addCargo(resource, revolution, this.state.routePlan)
            }
        });
    }

    onCargoRemove: CargoChange = (resource: Resource, revolution: RouteRevolution): void => {
        this.setState({
            ...this.state,
            routePlan: {
                ...removeCargo(resource, revolution, this.state.routePlan)
            }
        });
    }

    onChangeTrain: IdFunc = (id: string): void => {
        const newState = {...this.state};
        const newTrain: PossibleTrain[] = this.state.possibleTrains.filter(e => e.train.id === id);
        if (newTrain.length > 0) {
            newState.train = newTrain[0].train;
            if (newTrain[0].train.id === this.props.routes.filter(e => e.id === this.state.id)[0].getTrain().id) {
                newState.editCost = 0;
            } else {
                newState.editCost = newTrain[0].cost;
            }
        }
        this.setState({
            ...newState,
            showModal: false
        });
    }

    onModalOpen = (): void => {
        this.setState({
            ...this.state,
            showModal: true
        });
    }

    onModalClose = (): void => {
        this.setState({
            ...this.state,
            showModal: false
        }); 
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
                    train={this.state.train}
                    editCost={this.state.editCost}
                    routePlan={this.state.routePlan}
                    onCancel={this.onEdit.bind(null, '')} 
                    onCargoAdd={this.onCargoAdd}
                    onCargoRemove={this.onCargoRemove} 
                    onTrainChange={this.onChangeTrain}
                    changingTrain={this.state.showModal}
                    modalOpen={this.onModalOpen}
                    modalClose={this.onModalClose} 
                    possibleTrains={this.state.possibleTrains} />
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