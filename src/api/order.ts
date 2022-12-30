// config
import supabase from '$config/supabase';

const getOrders = async (
  filters: {} = {},
  sort: {
    key: string,
    value: { ascending: boolean }
  } = {
    key: 'created_at',
    value: { ascending: false }
  },
  limit: number = 10
) => {
  const { data, error } = await supabase
  .from('order')
  .select(`
    id
  `)
  .match(filters)
  .order(sort.key, sort.value)
  // .limit(limit)

  if (error) {
    console.log('[getOrders]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[getOrders]:[null]', data);
    return undefined;
  }

  return data;
}

const insertOrder = async (item: any) => {
  if (!item) {
    console.log('[insertOrder]:[params] item is required.');
    return undefined;
  }

  const { data, error } = await supabase
  .from('order')
  .insert(item)
  .select()

  if (error) {
    console.log('[insertOrder]:[error]', error);
    return undefined;
  }

  if (!data) {
    console.log('[insertOrder]:[null]', data);
    return undefined;
  }

  return data[0];
}

export {
  getOrders,
  insertOrder,
}