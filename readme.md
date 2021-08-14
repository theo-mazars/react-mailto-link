# react-mailto-link 

[![Build Status](https://img.shields.io/github/checks-status/theo-mazars/react-mailto-link/main?style=flat-square)](https://img.shields.io/github/checks-status/theo-mazars/react-mailto-link/main?style=flat-square)

> A react component to create and display a [mailto](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Email_links) link in a more secure way.

> Inspired by https://github.com/jasonbellamy/react-mailto

## Getting Started

- Install from [NPM](https://www.npmjs.org/)
  - `npm install --save react-mailto-link`
  - `yarn add react-mailto-link`

## Usage

```javascript
import React from "react";
import Mailto from "react-mailto-link";

const Component = () => {
  return (<Mailto email="john.doe@example.com" obfuscated={true} />)
}

// OR

const Component = () => {
  return (
    <Mailto email="john.doe@example.com" obfuscated={true}>
      <div>Custom Children</div>
    </Mailto>
  )
}

export default Component
```

## Options

| Property  | Type      | Argument     | Default | Description                                                                                                                                                                                               |
| --------- | --------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email     | `string`  | `<required>` | `null`  | email address of the intended recipient.                                                                                                                                                                  |
| obfuscated | `boolean` | `<optional>` | `false` | show the email address in the status bar.                                                                                                                                                                 |
| headers   | `object`  | `<optional>` | `null`  | any standard mail header fields. The most commonly-used of these are "subject", "cc", and "body" (which is not a true header field, but allows you to specify a short content message for the new email). |

## Developing

[react-mailto-link](https://github.com/theo-mazars/react-mailto-link) is built using **ES6**. Run the following task to compile the `src/` into `lib/`.

```bash
$ npm run build
# OR
$ yarn build
```

## License

&copy;2015 [Jason Bellamy](http://jasonbellamy.com)

&copy;2021 [Theo Mazars](http://theomazars.com)

Licensed under the MIT license.
