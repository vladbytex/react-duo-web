import React from 'react';

import duoWeb from '../lib/duo-web';

/**
 * Component for the Duo Web 2FA authorization iframe. This component expects that the host and
 * sig request parameters are provided. A submit callback may optionally provided, and will be
 * invoked with the submitted form after 2FA is complete.
 */
export default class Duo extends React.Component {
  static propTypes = {
    host: React.PropTypes.string,
    sigRequest: React.PropTypes.string,
    submitCallback: React.PropTypes.func
  };
  static defaultProps = {
    submitCallback: () => {}
  };

  componentDidMount() {
    const {host, sigRequest, submitCallback} = this.props;

    duoWeb.duoWeb().init({
      /* eslint-disable camelcase */
      host,
      sig_request: sigRequest,
      submit_callback: submitCallback
      /* eslint-enable camelcase */
    });
  }

  render() {
    return (
      <iframe id="duo_iframe" />
    );
  }
}
