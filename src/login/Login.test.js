/**
 * @jest-environment node
 */

//  More information on the testing-library can be found here:
//  https://testing-library.com/docs/queries/about/

import { render, screen } from '@testing-library/react';
import Login from './Login';

//  This test renders the html from the App()
//  function in App.js and then tests if the
//  link contains the text "learn react" where
//  '/learn react/i' denotes substring match, ignore case.
//  
//  Per https://testing-library.com/docs/queries/about/,
//  if there is exactly one element with that text string,
//  then screen.getByText() will return the element else
//  an error will be thrown.
//
//  Per https://jestjs.io/docs/expect#expectvalue,
//  The argument to expect should be the value that your code produces, 
//  and any argument to the matcher should be the correct value. 
//  If you mix them up, your tests will still work, but the error messages 
//  on failing tests will look strange. Expect() acts like assert
//  and if it fails, the test fails.
test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
