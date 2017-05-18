(function(win) {
  
  var global = win;
  var doc = this.document;
  var dom = function (params, context) {
    return new GetOrMakeDom(params, context);
  };
  
  var regXContainsTag = /^\s*<(\w+|!)[^>]*>/;
  
  var GetOrMakeDom = function(params, context) {
    var currentContext = doc;
    if (context) {
      if (context.nodeType) {
        currentContext = context;
      } else {
        currentContext = doc.querySelector(context);
      }
    }
    
    if (!params || params === '' ||
        typeof params === 'string' && params.trim() === ''){
      this.length = 0;
      return this;
    }
    
    // HTML 문자열
    if (typeof params === 'string' && regXContainsTag.test(params)) {
      var divElm = currentContext.createElement('div');
      divElm.className = 'hippo-doc-frag-wrapper';
      var docFrag = currentContext.createDocumentFragment();
      docFrag.appendChild(divElm);
      
      var queryDiv = docFrag.querySelector('div');
      queryDiv.innerHTML = params;
      
      var numberOfChildren = queryDiv.children.length;
      for (var z = 0; z < numberOfChildren; z++) {
        this[z] = queryDiv.children[z];
      }
      
      this.length = numberOfChildren;
      return this;
    }
    
    // Object
    if (typeof params === 'object' && params.nodeName) {
      this.length = 1;
      this[0] = params;
      return this;
    }
    
    // 노드가 아닌 경우, 리스트나 배열로 가정
    var nodes;
    if (typeof params !== 'string') {
      nodes = params;
    } else {
      nodes = currentContext.querySelectorAll(params.trim());
    }
    
    var nodeLength = nodes.length;
    for (var i = 0; i < nodeLength; i++) {
      this[i] = nodes[i];
    }
    
    this.length = nodeLength;
    return this;
  };
 
  global.dom = dom;
  dom.fn = GetOrMakeDom.prototype;
 
})(window);

dom.fn.each = function (callback) {
  var len = this.length;
  
  for (var i = 0; i < len; i++) {
    callback.call(this[i], i, this[i]);
  }

  return this;
}

dom.fn.html = function(htmlString) {
  if (htmlString) {
    return this.each(function() {
      this.innerHTML = htmlString;
    });
  } else {
    return this[0].innerHTML;
  }
}

dom.fn.text = function(textString) {
  if (textString) {
    return this.each(function() {
      this.textContent = textString;
    })
  } else {
    return this[0].textContent.trm();
  }
}

dom.fn.append = function(stringOrObject) {
  return this.each(function() {
    if (typeof stringOrObject === 'string') {
      this.insertAdjacentHTML('beforeend', stringOrObject);
    } else {
      var that = this;
      dom(stringOrObject).each(function (name, value) {
        that.insertAdjacentHTML('beforeend', value.outerHTML);
      });
    }                          
  });
}

