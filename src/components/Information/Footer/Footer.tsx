import { Component, Fragment } from 'react';
import Styles from './Footer.module.css';


interface FooterState {
    resetInitiated: boolean
};

interface FooterProps {
    onResetGame: () => void;
};


/**
 * Footer element with options to visit source code or reset an active game.
 */
class Footer extends Component<FooterProps, FooterState> {

    state: FooterState = {
        resetInitiated: false
    };

    onToggleReset = (): void => {
        this.setState({
            resetInitiated: !this.state.resetInitiated
        });
    }

    render() {
        return (
            <footer className={Styles.Footer}>
                <span>christian lindeneg @ 2021</span> -
                <span className={Styles.Clickable}><a href='https://github.com/lindeneg/nardis' target='_blank' rel='noreferrer' >source</a></span> -
                {this.state.resetInitiated ? (
                    <Fragment>
                        <span>are you sure?</span> -
                        <span className={Styles.Clickable} onClick={this.props.onResetGame}>yes</span> -
                        <span className={Styles.Clickable} onClick={this.onToggleReset}>no</span>
                    </Fragment>
                ) : <span className={Styles.Clickable} onClick={this.onToggleReset}>reset game</span>}
            </footer>
        );
    }
}


export default Footer;