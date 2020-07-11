import React from 'react';
import { Appbar } from 'react-native-paper';
class MyComponent extends React.Component {
    _goBack = () =>console.log(this.props);
    render() {
      return (
        <Appbar.Header>
          <Appbar.BackAction
            onPress={this._goBack}
          />
          <Appbar.Content
            title="Signup"
          />
        </Appbar.Header>
      );
    }
  }
  export default MyComponent