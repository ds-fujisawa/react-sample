import React, { Component } from "react";
import styled from "styled-components";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
import { inputColor, setRect } from "./action";

import { ActionCreators } from "redux-undo";

import CustomPicker from "./Color";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeDoc: {},
      event: {},
      color: "#000",
      frameHeight: 0,
      dispBlock: []
    };
  }

  /* ------- Lifecycle method ------- */
  componentDidMount() {
    console.log("componentDidMount");
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps, prevState.iframeDoc);
    if (nextProps.color !== prevState.color) {
      return {
        color: nextProps.color,
        frameHeight: prevState.frameHeight,
        dispBlock: prevState.display
      };
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevProps, prevState);
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState, snapshot);
    this.state.iframeDoc.dispatchEvent(this.state.event);
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  componentDidCatch(error, info) {
    console.log("componentDidCatch", error, info);
  }
  /* ------- Lifecycle method ------- */

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <span>文字色　</span>
          <span>{this.props.color}</span>
        </p>
        <CustomPicker color={this.props.color} inputColor={this.props.inputColor} />
        {/*
        <p>
          <input
            type="checkbox"
            value="h1"
            id="h1"
            onChange={e => {
              e.target.checked
                ? this.setState({
                    dispBlock: this.state.dispBlock.concat([e.target.value])
                  })
                : this.setState({
                    dispBlock: this.state.dispBlock.filter(
                      i => i !== e.target.value
                    )
                  });
            }}
          />
          <label htmlFor="h1">TITLE</label>
          <input type="checkbox" value="li" id="li" />
          <label htmlFor="li">LIST</label>
          <input type="checkbox" value="section" id="section" />
          <label htmlFor="section">SECTION</label>
        </p>
        */}
        <Wrap>
          <FrameArea
            src="./foo.html"
            title="foo"
            frameborder="0"
            frameHeight={this.state.frameHeight}
            onLoad={_ => {
              // ifram document
              const doc = this.iframe.contentDocument;
              this.setState({ iframeDoc: doc });

              // iframe height setting
              this.setState({ frameHeight: doc.documentElement.scrollHeight });

              // iframe DOM analysis
              this.setState({
                color: getComputedStyle(doc.getElementById("foo")).color
              });
              Array.from(doc.getElementsByTagName("h1")).forEach(h1 => {
                this.props.setRect(h1.getBoundingClientRect());
              });

              // UIイベント受信用
              this.setState({ event: new Event("notify") });
              doc.addEventListener(
                "notify",
                e => {
                  doc.getElementById("foo").style.color = this.state.color;
                },
                false
              );
            }}
            innerRef={e => {
              this.iframe = e;
            }}
          />
          <EventArea frameHeight={this.state.frameHeight}>
            <EventWrap>
              {this.props.rects.map((r, i) => (
                <EventBlock
                  key={i}
                  width={r.width}
                  height={r.height}
                  top={r.top}
                  left={r.left}
                  onClick={e => {
                    alert(this.state.color);
                  }}
                />
              ))}
              <EventBlock />
            </EventWrap>
          </EventArea>
        </Wrap>
        <p>
          <button onClick={e => this.props.onUndo()}>undo</button>
          <button onClick={e => this.props.onRedo()}>redo</button>
        </p>
      </div>
    );
  }
}

const Wrap = styled.div`
  width: 70%;
  height: 200px;
  position: relative;
  border: 1px solid #000;
  overflow-y: scroll;
`;

const FrameArea = styled.iframe`
  width: 100%;
  height: ${({ frameHeight }) => frameHeight + "px"};
  border: none;
`;

const EventArea = styled.div`
  width: 100%;
  height: ${({ frameHeight }) => frameHeight + "px"};
  top: 0;
  position: absolute;
`;

const EventWrap = styled.div`
  width: 100%;
  height: 100%;
  background: skyblue;
  opacity: 0.3;
  position: relative;
`;

const EventBlock = styled.div`
  display: inline-block;
  border: 1px solid red;
  position: absolute;
  cursor: pointer;
  top ${({ top }) => top + "px"};
  left ${({ left }) => left + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
`;

function mapStateToProps({ colorReducer, rectReducer }) {
  return {
    color: colorReducer.present.color,
    rects: rectReducer.rects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputColor(color) {
      dispatch(inputColor(color));
    },
    setRect(rect) {
      dispatch(setRect(rect));
    },
    onUndo() {
      dispatch(ActionCreators.undo());
    },
    onRedo() {
      dispatch(ActionCreators.redo());
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
