import { separateEnabledOrDisabled } from "../../config/separate-by-config-option";
import { getPluginConfig, getPluginNames } from "../../config/plugin-loader";
import { createFlatRulesConfigFromRawRulesConfig } from "../../config/preset-loader";

export const createConfig = (configObject: any) => {
    // => Load options from .textlintrc
    const configRuleNamesObject = separateEnabledOrDisabled(configObject.rules);
    const configFilterRuleNamesObject = separateEnabledOrDisabled(configObject.filters);
    const configPresetNames = configRuleNamesObject.presetNames;
    const configFilePlugins = getPluginNames(configObject);
    const configFilePluginConfig = getPluginConfig(configObject);
    // Notes: vs. loadRulesConfigFromPresets
    // loadRulesConfigFromPresets load rules config from **preset package**. (It is not user defined config. It is defined by package author)
    // In other hands, this line load rules config from .textlintrc. (It is user defined config)
    const configFileRulesConfig = createFlatRulesConfigFromRawRulesConfig(configObject.rules);
    const configFileFilterRulesConfig = createFlatRulesConfigFromRawRulesConfig(configObject.filters);
    // => Merge options and configFileOptions
    // Priority options > configFile
    return {
        rules: configRuleNamesObject.enabledRuleNames,
        disabledRules: configRuleNamesObject.disabledRuleNames,
        rulesConfig: configFileRulesConfig,
        filterRules: configFilterRuleNamesObject.enabledRuleNames,
        disabledFilterRules: configFilterRuleNamesObject.disabledRuleNames,
        filterRulesConfig: configFileFilterRulesConfig,
        plugins: configFilePlugins,
        pluginsConfig: configFilePluginConfig,
        presets: configPresetNames
    };
};
