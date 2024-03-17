import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};

    const action = {
      type: "DO_NOTHING",
      payload: 1,
    };

    deepFreeze(state);

    const newState = counterReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
      payload: 1,
    };

    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
      payload: 1,
    };

    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
      payload: 5,
    };

    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 5,
    });
  });

  test("should return initial state when called with zero state", () => {
    const action = {
      type: "ZERO",
    };

    const state = {
      good: 10,
      ok: 15,
      bad: 20,
    };

    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
