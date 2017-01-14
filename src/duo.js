import React from 'react';
import omit from 'object.omit';

import duoWeb from '../lib/duo-web';

/**
 * Component for the Duo Web 2FA authorization iframe. This component expects that the host and
 * sig request parameters are provided. A submit callback may optionally provided, and will be
 * invoked with the submitted form after 2FA is complete.
 */
export default class Duo extends React.Component {
  static propTypes = {
    // The Duo API host
    host: React.PropTypes.string,
    // The server-side generated sig request to pass as input to Duo to begin the 2FA flow
    sigRequest: React.PropTypes.string,
    // A callback function invoked with a sig response from Duo when the 2FA flow is complete
    sigResponseCallback: React.PropTypes.func
  };
  static defaultProps = {
    sigResponseCallback: () => {}
  };

  componentDidMount() {
    const {host, sigRequest} = this.props;

    duoWeb.duoWeb().init({
      /* eslint-disable camelcase */
      host,
      sig_request: sigRequest,
      submit_callback: this.handleDuoResponse.bind(this)
      /* eslint-enable camelcase */
    });
  }

  /**
   * On 2FA flow completion, the Duo Web SDK invokes the passed submission callback with a form
   * DOM element containing the elements that would otherwise be submitted to another server-side
   * endpoint. This doesn't make much sense for a client-side rendered SPA, and the only field
   * we're really concerned about in the form is Duo's sig response. Thus, the callback passed to
   * this component will be invoked with the sig response as a string.
   *
   * @param {Object} duoForm Duo form DOM element.
   * @returns {*} Return value is unused.
   */
  handleDuoResponse(duoForm) {
    const {sigResponseCallback} = this.props;
    const sigResponse = duoForm.firstChild.value;

    return sigResponseCallback(sigResponse);
  }

  render() {
    const props = omit(this.props, Object.keys(Duo.propTypes));

    return (
      <iframe id="duo_iframe" {...props} />
    );
  }
}
