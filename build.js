({
    baseUrl: "./code/scripts/IUI",
	paths:{
		'jquery': '../jquery',
		'text': '../text',
		'IUI-core':'./IUI-core',
		'IUI':'./IUI',
		'Behaviors':'./core/Behaviors',
		'WidgetBuilder':'./core/WidgetBuilder',
		'Template':'./core/Template',
		'ObservableModel':'./core/ObservableModel',
		'DataBoundContainer':'./core/DataBoundContainer',
		'OptionModel':'./models/OptionModel',
		'ContainerModel':'./models/ContainerModel',
		'Widget':'./core/Widget',
		'Validator':'./core/Validator',
		'ContainerUI':'./core/ContainerUI',
		'Overlay':'./core/Overlay',
		'Container':'./containers/Container',
		'VerticalScroller':'./containers/VerticalScroller',
		'Row':'./containers/Row',
		'Popover':'./containers/Overlays/Popover',
		'ContextMenu':'./containers/Overlays/ContextMenu',
		'Layout':'./containers/Layout/Layout',
		'Sidebar':'./containers/Layout/Sidebar',
		'Navbar':'./containers/Layout/Navbar',
		'Footer':'./containers/Layout/Footer',
		'Grid':'./containers/DataBoundContainers/Grid',
		'DataItem':'./core/DataItem',
		'DataMart':'./core/DataMart',
		'InputBox':'./widgets/InputBox',
		'Slider':'./widgets/Slider',
		'Switch':'./widgets/Switch',
		'Button':'./widgets/Button',
		'Cell':'./widgets/Cell',
		'ListView':'./widgets/ListView',
		'ToggleButton':'./widgets/ToggleButton',
		'SubmitButton':'./widgets/SubmitButton',
		'FormLabel':'./widgets/FormLabel',
		'Radio':'./widgets/Radio',
		'NumericInputBox':'./widgets/NumericInputBox',
		'DropDown':'./widgets/DropDown',
		'ComboBox':'./widgets/ComboBox',
		'Exhibit':'./containers/Exhibit',
		'Form':'./containers/Form',
		'RadioGroup':'./containers/RadioGroup'
	},	
	optimize: 'none',
	shim:{
		"IUI": {
			exports: "IUI" 
		}
	},
	name: "IUI",
    out: "./build/IUI.all.js"
})