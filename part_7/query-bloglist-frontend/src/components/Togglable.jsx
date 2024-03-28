import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <div className={visible ? "hidden" : "block"}>
        <button
          className="my-2 mt-6 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className={visible ? "block" : "hidden"}>
        {props.children}
        <button
          className="my-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md"
          onClick={toggleVisibility}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
