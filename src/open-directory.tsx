import { Action, ActionPanel, closeMainWindow, List } from "@vicinae/api";
import { execFile } from "child_process";
import { join } from "path";
import { DEVELOPER_DIR, getDirectories } from "./directories";

export default function Command() {
	const dirs = getDirectories();

	function openInVSCode(name: string) {
		const fullPath = join(DEVELOPER_DIR, name);
		execFile("open", ["-a", "Visual Studio Code", fullPath]);
		closeMainWindow();
	}

	function openInTerminal(name: string) {
		const fullPath = join(DEVELOPER_DIR, name);
		execFile("open", ["-a", "Ghostty", fullPath]);
		closeMainWindow();
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
							<Action title="Open in Ghostty" onAction={() => openInTerminal(name)} />
						</ActionPanel>
					}
				/>
			))}
		</List>
	);
}
