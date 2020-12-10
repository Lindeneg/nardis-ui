import { City, PotentialRoute } from 'nardis-game';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';


import OneWayRoute from '../../../components/Information/OneWayRoute/OneWayRoute';
import { ButtonType } from '../../../components/Utility/Button/buttonType';
import { INardisState } from '../../../common/state';
import INewRouteProps from './NewRoute.props';
import INewRouteState from './NewRoute.state';


class NewRoute extends Component<INewRouteProps> {

    state: INewRouteState = {
        cityOne: null,
        cityTwo: null,
        distance: 0,
        purchasedOnTurn: 0,
        turnCost: 0,
        otherRoutes: [],
        possibleTrains: []
    }

    componentDidMount = () => {
        if (!this.state.cityOne && this.props.game) {
            const startCity: City = this.props.game.getCurrentPlayer().getStartCity();
            const possibleRoutes: PotentialRoute[] = this.props.game.getArrayOfPossibleRoutes(startCity);
            if (possibleRoutes.length > 0) {
                this.setState({
                    cityOne: startCity,
                    cityTwo: possibleRoutes[0].cityTwo,
                    distance: possibleRoutes[0].distance,
                    purchasedOnTurn: possibleRoutes[0].purchasedOnTurn,
                    turnCost: possibleRoutes[0].turnCost,
                    otherRoutes: possibleRoutes.filter((_, i: number) => i !== 0),
                    possibleTrains: this.props.game.getArrayOfAdjustedTrains()
                });
            }
        }
    }

    getPossibleRoutes = () => {

    }

    render() {
        return (
            <Fragment>
                <OneWayRoute 
                    button={{
                        disabled: this.props.game ? this.props.game.getCurrentPlayer().getRoutes().length <= 0 : true,
                        buttonType: ButtonType.DANGER,
                        whenClicked: () => console.log("change initial depart city"),
                        style: {color: 'darkorange', height: '0', paddingLeft: '14px'},
                        content: 'CHANGE ORIGIN'
                    }}
                    cityOne={{
                        showSize: true,
                        from: true,
                        city: this.state.cityOne,
                        cityNameColor: '#ffff00'
                    }}
                    cityTwo={{
                        showSize: true,
                        from: false,
                        city: this.state.cityTwo,
                        cityNameColor: '#008000'
                    }}
                />
                <OneWayRoute 
                    button={{
                        disabled: this.state.otherRoutes.length > 0,
                        buttonType: ButtonType.DANGER,
                        whenClicked: () => console.log("change initial arrival city"),
                        style: {color: 'darkorange', height: '0', paddingLeft: '3px'},
                        content: 'CHANGE DESTINATION'
                    }}
                    cityOne={{
                        showSize: false,
                        from: true,
                        city: this.state.cityTwo,
                        cityNameColor: '#008000'
                    }}
                    cityTwo={{
                        showSize: false,
                        from: false,
                        city: this.state.cityOne,
                        cityNameColor: '#ffff00'
                    }}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});

export default connect(mapStateToProps)(NewRoute);