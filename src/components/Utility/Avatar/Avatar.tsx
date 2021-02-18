import { Functional, Props } from "../../../common/props";
import Styles from './Avatar.module.css';

import a0 from '../../../assets/avatars/avatar_0.jpeg';
import a1 from '../../../assets/avatars/avatar_1.jpeg';
import a2 from '../../../assets/avatars/avatar_2.jpeg';
import a3 from '../../../assets/avatars/avatar_3.jpeg';
import a4 from '../../../assets/avatars/avatar_4.jpeg';
import a5 from '../../../assets/avatars/avatar_5.jpeg';


const avatars: string[] = [a0, a1, a2, a3, a4, a5];


interface AvatarProps extends Props {
    avatar: number,
    alt   : string
};


const avatar: Functional<AvatarProps> = (
    props: AvatarProps
): JSX.Element => (
    <img 
        className={Styles.Avatar}
        src={avatars[props.avatar]}
        alt={props.alt}
    />
);


export default avatar;