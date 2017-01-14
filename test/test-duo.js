import {mount} from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import test from 'tape';

import Duo from '../src/duo';
import duoWeb from '../lib/duo-web';

test('Duo SDK is initialized and component is rendered correctly', (t) => {
  const libStub = sinon.stub(duoWeb, 'duoWeb').returns({
    init: (opts) => {
      t.equal(opts.host, 'host', 'Host is passed to initialization');
      t.equal(opts.sig_request, 'sig request', 'Sig request is passed to initialization');
      t.ok(opts.submit_callback, 'Callback is defaulted to a noop');
    }
  });
  const duo = mount(
    <Duo
      host="host"
      sigRequest="sig request"
    />
  );

  t.ok(libStub.called, 'Duo web SDK is initialized on mount');

  const iframe = duo.find('iframe');
  t.equal(iframe.length, 1, 'Duo iframe is present');
  t.equal(iframe.props().id, 'duo_iframe', 'Default node ID is correct');

  duoWeb.duoWeb.restore();
  t.end();
});

test('Callback is invoked with Duo\'s sig response', (t) => {
  const libStub = sinon.stub(duoWeb, 'duoWeb').returns({
    init: (opts) => opts.submit_callback({
      // Simulation of properties in a DOM form element
      firstChild: {
        value: 'sig response'
      }
    })
  });
  const cb = sinon.spy();
  const duo = mount(
    <Duo
      sigResponseCallback={cb}
    />
  );

  t.ok(libStub.called, 'Library is initialized');
  t.ok(cb.calledWith('sig response'), 'Callback is invoked with the sig response');
  t.equal(duo.find('iframe').length, 1, 'Callback does not affect rendered elements');

  duoWeb.duoWeb.restore();
  t.end();
});

test('Extraneous props are proxied through to the iframe', (t) => {
  const libStub = sinon.stub(duoWeb, 'duoWeb').returns({
    init: () => {}
  });
  const duo = mount(
    <Duo
      host="host"
      sigRequest="sig request"
      className="class name"
      style={{color: 'red'}}
    />
  );

  const iframe = duo.find('iframe');
  t.equal(iframe.length, 1, 'Duo iframe is still present');
  t.ok(libStub.called, 'Library is initialized');
  t.equal(iframe.props().className, 'class name', 'Class name is proxied');
  t.deepEqual(iframe.props().style, {color: 'red'}, 'Style is proxied');

  duoWeb.duoWeb.restore();
  t.end();
});
