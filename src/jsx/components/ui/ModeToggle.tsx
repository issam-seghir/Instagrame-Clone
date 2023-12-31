import { Button, Group, useMantineColorScheme } from "@mantine/core";

export default function ModeToggle(): React.JSX.Element {
	const { setColorScheme } = useMantineColorScheme();

	return (
		<Group justify="center" mt="xl">
			<Button onClick={() => setColorScheme("light")}>Light</Button>
			<Button onClick={() => setColorScheme("dark")}>Dark</Button>
			<Button onClick={() => setColorScheme("auto")}>Auto</Button>
		</Group>
	);
}
