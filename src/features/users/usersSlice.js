import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
});

export const fetchUserById = createAsyncThunk("fetchUserById", async (values, thunkAPI) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${values.id}`, {
    signal: thunkAPI.signal,
  });
  const users = await response.json();
  return users;
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (values, thunkAPI) => {
    return fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: values.name, email: values.email }),
      signal: thunkAPI.signal,
    }).then((res) => res.json());
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, email } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(addUser.pending, (state) => {});
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.entities = [...state.entities, action.payload];
    });
    builder.addCase(addUser.rejected, (state, action) => {});
  },
});

export const { userAdded, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
