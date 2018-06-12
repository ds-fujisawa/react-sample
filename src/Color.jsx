import React, { Component } from "react";
import styled from "styled-components";
import { CustomPicker } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";

export default CustomPicker(function ColorPicker(props) {
  return (
    <div>
      <ColorItem>
        <Saturation
          {...props}
          pointer={CustomPointer}
          onChange={e => {
            props.inputColor(props.hex);
            props.onChange(e);
          }}
        />
      </ColorItem>
      <ColorSlider>
        <Hue
          {...props}
          direction="vertical"
          pointer={CustomPointer}
          onChange={e => {
            props.inputColor(props.hex);
            props.onChange(e);
          }}
        />
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
