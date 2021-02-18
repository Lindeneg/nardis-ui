import { Component, CSSProperties, Fragment } from "react";
import { connect } from "react-redux";

import  * as Nardis from "nardis-game";

import Upgrade from './Upgrade/Upgrade';
import Modal from '../../components/Utility/Modal/Modal';
import Button from '../../components/Utility/Button/Button';
import Cards from '../../components/Information/Cards/Cards';
import Styles from './Upgrades.module.css';
import NardisState from "../../common/state";
import { GetAllUpgrades, NardisAction } from "../../common/actions";
import { IdFunc, MapDispatch, OnDispatch, Props } from "../../common/props";
import { ButtonType, cardDefaultStyle } from "../../common/constants";


interface LevelUpRequirements {
    routes: number;
    revenuePerTurn: number;
    gold: number;
};

interface UpgradesState {
    hasPurchased: boolean,
    atLevelCap: boolean,
    showModal: boolean
    upgradeId: string
};

interface UpgradesMappedProps {
    playerRoutes: Nardis.Route[],
    avgRevenue: number,
    playerGold: number,
    playerLevel: number,
    playerUpgrades: Nardis.Upgrade[],
    getAllUpgrades: GetAllUpgrades
};

interface UpgradesDispatchedProps {
    addUpgradeToPlayer: IdFunc
};

interface UpgradesProps extends Props, UpgradesMappedProps, UpgradesDispatchedProps {}


const mapStateToProps = (
    state: NardisState
): UpgradesMappedProps => ({
    playerRoutes: state.routes,
    avgRevenue: state.avgRevenue,
    playerGold: state.money,
    playerLevel: state.level,
    playerUpgrades: state.upgrades,
    getAllUpgrades: state.getAllUpgrades
});

const mapDispatchToProps: MapDispatch<UpgradesDispatchedProps> = (
    dispatch: OnDispatch
): UpgradesDispatchedProps => (
    {
        addUpgradeToPlayer: (upgradeId: string) => dispatch(
            {
                type: NardisAction.ADD_PLAYER_UPGRADE,
                payload: {
                    addUpgradeToPlayer: {
                        upgradeId
                    }
                }
            }
        )
    }
);


const inactiveStyle: CSSProperties = {...cardDefaultStyle, backgroundColor: 'tomato'};
const activeStyle: CSSProperties = {...cardDefaultStyle, backgroundColor: 'teal'};


/**
 * Component to display requirements for the next level as well as all available Upgrades.
 */
class Upgrades extends Component<UpgradesProps, UpgradesState> {

    state: UpgradesState = {
        hasPurchased: false,
        showModal   : false,
        upgradeId   : '',
        atLevelCap  : this.props.playerLevel >= Nardis.PlayerLevel.Master
    };

    initiatePurchase = (upgradeId: string): void => {
        if (upgradeId.length <= 0) {
            this.setState({
                ...this.state,
                upgradeId: '',
                showModal: false
            });
        } else {
            this.setState({
                ...this.state,
                upgradeId,
                showModal: true
            });
        }
    }

    onPurchase = (): void => {
        if (this.state.upgradeId.length > 0) {
            this.props.addUpgradeToPlayer(this.state.upgradeId);
            this.setState({
                ...this.state, 
                showModal: false,
                hasPurchased: true,
                upgradeId: ''
            });
        } 
    }

    render () {
        const requirements: LevelUpRequirements = this.state.atLevelCap ? 
            Nardis.levelUpRequirements[0] : Nardis.levelUpRequirements[this.props.playerLevel + 1];
        return (
            <Fragment>
                <Modal
                    show={this.state.showModal}
                    whenClicked={this.initiatePurchase.bind(this, '')}
                    style={{top: '50%', overflowY: 'unset', backgroundColor: 'navy'}}
                >
                    <div className={Styles.ModalButtons}>
                        <Button
                            disabled={false}
                            whenClicked={this.onPurchase}
                            buttonType={ButtonType.Success}
                        > CONFIRM PURCHASE </Button>
                        <Button
                            disabled={false}
                            whenClicked={this.initiatePurchase.bind(this, '')}
                            buttonType={ButtonType.Danger}
                        > CANCEL PURCHASE </Button>
                    </div>
                </Modal>
                <div className={Styles.Container}>
                    <hr/>
                    <div className={Styles.LevelUpRequirements}>
                        {this.state.atLevelCap ? <h2>NO MORE LEVELS</h2> : 
                        <Fragment>
                            <h2>LEVEL {this.props.playerLevel + 1} REQUIREMENTS</h2>
                            <Cards 
                                cards={[
                                    {
                                        label: 'MINIMUM GOLD',
                                        value: requirements.gold + 'G',
                                        style: cardDefaultStyle
                                    },
                                    {
                                        label: 'MINIMUM ACTIVE ROUTES',
                                        value: requirements.routes.toString(),
                                        style: cardDefaultStyle
                                    },
                                    {
                                        label: 'MINIMUM AVG. REVENUE',
                                        value: requirements.revenuePerTurn + 'G/TURN',
                                        style: cardDefaultStyle
                                    }
                                ]}
                                style={{margin: '0'}}
                                
                            />
                            <Cards 
                                cards={[
                                    {
                                        label: 'CURRENT GOLD',
                                        value: this.props.playerGold + 'G',
                                        style: this.props.playerGold >= requirements.gold ? activeStyle : inactiveStyle
                                    },
                                    {
                                        label: 'CURRENT ACTIVE ROUTES',
                                        value: this.props.playerRoutes.length.toString(),
                                        style: this.props.playerRoutes.length >= requirements.routes ? activeStyle : inactiveStyle
                                    },
                                    {
                                        label: 'CURRENT AVG. REVENUE',
                                        value: this.props.avgRevenue + 'G/TURN',
                                        style: this.props.avgRevenue >= requirements.revenuePerTurn ? activeStyle : inactiveStyle
                                    }
                                ]}
                                style={{margin: '0', marginBottom: '35px'}}
                                
                            />
                        </Fragment>}
                        <hr/>
                    </div>
                    <h2 style={{marginTop: '35px'}}>PLAYER UPGRADES</h2>
                    <div className={Styles.Upgrades}>
                        {this.props.getAllUpgrades().map((entry: Nardis.Upgrade): JSX.Element => (
                            <Upgrade 
                                key={entry.id}
                                description={entry.name}
                                levelRequired={entry.levelRequired}
                                cost={entry.cost}
                                purchased={this.props.playerUpgrades.filter(e => e.equals(entry)).length > 0}
                                purchaseable={
                                    this.props.playerLevel >= entry.levelRequired && 
                                    this.props.playerGold  >= entry.cost
                                }
                                purchase={this.initiatePurchase.bind(this, entry.id)}
                            />
                        ))}
                    </div>
                    <hr/>
                </div>
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Upgrades);