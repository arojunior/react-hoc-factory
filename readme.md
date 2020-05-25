# Create high order components in a functional way

> Disclaimer: this repository is for study purposes and that's why the lib isn't on `npm`

Do you know [Recompose](https://github.com/acdlite/recompose)? It is fully inspired on that library.
The main difference is that the only method exported is `withProps`, which was changed as you can see bellow.

### Install
```sh
yarn add git://github.com/arojunior/react-hoc-factory#0.1.1
```

### `withProps()`

```js
withProps(
  createProps: (ownerProps: Object) => Object
): HigherOrderComponent
```

OR

```js
({ Component: ReactElement }) => withProps(
  createProps: (ownerProps: Object) => Object
)(Component): HigherOrderComponent
```

#### Usage 1

```js
// AppContainer.js
import { withProps } from './utils/hocFactory';
import { useFoo, useGithub } from './AppService';
import AppComponent from './AppComponent';

const AppContainer = withProps({
  useFoo,
  useGithub,
  ...rest
})(AppComponent);

export default AppContainer;
```

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer';

render(<AppContainer />, document.getElementById('root'));
```

> In this case you can reuse the component with other container, but the container file is importing the component, so you can't reuse it

#### Usage 2

```js
// AppEnhance.js
import { withProps } from './utils/hocFactory';
import { useFoo, useGithub } from './AppService';

const AppEnhance = withProps({
  useFoo,
  useGithub,
  ...rest
});

export default AppEnhance;
```

```js
// AppContainer.js
import AppEnhance from './AppEnhance';
import AppComponent from './AppComponent';

export default AppEnhance(AppComponent);
```

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer';

render(<AppContainer />, document.getElementById('root'));
```

> Here you need a third file just to prevent coupling. In this case you are able to reuse both, component and the behavior

#### Usage 3

The main difference from `Recompose` is here, you can take advantage from the curried method implemented and prevent coupling with just two files

```js
// AppContainer.js
import { withProps } from './utils/hocFactory';
import { useFoo, useGithub } from './AppService';

const AppContainer = ({ Component, ...rest }) => withProps({
  useFoo,
  useGithub,
  ...rest
})(Component);

export default AppContainer;
```

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import AppContainer from './AppContainer';
import AppComponent from './AppComponent';

render(<AppContainer Component={AppComponent} otherProp="it-works" />, document.getElementById('root'));
```

Reference: [https://github.com/arojunior/react-hooks-composition-proposal](https://github.com/arojunior/react-hooks-composition-proposal) 