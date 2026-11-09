import { Action, ActionPanel, closeMainWindow, List } from "@vicinae/api";
import { execFile } from "child_process";
import { join } from "path";
import { DEVELOPER_DIR, getDirectories } from "./directories";

export default function Command() {
	const dirs = getDirectories();

	function startClaude(name: string) {
		const fullPath = join(DEVELOPER_DIR, name);
		// Run through a login shell so PATH includes claude, and drop into a shell when it exits.
		execFile("open", [
			"-na",
			"Ghostty",
			"--args",
			`--working-directory=${fullPath}`,
			"-e",
			"/bin/zsh",
			"-lic",
			"claude; exec zsh -l",
		]);
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
							<Action title="Start Claude in Ghostty" onAction={() => startClaude(name)} />
						</ActionPanel>
					}
				/>
			))}
		</List>
	);
}
