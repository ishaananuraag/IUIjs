define(['IUI-core'],function(IUI){

	var behaviors={};
	
	behaviors.delegateDOMEvent=function(e){
		var obj={originalEvent:e};
		if(this.value){
			obj.value=this.value()
		}
		obj.target=this;
		this.trigger(e.type,obj);
	}
	
	behaviors.extractStyleFromObject=function(element,object){
		for(var attr in object){
			if(attr in element.style){					//Need to make efficient
				element.style[attr]=object[attr];
			}
		}	
	}
	
	behaviors.filterStyleFromObject=function(object){
		var _obj={};
		for(var attr in object){
			if(attr in document.body.style){
				_obj[attr]=object[attr];
			}
		}
		return _obj;		
	}
	
	IUI.behaviors=behaviors;

});