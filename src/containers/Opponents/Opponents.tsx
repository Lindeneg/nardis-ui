import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { 
    Finance, 
    OpponentInformation, 
    opponentInformation, 
    Player, 
    PlayerType, 
    Stock, 
    stockConstant, 
    Stocks, 
    StockSupply
} from 'nardis-game';

import CFinance from '../Finance/Finance';
import NardisState from '../../common/state';
import Opponent from './Opponent/Opponent';
import Button from '../../components/Utility/Button/Button';
import Styles from './Opponents.module.css';
import { IdFunc, Props } from '../../common/props';
import { ButtonType } from '../../common/constants';


interface OpponentsState {
    viewFinancePlayerId: string,
    showStockChart: boolean

};

interface MappedOpponentsProps {
    players: Player[],
    gameStocks: Stocks[],
};

interface OpponentsProps extends Props, MappedOpponentsProps {};

const mapStateToProps = (state: NardisState): MappedOpponentsProps => ({
    players: state.getAllPlayers(),
    gameStocks: state.getAllStock()
});

const getPlayerIndex = (playerId: string, players: Player[]): number => {
    for (let i: number = 0; i < players.length; i++) {
        if (players[i].id === playerId) {
            return i;
        }
    }
    return -1;
}

const getStockOwnerBackgroundColorArray = (stock: Stock, players: Player[], defaultColor: string = 'white'): string[] => {
    const result: string[] = [];
    const supply: StockSupply = stock.getSupply();
    Object.keys(supply).forEach((playerId: string): void => {
        if (supply[playerId] > 0) {
            const index: number = getPlayerIndex(playerId, players);
            if (index > -1) {
                const color: string = opponentInformation[index].color;
                for (let i: number = 0; i < supply[playerId]; i++) {
                    result.push(color);
                }
            }
        }
    });
    if (result.length < stockConstant.maxStockAmount) {
        const diff: number = stockConstant.maxStockAmount - result.length;
        for (let i: number = 0; i < diff; i++) {
            result.push(defaultColor);
        }
    }
    return result;
}


class Opponents extends Component<OpponentsProps, OpponentsState> {

    state: OpponentsState = {
        viewFinancePlayerId: '',
        showStockChart: false
    };

    onViewFinanceClick: IdFunc = (playerId: string): void => {
        if (this.state.viewFinancePlayerId === playerId || playerId === '') {
            this.setState({viewFinancePlayerId: ''});
        } else {
            this.setState({viewFinancePlayerId: playerId});
        }
    }

    onStockBuy: IdFunc = (playerId: string): void => {

    }

    onStockSell: IdFunc = (playerId: string): void => {
        
    }

    onToggleStockChart = (): void => {
        this.setState({
            ...this.state,
            showStockChart: !this.state.showStockChart
        });
    }

    getFinance = (): JSX.Element => {
        const player: Player[] = this.props.players.filter(
            (player: Player): boolean => player.id === this.state.viewFinancePlayerId
        );
        if (player.length > 0) {
            const finance: Finance = player[0].getFinance();
            return (    
                <Fragment>
                    <hr/>
                    <CFinance 
                        alt={{
                            history: finance.getHistory(),
                            total: finance.getTotalHistory(),
                            totalProfits: finance.getTotalProfits()
                        }}
                    />
                     <hr/>
                </Fragment>
            );
        }
        return <div></div>;
    }

    render(): JSX.Element {
        return (
            <Fragment>
                <Button
                    disabled={false}
                    buttonType={ButtonType.ViewFinance}
                    whenClicked={() => this.onToggleStockChart()}
                    style={this.state.showStockChart ? {backgroundColor: 'green', marginBottom: '15px'} : {marginBottom: '15px'}}
                >
                    VIEW STOCK CHART
                </Button>
                {/* TODO Stock Chart */}
                <hr/>
                <div className={Styles.Opponents}>
                     {this.props.players.map((player: Player, index: number): JSX.Element => {
                         const finance: Finance             = player.getFinance();
                         const stock  : Stock               = this.props.gameStocks[0][player.id];
                         const info   : OpponentInformation = opponentInformation[index];
                         return (
                             <Opponent 
                                key={player.id}
                                upper={{
                                    name: player.name,
                                    level: player.getLevel().toLocaleString(),
                                    money: finance.getGold().toLocaleString() + 'G'
                                }}
                                lower={{
                                    netWorth: finance.getNetWorth().toLocaleString() + 'G',
                                    averageRevenue: finance.getAverageRevenue().toLocaleString() + 'G/TURN',
                                    averageExpense: finance.getAverageExpense().toLocaleString() + 'G/TURN',
                                    routes: player.getRoutes().length.toLocaleString(),
                                    //queue: player.getQueue().length.toLocaleString()
                                }}
                                callbacks={{
                                    viewFinances: this.onViewFinanceClick.bind(this, player.id),
                                    stockBuy: this.onStockBuy.bind(this, player.id),
                                    stockSell: this.onStockSell.bind(this, player.id)
                                }}
                                stockBuy={stock.getBuyValue().toLocaleString() + 'G'}
                                stockSell={stock.getSellValue().toLocaleString() + 'G'}
                                stockOwners={getStockOwnerBackgroundColorArray(stock, this.props.players)}
                                financeActive={player.id === this.state.viewFinancePlayerId}
                                disabled={{
                                    finance: player.playerType === PlayerType.Human,
                                    stockBuy: stock.currentAmountOfStockHolders() >= stockConstant.maxStockAmount,
                                    stockSell: !stock.isStockHolder(this.props.players[0].id)
                                }}
                                avatar={info.avatar}
                                color={info.color}
                             />
                         )
                     })}
                </div>
                {this.state.viewFinancePlayerId ? this.getFinance() : null}
            </Fragment>
        );
    }
}


export default connect(mapStateToProps)(Opponents);