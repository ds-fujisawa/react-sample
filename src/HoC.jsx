import React from 'react';
import { compose, withState, withHandlers } from 'recompose'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


export default compose(
  withState('counter', 'updateCounter', 5),
  withHandlers({
    increment: ({ updateCounter }) => () => updateCounter(counter => counter + 1),
    decrement: ({ updateCounter }) => () =>  updateCounter(counter => counter - 1),
    reset: ({ updateCounter }) => () => updateCounter(5)
  }))(props => (
  <div>
    <p>{props.counter}</p>
    <Button variant="fab" color="primary" onClick={() => { props.increment(); }}><AddIcon /></Button>
    <Button variant="fab" onClick={() => { props.decrement(); }}><RemoveIcon /></Button>
    <Button variant="contained" color="secondary" onClick={() => { props.reset(); }}>reset</Button>
  </div>
));
