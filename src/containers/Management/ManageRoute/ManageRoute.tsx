import { Component, Fragment } from "react";
import { connect } from "react-redux";

import { GameStatus, Resource, Route, RoutePlanCargo, Train, Upgrade } from "nardis-game";

import NardisState from "../../../common/state";
import EditRoute from './EditRoute/EditRoute';
import DeleteModal from './Helpers/DeleteModal/DeleteModal';
import getMetaRoute from "./Helpers/getMetaRoute";
import Styles from './ManageRoute.module.css';
import { EditActiveRoute, GetPossibleTrains, NardisAction } from "../../../common/actions";
import { IdFunc, MapDispatch, MapState, OnDispatch, PossibleTrain, Props } from "../../../common/props";
import { CargoChange } from "../NewRoute/NewRoute";
import { RouteRevolution } from "../../../common/constants";
import { addCargo, removeCargo } from './Helpers/manipulateCargo';


interface ManageRouteState {
    deleteInitiated: boolean,
    editInitiated  : boolean,
    possibleTrains : PossibleTrain[],
    id             : string,
    train          : Train | null,
    editCost       : number,
    recoupValue    : number,
    routePlan      : RoutePlanCargo | null,
    showModal      : boolean,
    didChange      : boolean
};

interface BuildRouteMappedProps {
    routes: Route[],
    upgrades: Upgrade[],
    gameStatus: GameStatus,
    getPossibleTrains : GetPossibleTrains
};

interface BuildRouteDispatchedProps {
    removeRouteFromRoutes: (id: string, value: number) => void,
    editActivePlayerRoutes: EditActiveRoute
};

interface ManageRouteProps extends Props, BuildRouteMappedProps, BuildRouteDispatchedProps {}


const mapStateToProps: MapState<BuildRouteMappedProps> = (
    state: NardisState
): BuildRouteMappedProps => ({
    routes: state.routes.sort((a: Route, b: Route): number => b.getProfit() - a.getProfit()),
    upgrades: state.upgrades,
    gameStatus: state.getGameStatus(),
    getPossibleTrains: state.getPossibleTrains
});

const mapDispatchToProps: MapDispatch<BuildRouteDispatchedProps> = (
    dispatch: OnDispatch
): BuildRouteDispatchedProps => (
    {
        removeRouteFromRoutes: (routeId: string, value: number) => dispatch(
            {
                type: NardisAction.REMOVE_FROM_PLAYER_ROUTE,
                payload: {
                    removeRouteFromRoutes: {
                        routeId,
                        value
                    }
                }
            }
        ),
        editActivePlayerRoutes: (routeId: string, train: Train, routePlan: RoutePlanCargo, cost: number) => dispatch(
            {
                type: NardisAction.EDIT_ACTIVE_PLAYER_ROUTE,
                payload: {
                    editActivePlayerRoute: {
                        routeId,
                        train,
                        routePlan,
                        cost
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
        recoupValue: 0,
        train: null,
        routePlan: null,
        didChange: false
    };

    onDelete: IdFunc = (id: string): void => {
        if (!this.state.deleteInitiated) {
            const route: Route[] = this.props.routes.filter(e => e.id === id);
            this.setState({
                ...this.state, 
                id,
                recoupValue: route.length > 0 ? Math.floor(route[0].getCost() / 2) : 0,
                deleteInitiated: true
            });
        } else {
            if (id === this.state.id) {
                this.props.removeRouteFromRoutes(id, this.state.recoupValue);
            }
            this.setState({
                ...this.state, 
                id: '',
                recoupValue: 0,
                deleteInitiated: false, 
            });
        }
    }

    onEdit: IdFunc = (id: string): void => {
        if (this.state.editInitiated && id !== this.state.id) {
            this.setState({
                ...this.state, 
                id: '', 
                editCost: 0,
                editInitiated: false, 
                train: null, 
                routePlan: null,
                didChange: false
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
            didChange: true,
            routePlan: {
                ...addCargo(resource, revolution, this.state.routePlan)
            }
        });
    }

    onCargoRemove: CargoChange = (resource: Resource, revolution: RouteRevolution): void => {
        this.setState({
            ...this.state,
            didChange: true,
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
            didChange: true,
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
                    value={this.state.recoupValue}
                />
                <hr/>
                {this.props.routes.length <= 0 ? <p className={Styles.NoRoutes}>NO ACTIVE ROUTES</p> 
                :
                this.state.editInitiated ? <EditRoute 
                    route={this.props.routes.filter(e => e.id === this.state.id)} 
                    train={this.state.train}
                    upgrades={this.props.upgrades}
                    editCost={this.state.editCost}
                    routePlan={this.state.routePlan}
                    didChange={this.state.didChange}
                    onCancel={this.onEdit.bind(null, '')} 
                    onCargoAdd={this.onCargoAdd}
                    onConfirm={this.props.editActivePlayerRoutes}
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
                        editDisabled: this.props.gameStatus.gameOver,
                        deleteDisabled: this.props.gameStatus.gameOver,
                        onEdit: this.onEdit,
                        onDelete: this.onDelete
                    }))}
                </div>}
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageRoute);