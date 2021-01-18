import { FinanceType } from 'nardis-game';

import { NIndexable } from './props';
import { NavigationEntriesProps } from '../components/Navigation/NavigationEntries/NavigationEntries';
import { CSSProperties } from 'react';


/**
 * arrival   - from the initial departure city to the initial arrival city 
 * departure - from the initial arrival city to the initial departure city
 */
export enum Direction {
    Arrival,
    Departure
};

/**
 * nonfull - none or half the directions have been visited
 * full    - all directions have been visited
 */
export enum RouteRevolution {
    NonFull,
    Full
};

/**
 * optional input types
 */
export enum InputType {
    TextArea,
    Select
};

/**
 * list types used for modal content
 */
export enum ListType {
    Destination,
    Origin,
    Train
};

/**
 * signs used for adding/subtracting elements
 */
export enum SignType {
    Plus,
    Minus
};

/**
 * button type for custom styling
 */
export enum ButtonType {
    Success,
    Danger,
    EndTurn,
    ChangeOrigin,
    ChangeDestination,
    SetTrain,
    CreateGame,
    BuyRoute,
    ManipulateRoute,
    EditRouteConfirm,
    EditRouteCancel
};

/**
 * button type key yields class name for custom styling
 */
export const buttonTypeToClassName: NIndexable<string> = {
    [ButtonType.Success]          : 'Success',
    [ButtonType.Danger]           : 'Danger',
    [ButtonType.EndTurn]          : 'EndTurn',
    [ButtonType.ChangeOrigin]     : 'ChangeOrigin',
    [ButtonType.ChangeDestination]: 'ChangeDestination',
    [ButtonType.SetTrain]         : 'SetTrain',
    [ButtonType.CreateGame]       : 'CreateGame',
    [ButtonType.BuyRoute]         : 'BuyRoute',
    [ButtonType.ManipulateRoute]  : 'ManipulateRoute',
    [ButtonType.EditRouteConfirm] : 'EditRouteConfirm',
    [ButtonType.EditRouteCancel]  : 'EditRouteCancel'
};

export const mainNavigationBarEntries: NavigationEntriesProps = {
    entries: [
        {
            link     : '/management',
            active   : true,
            content  : 'MANAGEMENT'
        },
        {
            link     : '/finance',
            active   : false,
            content  : 'FINANCE'
        },
        {
            link     : '/upgrades',
            active   : false,
            content  : 'UPGRADES'
        },
        {
            link     : '/resources',
            active   : false,
            content  : 'RESOURCES'
        },
        {
            link     : '/opponents',
            active   : false,
            content  : 'OPPONENTS'
        }
    ],
    showEndTurnButton: true
};

export const managementNavigationBarEntries: NavigationEntriesProps = {
    entries: [
        {
            link     : '/management/new-route',
            exact    : true,
            active   : false,
            content  : 'NEW ROUTE'
        },
        {
            link     : '/management/manage-route',
            exact    : true,
            active   : false,
            content  : 'MANAGE ROUTE'
        },
        {
            link     : '/management/build-queue',
            exact    : true,
            active   : false,
            content  : 'BUILD QUEUE'
        }
    ],
    showEndTurnButton: false
};

export const cityResourceTableHeaderNames: string[] = [
    'NAME',
    'VALUE',
    'WEIGHT',
    'AVAILABLE'
];

export const metaRouteHeaderNames: string[] = [
    'DISTANCE',
    'SPEED',
    'TURNS LEFT',
    'UPKEEP'
];

export const metaRouteActiveHeaderNames: string[] = [
    'STATE',
    'DISTANCE',
    'TRAVELLED',
    'PROFIT'
];

export const metaRouteEditHeaderNames: string[] = [
    'DISTANCE',
    'TRAVELLED',
    'PROFIT',
    'BOUGHT ON TURN'
];

export const layoutCardLabels: [string, string][] = [
    ['money', 'g'],
    ['level', ''],
    ['range', 'km'],
    ['routes', ''],
    ['queue', ''],
    ['turn', '']
];

export const FinanceExpenseRows: Array<[string, FinanceType]> = [
    ['TRAINS', FinanceType.Train],
    ['TRACKS', FinanceType.Track],
    ['UPGRADES', FinanceType.Upgrade],
    ['UPKEEP', FinanceType.Upkeep],
];

export const cardDefaultStyle: CSSProperties = {margin: '0', backgroundColor: '#2d3a9c'};