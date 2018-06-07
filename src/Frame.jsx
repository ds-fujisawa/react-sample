import React, { Component } from 'react';
import styled from 'styled-components';

export default class Frame extends Component {
  render() {
    return (
      <IframeBlock>
        <IframeBody>
          <iframe onLoad={ _ => {
            const doc = this.iframe.contentDocument;
            console.log(doc);
            doc.getElementsByTagName('span')[0].style.color = 'red';
          }} ref={e => { this.iframe = e; }} src="./hoge.html" />
        </IframeBody>
      </IframeBlock>);
  }
}
const IframeBlock = styled.div`
  height: 600px;
`;

const IframeBody = styled.div`
  height: 100%;
`;
