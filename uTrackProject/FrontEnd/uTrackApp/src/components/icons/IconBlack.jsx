import { FaFilter, FaPlus, FaWindowClose, FaChevronDown, FaMoon} from 'react-icons/fa';

const iconMap = {
    filter: FaFilter,
    add: FaPlus,
    close: FaWindowClose,
    arrowDown: FaChevronDown,
    darkMode: FaMoon,
};

const IconBlack = ({ name, size = 20, color = 'black' }) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent size={size} color={color} />;
};

export default IconBlack;