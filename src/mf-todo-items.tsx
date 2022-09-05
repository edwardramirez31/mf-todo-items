/* eslint-disable no-console */
import React from 'react';

import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import Root from './root.component';

export function domElementGetter(): HTMLElement {
  let el = document.getElementById('mf-content');
  if (!el) {
    el = document.createElement('div');
    el.id = 'mf-content';
    document.body.appendChild(el);
  }
  return el;
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    console.log(err);
    console.log(info);
    console.log(props);
    // Customize the root error boundary for your microfrontend here.
    return <div>Something went wrong</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
