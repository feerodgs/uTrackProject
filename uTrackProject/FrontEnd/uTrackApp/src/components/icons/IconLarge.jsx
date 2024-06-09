import { FaSun } from 'react-icons/fa';

const iconMap = {
    lightMode: FaSun,
};

const IconLarge = ({ name, size = 30}) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent size={size} />;
};

export default IconLarge;