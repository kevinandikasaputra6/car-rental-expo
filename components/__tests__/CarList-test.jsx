import * as React from "react";
import renderer from "react-test-renderer";

import CarList from "../CarList";

it(`CarList renders correctly`, () => {
  const tree = renderer
    .create(
      <CarList
        image={require("@/assets/images/img_car.png")}
        carName="Toyota Avanza"
        passengers={4}
        baggage={2}
        price={100000}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
