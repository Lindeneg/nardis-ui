import { Fragment } from 'react';

import OneWayRoute from './../OneWayRoute/OneWayRoute';
import { ButtonType } from '../../../Utility/Button/buttonType';
import ITwoWayRouteProps from './TwoWayRoute.props';


const twoWayRoute = (props: ITwoWayRouteProps): JSX.Element => (
    <Fragment>
        <OneWayRoute 
            button={{
                disabled: props.routesLength <= 0,
                buttonType: ButtonType.CHANGE_ORIGIN,
                whenClicked: props.whenClickOrigin,
                content: 'CHANGE ORIGIN'
            }}
            cityOne={{
                showSize: true,
                from: true,
                city: props.cityOne,
                cityNameColor: '#ffff00'
            }}
            cityTwo={{
                showSize: true,
                from: false,
                city: props.cityTwo,
                cityNameColor: '#008000'
            }}
        />
        <OneWayRoute 
            button={{
                disabled: props.otherRoutesLength <= 0,
                buttonType: ButtonType.CHANGE_DESTINATION,
                whenClicked: props.whenClickDestination,
                content: 'CHANGE DESTINATION'
            }}
            cityOne={{
                showSize: false,
                from: true,
                city: props.cityTwo,
                cityNameColor: '#008000'
            }}
            cityTwo={{
                showSize: false,
                from: false,
                city: props.cityOne,
                cityNameColor: '#ffff00'
            }}
        />
    </Fragment>
);

export default twoWayRoute;