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
      host={'host'}
      sigRequest={'sig request'}
    />
  );

  t.ok(libStub.called, 'Duo web SDK is initialized on mount');

  const iframe = duo.find('iframe');
  t.equal(iframe.length, 1, 'Duo iframe is present');
  t.equal(iframe.props().id, 'duo_iframe', 'Default node ID is correct');

  t.end();
});
