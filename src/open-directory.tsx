import { Action, ActionPanel, List } from "@vicinae/api";
import { execFile } from "child_process";
import { readdirSync } from "fs";
import { join } from "path";

const DEVELOPER_DIR = "/Users/tim/Developer";
const CODE_PATH = "/opt/homebrew/bin/code";

function getDirectories(): string[] {
	return readdirSync(DEVELOPER_DIR, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));
}

export default function Command() {
	const dirs = getDirectories();

	function openInVSCode(name: string) {
		const fullPath = join(DEVELOPER_DIR, name);
		execFile(CODE_PATH, [fullPath]);
	}

	return (
		<List searchBarPlaceholder="Search directories...">
			{dirs.map((name) => (
				<List.Item
					key={name}
					title={name}
					icon="extension_icon.png"
					actions={
						<ActionPanel>
							<Action title="Open in VS Code" onAction={() => openInVSCode(name)} />
						</ActionPanel>
					}
				/>
			))}
		</List>
	);
}
