import * as React from "react";
import renderer from "react-test-renderer";

import Geolocation from "../Geolocation";

it(`Geolocation renders correctly`, () => {
  const tree = renderer.create(<Geolocation />).toJSON();

  expect(tree).toMatchSnapshot();
});
