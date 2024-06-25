const initialState = {
  user: {},
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
