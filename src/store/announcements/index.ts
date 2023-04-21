export {}
// import { createSlice, AnyAction } from "@reduxjs/toolkit";
// import { getAnnoun } from "./getAnnoun";

// const initialState = {
//   announcement: [],
//   loading: false,
//   error: null,
// }

// const AnnouncementSlice = createSlice({
//   name: 'announcement',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAnnoun.fulfilled, (state, action) => {
//         state.loading = false,
//         state.announcement.push(action.payload)
//       })
//       // .addMatcher(isError, ( action) => {
//       //   return action.type.endsWith('rejected')
//       // })
//   },
// })

// export default AnnouncementSlice.reducer

// function isError(action: AnyAction) {
//   return action.type.endsWith('rejected')
// }