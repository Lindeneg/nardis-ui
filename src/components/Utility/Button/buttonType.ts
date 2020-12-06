export enum ButtonType {
    SUCCESS,
    DANGER,
    END_TURN
}

export const buttonTypeToClassName = {
    [ButtonType.SUCCESS]: 'Success',
    [ButtonType.DANGER]: 'Danger',
    [ButtonType.END_TURN]: 'EndTurn'
};