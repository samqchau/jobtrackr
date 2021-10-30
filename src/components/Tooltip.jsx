import { useSelector } from 'react-redux';
import '../styles/tooltip.css';

const Tooltip = () => {
  const toolTip = useSelector((state) => state.toolTip);

  return toolTip && <div className={`tip`}>Start Here</div>;
};

export default Tooltip;
