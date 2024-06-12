import { FaFilter, FaPlus, FaTimes, FaChevronDown, FaSun, FaChevronUp} from 'react-icons/fa';

const iconMap = {
    filter: FaFilter,
    add: FaPlus,
    close: FaTimes,
    arrowDown: FaChevronDown,
    arrowUp: FaChevronUp,
    lightMode: FaSun,
};

const Icon = ({ name, size = 20}) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent size={size} />;
};

export default Icon;