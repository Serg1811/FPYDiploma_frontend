import { useSelector } from 'react-redux';

export const useUser = () => {
    const { token, first_name, username, email, id, is_staff } = useSelector(
        state => state.user,
    );

    return {
        isAuth: !!token,
        first_name,
        username,
        email,
        token,
        id,
        is_staff,
    };
}

export const useValidation = () => {
    const { email, username, password, passwordRepeat,filename, values } = useSelector(
        state => state.validation,
    );
    return {
        isValidLoginForm: username.result&&password.result,
        isValidRegistrationForm: email.result&&username.result&&password.result&&passwordRepeat.result,
        isValidEditNameCommentForm: filename,
        email,
        username,
        password,
        passwordRepeat,
        filename,
        values,
    };
}

export const useCloud = () => {
    const {
        active,
        params,
    } = useSelector(
        state => state.cloud,
    );
    return {
        id: active.id,
        name: active.name,
        comment: active.comment,
        user: active.user,
        file: active.file,
        uploaded_at: active.uploaded_at,
        last_download: active.last_download,
        uuid: active.uuid,
        type: active.type,
        size: active.size,
        file_download_url: active.file_download_url,
        params,
    }
}

// export const useApi = () => {
//     const { queries } = useSelector(
//         state => state.api,
//     );
//     return {
//         queries,

//     }
// }


