// interfaces
import type I_Profile from '$interfaces/I_Profile';

// config
import supabase from '$config/supabase';

const getProfileByUserId = async (userId: string): Promise<I_Profile | undefined> => {
  const { data, error } = await supabase
  .from('profile')
  .select(`
    id,
    user_id
  `)
  .match({ user_id: userId });

  if (error) {
    console.log('[getProfileByUserId]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[getProfileByUserId]:[null]', data);
    return undefined;
  }

  return data[0];
}

const insertProfile = async (item: any) => {
  if (!item) {
    console.log('[insertProfile]:[params] item is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('profile')
  .insert([
    {
      user_id: item.userId,
    },
  ])
  .select()

  if (error) {
    console.log('[insertProfile]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[insertProfile]:[null]', data);
    return undefined;
  }

  return data[0];
}

const updateProfile = async (profileId: number, item: any) => {
  if (!profileId) {
    console.log('[updateProfile]:[params] profileId is required.');
    return undefined;
  }
  
  if (!item) {
    console.log('[updateProfile]:[params] item is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('profile')
  .update(item)
  .match({ id: profileId })
  .select();

  if (error) {
    console.log('[updateProfile]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[updateProfile]:[null]', data);
    return undefined;
  }

  return data[0];
}

export {
  getProfileByUserId,
  insertProfile,
  updateProfile,
}