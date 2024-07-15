import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: {
    id: null,
    user: null,
    name: null,
    comment: null,
    file: null,
    uploaded_at: null,
    last_download: null,
    uuid: null,
    type: null,
    size: null,
    file_download_url: null,
  }
};

export const cloudSlice = createSlice({
  name: 'cloud',
  initialState,
  reducers: {
    // changeView: (state) => {
    //   return { ...state, view: !state.view };
    // },
    // addUserFiles: (state, action) => {
    //   return { ...state, files: action.payload };
    // },
    // deleteFileFromFiles: (state, action) => {
    //   return { ...state, files: state.files.filter((el) => el.id !== Number(action.payload)) };
    // },
    // changeFileData: (state, action) => {
    //   return { ...state, files: state.files.map((el) => el.id === action.payload.id ? action.payload : el) };
    // },
    changeActive: (state, action) => {
      return { ...state, active: action.payload }; 
    },
    resetActive: (state, action) => {
      return { ...state, active: initialState.active }; 
    },

    // changeIsActive: (state, action) => {
    //   return { ...state, isActive: action.payload }; 
    // },
    // resetIsActive: (state, action) => {
    //   return { ...state, isActive: null }; 
    // },

    changeParams: (state, action) => {
      return { ...state, params:{...state.params, ...action.payload}}; 
    },
    resetParams: (state, action) => {
      return { ...state, params: {} }; 
    },
    // changeFiles: (state, action) => {
    //   return { ...state, files:action.payload}; 
    // },
    // resetFiles: (state, action) => {
    //   return { ...state, files: [] }; 
    // },

    // deleteFocusOnFile: (state) => {
    //   return { ...state, onFocus: null };
    // },
    // showDeleteConfirm: (state) => {
    //   return { ...state, confirm: true };
    // },
    // hideDeleteConfirm: (state) => {
    //   return { ...state, confirm: false };
    // },
    // showShareURL: (state) => {
    //   return { ...state, share: true };
    // },
    // hideShareURL: (state) => {
    //   return { ...state, share: false };
    // },
    // showMessage: (state) => {
    //   return { ...state, message: true };
    // },
    // hideMessage: (state) => {
    //   return { ...state, message: false };
    // },
    // saveDownloadURL: (state, action) => {
    //   return { ...state, dounloadURL: action.payload};
    // },
    resetCloud: () => {
      return { ...initialState };
    },
    // showChange: (state) => {
    //   return { ...state, change: true };
    // },
    // hideChange: (state) => {
    //   return { ...state, change: false };
    // },
  }
});

export const {
  resetCloud,
  // changeView,
  // addUserFiles,
  // deleteFileFromFiles,
  // changeFileData,
  changeActive,
  resetActive,
  // changeFiles,
  // resetFiles,
  // deleteFocusOnFile,
  // showDeleteConfirm,
  // hideDeleteConfirm,
  // showShareURL,
  // hideShareURL,
  // showMessage,
  // hideMessage,
  // saveDownloadURL,
  // showChange,
  // hideChange,

} = cloudSlice.actions;

export default cloudSlice.reducer;
