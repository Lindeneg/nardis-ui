import { Train } from 'nardis-game';
import { NavigationEntriesProps } from '../components/Navigation/NavigationEntries/NavigationEntries';


export enum Direction {
    Arrival,
    Departure
};

export enum RouteRevolution {
    NONE,
    SINGLE
};

export interface PossibleTrain {
    train: Train,
    cost: number
};

export const marginZ = {margin: '0'};

export const mainNavigationBarEntries: NavigationEntriesProps = {
    entries: [
        {
            link: '/management',
            active: true,
            content: 'MANAGEMENT'
        },
        {
            link: '/finance',
            active: false,
            content: 'FINANCE'
        },
        {
            link: '/upgrades',
            active: false,
            content: 'UPGRADES'
        },
        {
            link: '/resources',
            active: false,
            content: 'RESOURCES'
        },
        {
            link: '/opponents',
            active: false,
            content: 'OPPONENTS'
        }
    ],
    showEndTurnButton: true
};

export const managementNavigationBarEntries: NavigationEntriesProps = {
    entries: [
        {
            link: '/management/new-route',
            exact: true,
            active: false,
            content: 'NEW ROUTE'
        },
        {
            link: '/management/manage-route',
            exact: true,
            active: false,
            content: 'MANAGE ROUTE'
        },
        {
            link: '/management/build-queue',
            exact: true,
            active: false,
            content: 'BUILD QUEUE'
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

export const layoutCardLabels: [string, string][] = [
    ['money', 'g'],
    ['level', ''],
    ['range', 'km'],
    ['routes', ''],
    ['queue', ''],
    ['turn', '']
];