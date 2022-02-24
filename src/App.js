import "./App.css";
import { Flex, Tag } from "@chakra-ui/react";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useCompositeState } from "./hooks/state";

function coords(angle) {
  return [Math.cos(angle), Math.sin(angle)];
}
function points2coords(points, step) {
  const ret = [];
  console.log(points);
  for (let i = 0; i < points.length - 1; i++) {
    const e1 = points[i];
    const e2 = points[i + 1];
    ret.push([coords(e1 * step), coords(e2 * step)]);
  }
  ret.push([
    coords(points[points.length - 1] * step),
    coords(points[0] * step),
  ]);
  return ret;
}

function Diagram({ points, m }) {
  const step = (2 * Math.PI) / m;

  return (
    <svg height="80vh" width="80vw" viewBox="-1 -1 2 2" transform="rotate(-90)">
      <circle
        fill="none"
        stroke="black"
        r={1}
        cx={0}
        cy={0}
        vectorEffect="non-scaling-stroke"
      />
      {points2coords(points, step).map((el, i) => (
        <line
          key={i}
          x1={el[0][0]}
          x2={el[1][0]}
          y1={el[0][1]}
          y2={el[1][1]}
          stroke="black"
          vectorEffect="non-scaling-stroke"
          strokeOpacity={0.2}
        />
      ))}
    </svg>
  );
}

function expand(start, mult, m) {
  const ret = [];
  const s = new Set();
  while (!s.has(start)) {
    ret.push(start);
    s.add(start);

    start = (start * mult) % m;
  }
  console.log(ret);
  return ret;
}

function App() {
  const state = useCompositeState({ m: 7417, mult: 240 });
  return (
    <div className="App">
      <Flex>
        <Diagram points={expand(1, state.mult, state.m)} m={state.m} />
        <Flex direction={"column"}>
          <Tag>Modulus</Tag>
          <NumberInput value={state.m} onChange={(value) => (state.m = value)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Tag>Multiplier</Tag>
          <NumberInput
            value={state.mult}
            onChange={(value) => (state.mult = value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
