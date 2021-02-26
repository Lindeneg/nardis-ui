import { Player, Finance } from "nardis-game";

import Button from '../../../components/Utility/Button/Button';
import Card from '../../../components/Information/Cards/Card/Card';
import Styles from './EndedGame.module.css';
import { ButtonType } from "../../../common/constants";
import { Functional, Props } from "../../../common/props";


interface EndedGameProps extends Props {
    examineCallback: () => void;
    newGameCallback: () => void;
    winningPlayer: Player
};


const endedGame: Functional<EndedGameProps> = (
    props: EndedGameProps
): JSX.Element => {
    const finance: Finance = props.winningPlayer.getFinance();
    const info: Array<[string, string]> = [
        ['money', finance.getGold().toLocaleString() + 'g'],
        ['level', props.winningPlayer.getLevel().toLocaleString()],
        ['net worth', finance.getNetWorth().toLocaleString() + 'g'],
        ['routes', props.winningPlayer.getRoutes().length.toLocaleString()],
        ['upgrades', props.winningPlayer.getUpgrades().length.toLocaleString()]
    ];
    return (
        <div className={Styles.EndedGame}>
            <hr/>
            <div className={Styles.Main}>
                <h1>GAME IS OVER</h1>
                <hr/>
                <p className={Styles.Winner}><span>{props.winningPlayer.name}</span> IS THE WINNER</p>
            </div>
            <div className={Styles.Cards}>
                {info.map((e: [string, string], i: number): JSX.Element => (
                    <Card 
                        key={i}
                        label={e[0]}
                        value={e[1]}
                        style={{margin: '5px 0 5px 0'}}
                    />
                ))}
            </div>
            <hr/>
            <p className={Styles.Note}>you can also start a new game in the upper-right corner</p>
            <div className={Styles.Buttons}>
                <Button 
                    disabled={false}
                    whenClicked={props.examineCallback}
                    buttonType={ButtonType.StandardView}
                >
                    EXAMINE ENDED GAME
                </Button>
                <Button 
                    disabled={false}
                    whenClicked={props.newGameCallback}
                    buttonType={ButtonType.StandardView}
                >
                    START NEW GAME
                </Button>
            </div>
            <hr/>
        </div>
    );
}

export default endedGame;