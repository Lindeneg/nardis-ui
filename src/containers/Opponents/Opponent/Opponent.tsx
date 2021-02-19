import Avatar from '../../../components/Utility/Avatar/Avatar';
import Card from '../../../components/Information/Cards/Card/Card';
import StockOwners from '../StockInfo/StockOwners/StockOwners';
import Button from '../../../components/Utility/Button/Button';
import Styles from './Opponent.module.css';
import { ButtonType } from "../../../common/constants";
import { 
    Func,
    Functional, 
    Indexable, 
    Props 
} from "../../../common/props";


interface Upper extends Indexable<string> {
    name             : string,
    level            : string,
    money            : string,
};

interface Lower extends Indexable<string> {
    netWorth         : string,
    averageRevenue   : string,
    averageExpense   : string,
    routes           : string,
};

interface DisabledButton {
    finance: boolean,
    stockBuy: boolean,
    stockSell: boolean
};

interface Callback {
    viewFinances     : Func<void, void>,
    stockBuy         : Func<void, void>,
    stockSell        : Func<void, void>
};

interface OpponentProps extends Props {
    upper            : Upper,
    lower            : Lower,
    avatar           : number,
    color            : string,
    stockBuy         : string,
    stockSell        : string,
    stockOwners      : string[],
    financeActive    : boolean,
    disabled         : DisabledButton,
    callbacks        : Callback
};


const opponent: Functional<OpponentProps> = (
    props: OpponentProps
): JSX.Element => (
    <div className={Styles.Opponent}>
        <Avatar 
            avatar={props.avatar}
            alt={`${props.upper.name} avatar`}

        />
        <div className={Styles.CardContainer}>
            {Object.keys(props.upper).map((key: string, index: number): JSX.Element => (
                <Card 
                    key={key + index}
                    label={key}
                    value={props.upper[key]}
                    style={key !== 'name' ? {margin: 0, marginTop: 5} : {margin: 0, backgroundColor: props.color}}
                />
            ))}
        </div>
        {Object.keys(props.lower).map((key: string, index: number): JSX.Element => (
            <Card 
                key={key + index}
                label={key === 'averageRevenue' ? 'avg. revenue' : (key === 'netWorth' ? 'net worth' : (key === 'averageExpense' ? 'avg. expense' : key))}
                value={props.lower[key]}
                style={{margin: 0, marginTop: 5}}
            />
        ))}
        <div className={Styles.Buttons}>
            <Button 
                disabled={props.disabled.stockBuy}
                buttonType={ButtonType.StockAction}
                whenClicked={() => props.callbacks.stockBuy()}
                altText={{
                    left: 'BUY STOCK',
                    right: props.stockBuy
                }}
            />
            <Button 
                disabled={props.disabled.stockSell}
                buttonType={ButtonType.StockAction}
                whenClicked={() => props.callbacks.stockSell()}
                altText={{
                    left: 'SELL STOCK',
                    right: props.stockSell
                }}
            />
            <StockOwners 
                backgroundColors={props.stockOwners}
            />
            <Button
                disabled={props.disabled.finance}
                buttonType={ButtonType.StandardView}
                whenClicked={() => props.callbacks.viewFinances()}
                style={props.financeActive ? {backgroundColor: 'green'} : {}}
            >
                VIEW FINANCES
            </Button>
        </div>
    </div>
);


export default opponent;