import React, { memo, useState } from "react";

const Project = memo((props) => {
  const [counter, setCounter] = useState(0);
  const print = () => {
    setCounter(counter+1)
    console.log('Click Counter: ', counter);
  };

  return (
    <div>
      <button onClick={print}>Click</button>
    </div>
  );
});

export default Project;
