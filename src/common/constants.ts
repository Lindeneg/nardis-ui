import { FinanceType, Indexable } from 'nardis-game';

import { NIndexable } from './props';
import { NavigationEntriesProps } from '../components/Navigation/NavigationEntries/NavigationEntries';
import { CSSProperties } from 'react';
import { ChartOptions } from 'chart.js';


/**
 * arrival   - from the initial departure city to the initial arrival city 
 * departure - from the initial arrival city to the initial departure city
 */
export enum Direction {
    Arrival,
    Departure
};

/**
 * The direction of an arrow relative to the position of the user
 */
export enum ArrowDirection {
    Right,
    Left
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
    EditRouteCancel,
    StockAction,
    StandardView
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
    [ButtonType.EditRouteCancel]  : 'EditRouteCancel',
    [ButtonType.StockAction]      : 'StockAction',
    [ButtonType.StandardView]     : 'StandardView',
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

export const defaultChartOptions: ChartOptions = {
    legend: {
        labels: {
            fontColor: 'white'
        }
    },
    elements: {
        point: {
            radius: 2
        }
    },
    scales: {
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'TURN',
                fontColor: '#eee'
            },
            ticks: {
                fontColor: 'white',
                autoSkip: true,
                maxTicksLimit: 15
            }
        }],
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'VALUE',
                fontColor: '#eee'
            },
            ticks: {
                fontColor: 'white'
            }
        }]
    },
    responsive: true
}

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

export const yieldMap: Indexable<[number, number]> = {
    low: [5, 16],
    med: [15, 86],
};

export const cardDefaultStyle: CSSProperties = {margin: '0', backgroundColor: '#2d3a9c'};

export const defaultChartColors: string[] = [
    '#CC0000',
    '#01579B',
    '#911eb4',
    '#4363d8',
    '#9a6324',
    '#808000',
    '#469990',
    '#ffd8b1',
    '#e6194B',
    '#f58231',
    '#ffe119',
    '#bfef45',
    '#4D5656',
    '#1B5E20'
];