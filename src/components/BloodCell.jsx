import PropTypes from "prop-types";

const BloodCell = ({ className }) => (
  <svg
    className={`w-12 h-12 text-red-500 opacity-20 ${className}`}
    viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="40" fill="currentColor" />
  </svg>
);

BloodCell.propTypes = {
  className: PropTypes.string,
};

export default BloodCell;
