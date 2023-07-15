import React, { useState, useEffect } from "react";
import withResizeObserver from "../../components/ResizeObserverHOC/withResizeObserver";

const ResizableComponent = ({ onResize }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      setSize({ width, height });
    };

    handleResize(); // Initial size calculation

    const resizeListener = () => {
      handleResize();
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []); // Empty dependency array to run effect only once

  const containerRef = React.useRef();

  return (
    <div ref={containerRef}>
      <h2>Resizable Component</h2>
      <div
        style={{
          width: "100%",
          height: "200px",
          border: "1px solid black",
          padding: "20px",
        }}
      >
        <p>Resize this element:</p>
        <p>Width: {size.width}px</p>
        <p>Height: {size.height}px</p>
      </div>
    </div>
  );
};

export default withResizeObserver(ResizableComponent);
