export const actions = {
    default: async({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const password = formData.get('password') as string;
        const confirm = formData.get('confirm') as string;

        if(password !== confirm) {
            return { error: { message: 'Passwords do not match' } };
        };

        const { error } = await supabase.auth.updateUser({
            password,
        });

        if(error) {
            return { error: { message: error.message} };
        }

        return {
            success: true,
        };
    }
}