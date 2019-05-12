(function (factory) {
   if(typeof define === "function" && define.amd) {    
	define(['IUI-core','ContainerUI'],factory);
  } else {
    factory(window.IUI);
  }
})(function(IUI){

	var viewPromiseMap = {
		
	}

	var viewContexts = {
		default:{
			view: {},
			viewport: {}
		}
	}
	
	var View = IUI.ContainerUI.extend({
		name:'View',
		events: IUI.ContainerUI.prototype.events.concat(['render','append']),
		initialize: function(options){
			this._uid=IUI.getUID();
			$(options.element).removeAttr('viewmodel').removeAttr('name');
			this.template = '<container'+options.element.outerHTML.slice(5,-5)+'container>';
			if(options.name){
				viewContexts[options.context || this.options.context].view[options.name]=this;
			}			
			this.name = options.name;
			IUI.ContainerUI.prototype.initialize.apply(this,arguments);	
			this.makeUI();
			this.bindModels();
		},	
		options:{
			context: 'default'
		},
		_honorViewPromise: function(){
			var _name = IUI.View.getName(this);
			if(viewPromiseMap[_name]){
				IUI.View.renderViewInViewport(this, viewPromiseMap[_name]);
				delete viewPromiseMap[_name];
			}
		},
		_handleviewmodelChange:function(value){
			if(!this.bound && typeof value === 'string'){
				IUI.ViewModel.bindView(value, this);
				this.bound=true;
			}else if(typeof value == 'object'){
				this._modelReady = true;
				this._honorViewPromise();
			}
		},
		render:function(){
			this.container=IUI.makeUI(this.template, this.options.viewmodel);
			this.$el=this.container.$element;
			this.trigger('render');
		},
		bindModels: function(){
			IUI.ContainerUI.prototype.bindModels.apply(this,arguments);
			if(typeof this.options.viewmodel == 'string'){
				if(this.options.viewmodel.match(IUI._observableRegex)){
					return;
				}else if(!this.bound){
					IUI.ViewModel.bindView(this.options.viewmodel, this);
					this.bound=true;
				}
			}else if(typeof this.options.viewmodel == 'object'){
				this._modelReady = true;
				this._honorViewPromise();
			}
		},
		_bindViewModel: function(model){
			
			this.options.viewmodel = model;
			this._modelReady = true;
			this._honorViewPromise();
		},
		makeUI: function(){
			this.element.outerHTML='<span class="ghost-span"></span>';
			this.element=null;
		},
		
	});
	

	IUI.View = function(){
		
	}
	
	IUI.View.getView = function(viewName){
		if(typeof viewName === 'object'){
			if(viewName.constructor === View){
					return viewName;
			}else{
				return;
			}			
		}
		
		var _name=viewName.split(':'),
			name = _name[0],
			context = _name[1];
			
		return viewContexts[context || 'default'].view[name];	
	}
	IUI.View.getViewport = function(viewportName){
		
		if(typeof viewportName === 'object'){
			if(viewportName.constructor === IUI.uiContainers.Viewport){
				return viewportName;
			}else{
				return;
			}
		}
		
		var _name=viewportName.split(':'),
			name = _name[0],
			context = _name[1];
			
		return viewContexts[context || 'default'].viewport[name];	
	}
	
	IUI.View.registerViewport = function(viewport){
		var context = viewport.options.context,
			name = viewport.options.name;
			
		if(name){
			viewContexts[context].viewport[name]=viewport;	
		}
	}
	
	IUI.View.getName = function(view){
		if(view.options.name){
			return view.options.name + ':' +view.options.context;
		}else{
			return _view._uid;
		}
	}
	
	
	IUI.View.renderViewInViewport = function(view , viewport){
		_view = IUI.View.getView(view);
		_viewport = IUI.View.getViewport(viewport);
		if(_view && _view._modelReady){
			if(!_view.$el){
				_view.render();
			}
			if(_viewport)
			_viewport.$element.append(_view.$el);
			_viewport._currentView=_view;
			_view.trigger('append');
		}else if(_view){
			viewPromiseMap[IUI.View.getName(_view)] = viewport;
		}else{
			if(typeof view === 'string'){
				var _name=view.split(':'),
					name = _name[0],
					context = _name[1] || 'default';
				}
			viewPromiseMap[name+':'+context] = viewport;
		}
		
	}
	
	
	
	
	IUI.WidgetBuilder.plugin(View);

});