import styled from "styled-components";

const Hoge = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
`;
const Foo = Hoge.extend` border-radius: 50%; `;

export const Hoge1 = Hoge.extend` background-color: red; `;
export const Hoge2 = Hoge.extend` background-color: blue; `;
export const Hoge3 = Hoge.extend` background-color: yellow; `;

export const Foo1 = Foo.extend` background-color: red; `;
export const Foo2 = Foo.extend` background-color: blue; `;
export const Foo3 = Foo.extend` background-color: yellow; `;

export const Bar1 = Hoge.extend` background-color: pink; `;
export const Bar2 = Hoge.extend` background-color: aqua; `;
export const Bar3 = Hoge.extend` background-color: lime; `;
