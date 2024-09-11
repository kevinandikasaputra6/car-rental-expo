import * as React from "react";
import renderer from "react-test-renderer";

import ButtonBack from "../ButtonBack";

it(`ButtonBack renders correctly`, () => {
  const tree = renderer.create(<ButtonBack />).toJSON();

  expect(tree).toMatchSnapshot();
});
