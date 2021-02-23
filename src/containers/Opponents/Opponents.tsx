import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { 
    Finance, 
    GameStatus, 
    OpponentInformation, 
    opponentInformation, 
    Player, 
    Stock, 
    stockConstant, 
    Stocks, 
    StockSupply
} from 'nardis-game';

import CFinance from '../Finance/Finance';
import NardisState from '../../common/state';
import Opponent from './Opponent/Opponent';
import Button from '../../components/Utility/Button/Button';
import Modal from '../../components/Utility/Modal/Modal';
import StockChart from './StockInfo/StockChart/StockChart';
import Styles from './Opponents.module.css';
import { IdFunc, MapDispatch, OnDispatch, Props } from '../../common/props';
import { ButtonType } from '../../common/constants';
import { NardisAction } from '../../common/actions';


type BuyOutFunc = (playerId: string, selfBuyOut: boolean) => void;

interface OpponentsState {
    viewFinancePlayerId: string,
    showStockChart: boolean,
    showModal: boolean,
    modalButtonCallback: () => void
};

interface DispatchedProps {
    buyStock: IdFunc,
    buyOutPlayer: BuyOutFunc,
    sellStock: IdFunc
};

interface MappedOpponentsProps {
    players: Player[],
    gameStocks: Stocks[],
    turn: number,
    gameStatus: GameStatus
};

interface OpponentsProps extends Props, MappedOpponentsProps, DispatchedProps {};


export const getPlayerIndexFromPlayerId = (playerId: string, players: Player[]): number => {
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
        const n: number = supply[playerId];
        if (n > 0) {
            const index: number = getPlayerIndexFromPlayerId(playerId, players);
            if (index > -1) {
                const color: string = opponentInformation[index].color;
                for (let i: number = 0; i < n; i++) {
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

const mapStateToProps = (state: NardisState): MappedOpponentsProps => ({
    players: state.getAllPlayers(),
    gameStocks: state.getAllStock(),
    turn: state.turn,
    gameStatus: state.getGameStatus()
});

const mapDispatchToProps: MapDispatch<DispatchedProps> = (
    dispatch: OnDispatch
): DispatchedProps => (
    {
        buyStock: (playerId: string) => dispatch(
            {
                type: NardisAction.BUY_STOCK,
                payload: {
                    buyStock: {
                        playerId
                    }
                }
            }
        ),
        sellStock: (playerId: string) => dispatch(
            {
                type: NardisAction.SELL_STOCK,
                payload: {
                    sellStock: {
                        playerId
                    }
                }
            }
        ),
        buyOutPlayer: (playerId: string, selfBuyOut: boolean) => dispatch({
            type: NardisAction.BUY_OUT_PLAYER,
            payload: {buyOutPlayer: {playerId, selfBuyOut}}
        })
    }
);


/**
 * 
 */
class Opponents extends Component<OpponentsProps, OpponentsState> {

    state: OpponentsState = {
        viewFinancePlayerId: '',
        showStockChart: false,
        showModal: false,
        modalButtonCallback: () => null
    };

    onViewFinanceClick: IdFunc = (playerId: string): void => {
        if (this.state.viewFinancePlayerId === playerId || playerId === '') {
            this.setState({viewFinancePlayerId: ''});
        } else {
            this.setState({viewFinancePlayerId: playerId});
        }
    }

    onStockBuy: IdFunc = (playerId: string): void => {
        this.props.buyStock(playerId);
    }

    onStockSell: IdFunc = (playerId: string): void => {
        this.props.sellStock(playerId);
    }

    onBuyoutConfirm = () => {
        this.state.modalButtonCallback();
        this.setState({
            ...this.state,
            modalButtonCallback: () => null,
            showModal: false
        });
    }

    onBuyout: BuyOutFunc = (playerId: string, selfBuyOut: boolean): void => {
        this.setState({
            ...this.state,
            showModal: true,
            modalButtonCallback: this.props.buyOutPlayer.bind(this, playerId, selfBuyOut)
        });
    }

    onToggleStockChart = (): void => {
        this.setState({
            ...this.state,
            showStockChart: !this.state.showStockChart
        });
    }

    onHideModal = (): void => {
        this.setState({
            ...this.state,
            showModal: false
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
        const human: Player = this.props.players[0];
        return (
            <Fragment>
                <Modal
                    whenClicked={() => this.onHideModal()}
                    show={this.state.showModal}
                    style={{backgroundColor: 'navy', overflowY: 'unset', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
                >
                    <Button
                        disabled={false}
                        buttonType={ButtonType.Success}
                        whenClicked={() => this.onBuyoutConfirm()}
                    >
                        CONFIRM BUYOUT
                    </Button>
                    <Button
                        disabled={false}
                        buttonType={ButtonType.Danger}
                        whenClicked={() => this.onHideModal()}
                    >
                        CANCEL BUYOUT
                    </Button>
                </Modal>
                <Button
                    disabled={false}
                    buttonType={ButtonType.StandardView}
                    whenClicked={() => this.onToggleStockChart()}
                    style={this.state.showStockChart ? {backgroundColor: 'green', marginBottom: '15px'} : {marginBottom: '15px'}}
                >
                    VIEW STOCK CHART
                </Button>
                {this.state.showStockChart ? <StockChart 
                    players={this.props.players} 
                    gameStocks={this.props.gameStocks[0]} 
                    turn={this.props.turn}
                /> : null}
                <hr/>
                <div className={Styles.Opponents}>
                     {this.props.players.map((player: Player, index: number): JSX.Element => {
                         const finance     : Finance             = player.getFinance();
                         const stock       : Stock               = this.props.gameStocks[0][player.id];
                         const info        : OpponentInformation = opponentInformation[index];
                         const maxStock    : boolean             = stock.currentAmountOfStockHolders() >= stockConstant.maxStockAmount;
                         const fullOwner   : boolean             = maxStock && stock.getSupply()[human.id] >= stockConstant.maxStockAmount;
                         const isHumanStock: boolean             = stock.owningPlayerId === human.id;
                         let buyValue      : number              = stock.getBuyValue();
                         let buyText       : string              = 'BUY STOCK';
                         let buyFunc       : BuyOutFunc          = this.onStockBuy;

                         if (maxStock) {
                             const supply = stock.getBuyOutValues();
                             for (let i: number = 0; i < supply.length; i++) {
                                 if (supply[i].id === human.id) {
                                     buyValue = isHumanStock && fullOwner ? buyValue : Math.floor(stock.getSellValue() * stockConstant.maxStockAmount) - supply[i].totalValue;
                                     buyText  = isHumanStock && fullOwner ? buyText : 'BUY OUT';
                                     buyFunc  = isHumanStock && fullOwner ? buyFunc : this.onBuyout;
                                     break;
                                 }
                             }
                         }
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
                                }}
                                callbacks={{
                                    viewFinances: this.onViewFinanceClick.bind(this, player.id),
                                    stockBuy: buyFunc.bind(this, player.id, isHumanStock && maxStock && !fullOwner),
                                    stockSell: this.onStockSell.bind(this, player.id)
                                }}
                                stockBuy={buyValue.toLocaleString() + 'G'}
                                stockSell={stock.getSellValue().toLocaleString() + 'G'}
                                buyText={buyText}
                                stockOwners={getStockOwnerBackgroundColorArray(stock, this.props.players)}
                                financeActive={player.id === this.state.viewFinancePlayerId}
                                disabled={{
                                    stockBuy: (
                                        buyValue > human.getFinance().getGold() || buyValue <= 0 || 
                                        !stock.isActive() || this.props.gameStatus.gameOver || (maxStock && fullOwner)
                                    ),
                                    stockSell: !stock.isStockHolder(human.id) || !stock.isActive() || this.props.gameStatus.gameOver
                                }}
                                isActive={player.isActive()}
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


export default connect(mapStateToProps, mapDispatchToProps)(Opponents);