const FIELD_KEYS = ["userInput", "webGenLoading", "webData"];

const fieldActions = FIELD_KEYS.reduce((acc, key) => {
  acc[key] = (payload) => ({
    type: key,
    payload
  });
  return acc;
}, {});

export const commonActions = {
  ...fieldActions
};
