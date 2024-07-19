import PropTypes from "prop-types";
import BloodCellSvg from "../assets/svg/BloodCellSvg";

const BloodCell = ({ className, size = 48 }) => (
  <div
    className={`inline-block ${className}`}
    style={{
      "--blood-cell-size": `${size}px`,
      width: "var(--blood-cell-size)",
      height: "var(--blood-cell-size)",
    }}
  >
    <BloodCellSvg className="w-full h-full text-red-500 opacity-20" />
  </div>
);

BloodCell.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default BloodCell;
