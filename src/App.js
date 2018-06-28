/* @flow */
import React, { Component } from 'react';
import styled from 'styled-components';

import logo from './logo.svg';
import './App.css';

import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

import { inputColor, setRect } from './action';
import CustomPicker from './Color';

import MarkdownEditor from './MarkdownEditor';

import Temp from './Temp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iframeDoc: {},
      event: {},
      color: '#000',
      frameHeight: 0,
      dispBlock: [],
      selected: 'hoge',
      components: {
        hoge: ['hoge1', 'hoge2', 'hoge3'],
        foo: ['foo1', 'foo2', 'foo3'],
        bar: ['bar1', 'bar2', 'bar3']
      }
    };
  }

  /* ------- Lifecycle method ------- */
  componentDidMount() {
    console.log('componentDidMount');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps', nextProps, prevState.iframeDoc);
    if (prevState.iframeDoc.dispatchEvent) {
      prevState.iframeDoc.dispatchEvent(prevState.event);
    }
    if (nextProps.color !== prevState.color) {
      return {
        color: nextProps.color,
        frameHeight: prevState.frameHeight
      };
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', prevProps, prevState);
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  componentDidCatch(error, info) {
    console.log('componentDidCatch', error, info);
  }
  /* ------- Lifecycle method ------- */
  changeBlock(e) {
    e.target.checked
      ? this.setState({
          dispBlock: this.state.dispBlock.concat([e.target.value])
        })
      : this.setState({
          dispBlock: this.state.dispBlock.filter(i => i !== e.target.value)
        });
  }
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
        <CustomPicker
          color={this.props.color}
          inputColor={this.props.inputColor}
        />
        <p>{this.props.color}</p>
        {
          <p>
            <input
              type="checkbox"
              value="h1"
              id="h1"
              onChange={e => {
                this.changeBlock(e);
              }}
            />
            <label htmlFor="h1">TITLE</label>
            <input
              type="checkbox"
              value="li"
              id="li"
              onChange={e => {
                this.changeBlock(e);
              }}
            />
            <label htmlFor="li">LIST</label>
            <input
              type="checkbox"
              value="section"
              id="section"
              onChange={e => {
                this.changeBlock(e);
              }}
            />
            <label htmlFor="section">SECTION</label>
          </p>
        }
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
                color: getComputedStyle(doc.getElementById('foo')).color
              });
              console.log(
                [0, 1, 2, 3].reduce(function(
                  previousValue,
                  currentValue,
                  index,
                  array
                ) {
                  console.log(previousValue, currentValue, index, array);
                  return previousValue + currentValue;
                })
              );

              // UIイベント受信用
              this.setState({ event: new Event('notify') });
              doc.addEventListener(
                'notify',
                e => {
                  doc.getElementById('foo').style.color = this.props.color;
                  this.state.dispBlock.forEach(b => {
                    Array.from(doc.getElementsByTagName(b)).forEach(el => {
                      this.props.setRect(el.getBoundingClientRect());
                    });
                  });
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
        <MarkdownEditor />
        {this.state.components[this.state.selected].map(v => Temp[v])}
        <p>
          <button onClick={e => this.setState({ selected: 'hoge' })}>
            hoge
          </button>
          <button onClick={e => this.setState({ selected: 'foo' })}>foo</button>
          <button onClick={e => this.setState({ selected: 'bar' })}>bar</button>
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
  height: ${({ frameHeight }) => frameHeight + 'px'};
  border: none;
`;

const EventArea = styled.div`
  width: 100%;
  height: ${({ frameHeight }) => frameHeight + 'px'};
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
  top ${({ top }) => top + 'px'};
  left ${({ left }) => left + 'px'};
  width: ${({ width }) => width + 'px'};
  height: ${({ height }) => height + 'px'};
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
