import type { Actions } from "./$types"

export const actions = {
    default: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData()
        const email = formData.get("email") as string;
        const { error } = await supabase.auth.resetPasswordForEmail(
            email
        );
        if(error) {
            return { success: false, error: "Unable to send recovery email" }
        };
        return { success: true, email }
    }
} satisfies Actions