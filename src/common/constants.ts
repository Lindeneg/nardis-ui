import INavigationEntriesProps from '../components/Navigation/NavigationEntries/NavigationEntries.props';


export enum Direction {
    Arrival,
    Departure
};


export const mainNavigationBarEntries: INavigationEntriesProps = {
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

export const managementNavigationBarEntries: INavigationEntriesProps = {
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