import { createStorage, prefixStorage } from 'unstorage';
import localStorageDriver from 'unstorage/drivers/memory';
import type { Organization } from './demo.types';

const storage = createStorage<any>({
	driver: localStorageDriver(),
});

export const organizationStorage = prefixStorage<Organization>(
	storage,
	'teams',
);

export async function clearDemoStorage() {
	await storage.clear();
}
