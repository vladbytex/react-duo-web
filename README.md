# react-duo-web

`react-duo-web` is a React component wrapper for the the two-factor authentication UI flow provided by the [Duo Web SDK](https://duo.com/docs/duoweb).

Your client-side React app need not have a `<script>` tag referencing the web SDK Javascript. Instead, simply introduce `Duo` into your existing app as you would any other component:

```javascript
import Duo from 'react-duo-web';
import React from 'react';

export default MyComponent extends React.Component {
  handle2FAComplete(sigResponse) {
    // Make a request to a server-side endpoint to validate the sig response
    ...
  }

  render() {
    return (
      <Duo
        host={'api-xxxxxxx.duosecurity.com'}
        sigRequest={'...long sig request string...'}
        sigResponseCallback={this.handle2FAComplete.bind(this)}
      />
    );
  }
}
```

## API

`Duo` is the React component class exported by `react-duo-web` that you can include in your existing components in the standard way.

`Duo` accepts the following props (all other props are proxied to the wrapped `iframe`):

|Prop|Description|Required|
|----|-----------|--------|
|`host`|The API host used by Duo for 2FA validation. You can find this in your admin control panel.|`true`|
|`sigRequest`|The server-side signed request token passed back to the client after the initial authentication request completes.|`true`|
|`sigResponseCallback`|A callback function invoked after the entire 2FA flow is complete, called with the sig response string as the single parameter.|`false`|
