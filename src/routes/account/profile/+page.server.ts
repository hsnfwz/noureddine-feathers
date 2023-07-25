/** @format */

// svelte
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, url, locals: { supabase, getSession } }) => {
    const formData = await request.formData();
    const displayName = formData.get('display-name');

    if (!displayName || displayName.length < 3) {
      return fail(400, {
        displayName,
        message: 'Display name must be at least 3 characters.',
        success: false,
      });
    }

    const session = await getSession();

    const { error } = await supabase
      .from('user_profile')
      .update({ display_name: displayName })
      .match({ id: session.user.id });

    if (error) {
      return fail(500, {
        displayName,
        message: 'Server error. Try again later.',
        success: false,
      });
    }

    return {
      displayName,
      message: 'Successfully updated display name!',
      success: true,
    };
  },
};

// api
import { getProfileById } from '$api/profile.js';

export async function load({ params, locals: { supabase, getSession } }: any) {
  const session = await getSession();

  let userProfile;

  if (session) {
    userProfile = await getProfileById(session.user.id);
  }

  return {
    userProfile,
  };
}
