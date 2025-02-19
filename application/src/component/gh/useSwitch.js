import React, { useState, useEffect } from "react";

export default function useSwitch(initialvalue = false) {
  const [state, setstate] = useState(initialvalue);

  function toggle() {
    setstate(!state);
  }

  function off() {
    setstate(false);
  }

  function on() {
    setstate(true);
  }

  return {
    state,
    toggle,
    off,
    on,
    ison: state == true,
  };
}
