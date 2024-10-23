import type { StorageValue } from 'unstorage'

export async function getItem<T extends StorageValue>(key: string) {
  const storage = useStorage('blob')
  const result = await storage.getItemRaw<T>(key)
  return result
}
export async function setValue(key: string, value: StorageValue) {
  const storage = useStorage('blob')
  await storage.setItemRaw(key, value)
}

export async function removeItem(key: string) {
  const storage = useStorage('blob')
  await storage.removeItem(key)
}

export async function haveValue(key: string) {
  const storage = useStorage('blob')
  const result = await storage.hasItem(key)
  return result
}
