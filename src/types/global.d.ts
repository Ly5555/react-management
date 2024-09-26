declare namespace Menu {
	interface MenuOptions {
		path: string,
		component: any,
		title: string,
		icon?: any,
		children?: MenuOptions[]
	}
}