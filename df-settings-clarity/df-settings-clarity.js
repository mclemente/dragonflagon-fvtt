
class DFSettingsClarity {
	static patchGameSettings() {
		game.settings.dfSettingsClarity_register = game.settings.register;
		game.settings.register = DFSettingsClarity.settingsRegister;
		for (var pair of game.settings.settings) {
			// let setting = game.settings.settings[pair[0]];
			pair[1].name = DFSettingsClarity.formatName(pair[1].name, pair[1].scope);
			// game.settings.settings[key] = setting;
		}
	}

	static patchGameSettingsMenus() {
		game.settings.dfSettingsClarity_registerMenu = game.settings.registerMenu;
		game.settings.registerMenu = DFSettingsClarity.settingsRegisterMenu;
		for (var pair of game.settings.menus) {
			// let menu = game.settings.menus[key];
			pair[1].name = DFSettingsClarity.formatName(pair[1].name, pair[1].scope);
			// game.settings.menus[key] = menu;
		}
	}

	static formatName(name, scope) {
		scope = ["client", "world"].includes(scope) ? scope : "client";
		let token = game.i18n.localize('DRAGON_FLAGON.SettingsClarity_' + scope);
		return !name ? token : `${token} ${game.i18n.localize(name)}`;
	}

	static settingsRegister(module, key, data) {
		data.name = DFSettingsClarity.formatName(data.name, data.scope);
		game.settings.dfSettingsClarity_register(module, key, data);
	}

	static settingsRegisterMenu(module, key, data) {
		data.name = DFSettingsClarity.formatName(data.name, data.scope);
		game.settings.dfSettingsClarity_registerMenu(module, key, data);
	}
}


Hooks.on('setup', function () {
	// if (!game.user.isGM) return;
	DFSettingsClarity.patchGameSettings();
	DFSettingsClarity.patchGameSettingsMenus();
});