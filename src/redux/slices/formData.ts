import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FormData = {
  name: string | null;
  age: number | null;
  email: string | null;
  password: string | null;
  gender: string | null;
  terms: boolean | null;
  picture: string | null;
  country: string | null;
};

type SliceState = { formData: FormData };

const initialState: SliceState = {
  formData: {
    name: null,
    age: null,
    email: null,
    password: null,
    gender: null,
    terms: null,
    picture: null,
    country: null,
  },
};

export const formData = createSlice({
  name: "data",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<FormData>) {
      state.formData = action.payload;
    },
  },
});

const { actions, reducer } = formData;

export const { setFormData } = actions;

export default reducer;
