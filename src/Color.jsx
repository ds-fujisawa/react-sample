import React from "react";
import styled from "styled-components";
import { CustomPicker } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";
import ReactTooltip from "react-tooltip";

export default CustomPicker(function ColorPicker(props) {
  return (
    <div>
      <ColorItem data-tip data-for="saturation">
        <Saturation
          {...props}
          pointer={CustomPointer}
          onChange={e => {
            props.inputColor(props.hex);
            props.onChange(e);
          }}
        />
        <ReactTooltip id="saturation">
          <span>{props.hex}</span>
        </ReactTooltip>
      </ColorItem>
      <ColorSlider data-tip data-for="hue">
        <Hue
          {...props}
          direction="vertical"
          pointer={CustomPointer}
          onChange={e => {
            props.inputColor(props.hex);
            props.onChange(e);
          }}
        />
        <ReactTooltip id="hue">
          <span>{props.hex}</span>
        </ReactTooltip>
      </ColorSlider>
    </div>
  );
});

const ColorItem = styled.div`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  cursor: pointer;
`;

const ColorSlider = styled.div`
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 200px;
  margin-left: 1rem;
  cursor: pointer;
`;

const CustomPointer = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.2rem;
  border: 1px solid #fff;
  border-radius: 100%;
`;
