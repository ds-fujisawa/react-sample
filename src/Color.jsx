import React, { Component } from "react";
import styled from "styled-components";
import { CustomPicker } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";

class ColorPicker extends Component {
  render() {
    return (
      <div>
        <ColorItem>
          <Saturation
            {...this.props}
            pointer={CustomPointer}
            onChange={e => {
              this.props.inputColor(this.props.hex);
              this.props.onChange(e);
            }}
          />
        </ColorItem>
        <ColorSlider>
          <Hue
            {...this.props}
            direction="vertical"
            pointer={CustomPointer}
            onChange={e => {
              this.props.inputColor(this.props.hex);
              this.props.onChange(e);
            }}
          />
        </ColorSlider>
      </div>
    );
  }
}

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
  width: .5rem;
  height: .5rem;
  margin-left: .2rem;
  border: 1px solid #fff;
  border-radius: 100%;
`;
export default CustomPicker(ColorPicker);
