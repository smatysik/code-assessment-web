# Work & Co Web Code Assessment

This is a copy of the [Redux Shopping Cart Example](https://github.com/reactjs/redux/tree/master/examples/shopping-cart).

To start a development server:

```
npm start
```

## Tasks

Please publish your work to a fork of this repo. You're welcome (but not required) to add any libraries you think would be helpful.

Note: You're encouraged to show your work by including multiple commits - we'll be looking through your fork's git history.

1. [Implement Responsive Design](/tasks/01-responsive-design.md)
2. [Enhance Cart Functionality](/tasks/02-cart-enhancements.md)
3. [Hook Up Product API](/tasks/03-product-api.md)

Please also update this README file: we'd love to see notes on your decision-making process, links to the most exciting pieces of code, or anything else that will give us additional context when reviewing your assessment.

## Solutions

While the final and latest version of the app can be found on the master branch, there are also three task branches that show the state of the application when the relevant task was completed.

## Task 1

### Styling

I chose to use Sass for styling mostly for personal speed. The Sass files are organized per component in an attempt to follow a React-friendly pattern. In the future I would most likely use a CSS-in-JS solution like [emotion](https://github.com/emotion-js/emotion).

### New Components

- Button.js: a wrapper for the `button` element to make standardizing button styling easier.
- Modal.js: uses React Portals to display child nodes within HTML container outside of the application root container. Modal component leaves display control to parent component, but does accept an `onCloseRequest` prop to handle standard keyboard close functionality.

## Task 2

Both 'Remove' and 'Update an item quantity' are implemented via the same action `modifyQuantity`, which handles validation around product quantity and product inventory before dispatching any updates to the state.

### New Components

- CartControl.js: accepts a value and modify function as props; implements decrement/increment functionality on top of the modify function prop.

## Task 3

Maps JSON endpoint object structure to JSON file product structure to avoid rewriting props; assumes images are accessed via product titles.

## Accessibility (WCAG compliance)

- Added `eslint-plugin-jsx-a11y` to lint for common accessibility mistakes
- Used [WebAim WAVE](https://wave.webaim.org/) tool to provide additional accessibility error checking
- [`react-focus-trap`](https://github.com/davidtheclark/focus-trap-react) is used to maintain focus within modal while navigating with tab and shift+tab.

## Future Work

- Error messaging when adding too many products
- Implement localization, using the product currency value to convert prices before display in utils/CurrencyFormatter.js
- Implement srcset to serve appropriately sized image assets based on screen width, implement build process using [sharp](https://github.com/lovell/sharp) to generate needed sizes.
