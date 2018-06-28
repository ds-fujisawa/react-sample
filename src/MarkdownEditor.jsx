import React from 'react';
import Remarkable from 'remarkable';
import styled from "styled-components";

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Hello, **world**!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    const md = new Remarkable();
    return { __html: md.render(this.state.value) };
  }

  render() {
    return (
      <div className="MarkdownEditor">
      <h1>MarkdownEditor</h1>
        <Area>
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
        </Area>
      <Area>
        <h3>Input</h3>
        <textarea
          id="markdown-content"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        </Area>
      </div>
    );
  }
}

const Area = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 1rem;
`;