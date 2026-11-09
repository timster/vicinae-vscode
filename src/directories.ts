import { readdirSync } from "fs";

export const DEVELOPER_DIR = "/Users/tim/Developer";

export function getDirectories(): string[] {
	return readdirSync(DEVELOPER_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));
}
