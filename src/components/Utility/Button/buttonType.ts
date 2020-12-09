export enum ButtonType {
    SUCCESS,
    DANGER,
    END_TURN
}

export const buttonTypeToClassName: {[key: number]: string} = {
    [ButtonType.SUCCESS]: 'Success',
    [ButtonType.DANGER]: 'Danger',
    [ButtonType.END_TURN]: 'EndTurn'
};