import { writable } from 'svelte/store';

// config
import { supabase } from 'config/supabase';

function createSession() {
	const { subscribe, set } = writable();

	const subscribeAuthStateChange = () => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
				set(undefined);
			} else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				set(session);
			}
		});
		return subscription;
	}

	const unsubscribeAuthStateChange = (subscription: any) => {
		if (subscription) subscription.unsubscribe();
	}

	const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set(session);
	}

	const signInUser = async (email: string) => {
    await supabase.auth.signInWithOtp({ email });
  }

  const signOutUser = async () => {
    await supabase.auth.signOut();
  }

	return {
		subscribe,
		getSession,
		signInUser,
		signOutUser,
		subscribeAuthStateChange,
		unsubscribeAuthStateChange,
	};
}

export const session = createSession();