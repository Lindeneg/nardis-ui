import { Fragment } from "react";
import { connect } from "react-redux";

import { 
    FinanceHistory, 
    FinanceHistoryItem, 
    FinanceTurnItem,
    FinanceTotal, 
    FinanceType,
    Resource, 
    localKeys 
} from "nardis-game";

import Table from '../../components/Utility/Table/Table';
import NardisState from "../../common/state";
import Styles from './Finance.module.css';
import { FinanceExpenseRows } from "../../common/constants";
import { Func, Functional, Props } from "../../common/props";
import { 
    GetAllResources, GetFinanceHistory, 
    GetFinanceTotal, GetTotalProfits 
} from "../../common/actions";


type Compare = Func<FinanceTurnItem, boolean>;

interface FinanceMappedProps {
    turn             : number,
    getFinanceHistory: GetFinanceHistory,
    getAllResources  : GetAllResources,
    getFinanceTotal  : GetFinanceTotal
    getTotalProfits  : GetTotalProfits
};

interface FinanceProps extends Props, FinanceMappedProps {
    alt             ?: {
        history      : FinanceHistory,
        total        : FinanceTotal,
        totalProfits : number

    }
};


const mapStateToProps = (state: NardisState): FinanceMappedProps => ({
    turn             : state.turn,
    getFinanceHistory: state.getFinanceHistory,
    getAllResources  : state.getAllResources,
    getFinanceTotal  : state.getFinanceTotal,
    getTotalProfits  : state.getTotalProfits
});

const getHeaders = (currentTurn: number, start: string): string[] => [
    start,
    'TURN ' + currentTurn,
    'TURN ' + (currentTurn > 1 ? currentTurn - 1 : '~'),
    'TURN ' + (currentTurn > 2 ? currentTurn - 2 : '~'),
    'ALL TURNS'
];

const reduceFinance = (items: FinanceTurnItem[], cmp?: Compare): number => (
    (cmp ? items.filter((e: FinanceTurnItem): boolean => cmp(e)) : items)
    .map((e: FinanceTurnItem): number => e.amount * e.value)
    .reduce((a: number, b: number) => a + b, 0)
);

const getRow = (item: FinanceHistoryItem, cmp: Compare): string[] => (
    Object.keys(item)
    .map((e: string): string => (reduceFinance(item[e], cmp).toLocaleString() + 'G'))
);

const getTotalProfitsPerTurn = (history: FinanceHistory) => (
    Object.keys(history.income).map(key => (
        (reduceFinance(history.income[key]) - reduceFinance(history.expense[key])).toLocaleString() + 'G'
    ))
);


// perhaps create css classes in the table component and simply pass the desired class-name as a prop

const propStyles = {
    rowStyles: {
        maxWidth: '0px',
        paddingTop: '12px',
        fontSize: '14px',
        color: '#eee'
    },
    headerStyles: {
        color: 'burlywood', 
        fontSize: '18px'
    },
    headerStylesAfter: {
        color: '#212fa2', 
        fontSize: '18px'
    }
};


/**
 * Component to display financial information from the current 
 * and last two turns as well as the overall total for all turns.
 */
const finance: Functional<FinanceProps> = (
    props: FinanceProps
): JSX.Element => {
    const history    : FinanceHistory = props.alt ? props.alt.history : props.getFinanceHistory()[0];
    const total      : FinanceTotal   = props.alt ? props.alt.total : props.getFinanceTotal()[0];
    const revenueRows: Resource[]     = props.getAllResources();

    const mGetHeaders                 = getHeaders.bind(null, props.turn);
    const mGetRow                     = getRow.bind(null, history.expense);
    const mCmp                        = (target: FinanceType, item: FinanceTurnItem): boolean => item.type === target;  
    const mGetTotal                   = (key: string | number)                      : string  => (
        (total[(typeof key === 'number' ? localKeys[key] : key)] || 0).toLocaleString() + 'G'
    );
    
    return (
        <Fragment>
            <div className={Styles.Finance}>
                <hr/>
                <div className={Styles.Tables}>
                    <div className={Styles.FinanceTable}>
                        <Table
                            headers={mGetHeaders('REVENUE')}
                            rows={[
                                ...revenueRows.map((e: Resource): string[] => ([
                                    e.name, 
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => e.id === j.id), 
                                    mGetTotal(e.id)
                                ])),
                                [
                                    'RECOUPS',
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.Recoup]),
                                    mGetTotal(localKeys[FinanceType.Recoup])
                                ],
                                [
                                    'STOCKS',
                                    ...getRow(history.income, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.StockSell]),
                                    mGetTotal(localKeys[FinanceType.StockSell])
                                ]
                            
                            ]}
                            rowStyles={propStyles.rowStyles}
                            headerStyles={propStyles.headerStyles}
                        />
                    </div>
                    <hr/>
                    <div className={Styles.FinanceTable} >
                        <Table
                            headers={mGetHeaders('EXPENSE')}
                            rows={[
                                ...FinanceExpenseRows.map((row: [string, FinanceType]): string[] => [
                                    row[0],
                                    ...mGetRow(mCmp.bind(null, row[1])),
                                    mGetTotal(row[1])
                                    ]
                                ),
                                [
                                    'STOCKS',
                                    ...getRow(history.expense, (j: FinanceTurnItem): boolean => j.id === localKeys[FinanceType.StockBuy]),
                                    mGetTotal(localKeys[FinanceType.StockBuy])
                                ]
                            ]}
                            {...propStyles}
                        />
                    </div>
                    <hr/>
                    <div className={Styles.FinanceTable}>
                        <Table
                            headers={mGetHeaders('PROFITS')}
                            rows={[['TOTAL PROFITS', ...getTotalProfitsPerTurn(history), (props.alt ? props.alt.totalProfits : props.getTotalProfits()).toLocaleString() + 'G']]}
                            {...propStyles}
                        />
                    </div>
                    <hr/>
                </div>
            </div>
        </Fragment>
    );
}


export default connect(mapStateToProps)(finance);