//based on https://github.com/davicotico/jQuery-Menu-Editor

var menueditorSerumModuleName = "SerumMenuEditor";
window.serumMenuEditor = null;

if (!window.loadScript) {window.loadScript = function (url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    if(callback){
        script.onreadystatechange = callback;
        script.onload = callback;
    }
    console.log("appeding script " + url.substr(url.lastIndexOf("/")+1));
    // Fire the loading
    head.appendChild(script);
}}

if (!window.loadCSS) {window.loadCSS=function(fileName) {
  var head = document.head;
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;
  head.appendChild(link);
}
}


window.loadScript("Serum/Menu-Editor/js/jquery.min.js", function(){
window.loadScript("Serum/Common/bootstrap.bundle.min.js", function(){
    window.loadScript("Serum/Menu-Editor/js/fontawesome5-3-1.min.js", function(){
      window.loadScript("Serum/Menu-Editor/js/bootstrap-iconpicker.min.js", function (){
      window.loadScript("Serum/Menu-Editor/js/jquery-menu-editor.js", function (){
        window.loadScript("Serum/arrive.js", function (){

        window.loadCSS("Serum/Common/bootstrap.min.css");
        window.loadCSS("Serum/Menu-Editor/css/font-awesome.all.css");
        window.loadCSS("Serum/Menu-Editor/css/bootstrap-iconpicker.min.css");
        window.loadCSS("Serum/serum.css");
//-----------------------------

var menueditorcontrol = {
  editor: null,
  loaded: false,
  componentDidMount: function(){
    console.log("======== componentDidMount ==========");
    var iconPickerOptions = {searchText: "Search...", labelHeader: "{0}/{1}"};
    // sortable list options
    var sortableListOptions = {
        placeholderCss: {'background-color': "#cccccc"}
    };
    if(!this.editor)
    {
      console.log("---- FIRST LOAD ---");
      this.editor = new MenuEditor('serumMenuEditor', 
          { 
          listOptions: sortableListOptions, 
          iconPicker: iconPickerOptions,
          maxLevel: 1 // (Optional) Default is -1 (no level limit)
          // Valid levels are from [0, 1, 2, 3,...N]
          });
      
          this.editor.setForm($('#frmEdit'));
          this.editor.setUpdateButton($('#btnUpdate'));
          $("#btnUpdate").click(this.updateMenu);
          console.log(MenuEditor.updateButtons);

          //wrap the original function, to capture menu changes
          var that = this;
          //var thateditor = that.editor;
          MenuEditor.updateButtons = (function() {
            var originalfunct = MenuEditor.updateButtons;

            return function() {
                // your code
                if(that.loaded)
                {
                  console.log("===  CAUGHT AN UPDATE! ===");     
                  that.props.onChange(that.editor.getString());   
                }
                originalfunct.apply(this, arguments);
                //that.props.onChange(that.editor.getString());
                // more of your code
            };
        })();
        

      //console.log(editor);

      
    }
    console.log("======== filling "+this.props.value+"==========");
    var arrayjson = this.props.value;//[{"href":"http://home.com","icon":"fas fa-home","text":"Home", "target": "_top", "title": "My Home"},{"icon":"fas fa-chart-bar","text":"Opcion2"},{"icon":"fas fa-bell","text":"Opcion3"},{"icon":"fas fa-crop","text":"Opcion4"},{"icon":"fas fa-flask","text":"Opcion5"},{"icon":"fas fa-map-marker","text":"Opcion6"},{"icon":"fas fa-search","text":"Opcion7","children":[{"icon":"fas fa-plug","text":"Opcion7-1","children":[{"icon":"fas fa-filter","text":"Opcion7-1-1"}]}]}];
    this.editor.setData(arrayjson);
    this.loaded = true;
  },

  updateMenu: function()
  {
    console.log("=========== updateMenu ===========");
    this.editor.update();
    //alert(this.editor.getString());
    this.props.onChange(this.editor.getString());
  },

  addToMenu: function()
  {
    console.log("=========== addToMenu ===========");
    this.editor.add();
    //alert(this.editor.getString());
    this.props.onChange(this.editor.getString());
  },
  render: function() {
    //this.prerender()
    console.log("=========== rendering ===========");
    var ctl = h('div', {}, 
      h('ul', { 'className': 'sortableLists list-group waitforit', 'id': 'serumMenuEditor' }),

      h('div', { 'className': 'card border-primary mb-3' },
        h('div', { 'className': 'card-header bg-primary text-white' }, 'Edit item'),
        h('div', { 'className': 'card-body' },
          h('form', { 'className':'form-horizontal', 'id': 'frmEdit' },
            h('div', { 'className':'form-group' },
              h('label', { 'for':'text' }, 'Text'),
              h('div', { 'className': 'input-group' }, 
                h('input', { 'type':'text', 'className': 'form-control item-menu', 'name': 'text', 'id': 'text', 'placeholder': 'Text' }),
                h('div', { 'className': 'input-group-append' },
                  h('button', { 'type': 'button', 'id':'serumMenuEditor_icon', 'className': 'btn btn-outline-secondary' })
                )
              ),
              h('input', { 'type': 'hidden', 'name':'icon', 'className':'item-menu'})
            ),
            h('div', { 'className':'form-group' },
              h('label', { 'for':'href' }, 'URL'),
              h('input', { 'type':'text','className': 'form-control item-menu', 'id':'href', 'name':'href', 'placeholder':'URL' })
            ),
            h('div', { 'className':'form-group' },
              h('label', { 'for':'target' }, 'Target'),
              h('select', { 'name':'target', 'id':'target','className':'form-control item-menu' },
                h('option', {'value': '_self'}, 'Self'),
                h('option', {'value': '_blank'}, 'Blank'),
                h('option', {'value': '_top'}, 'Top')
              )
            ),
            h('div', { 'className':'form-group' },
              h('label', { 'for':'title' }, 'Tooltip'),
              h('input', { 'type':'text','className': 'form-control item-menu', 'id':'title', 'name':'title', 'placeholder':'Tooltip' })
            )
          )
        ),
        h('div', { 'className':'card-footer' },
          h('button', { 'type':'button', 'id': 'btnUpdate', 'className':'btn btn-primary ml-2', 'disabled':'disabled' }, //, 'onClick': this.updateMenu
            h('i', {'className': 'fas fa-sync-alt'}),
            h('span', { 'className': 'ml-2' }, 'Update')
          ),
          h('button', { 'type':'button', 'id': 'btnAdd', 'className':'btn btn-success ml-2', 'onClick': this.addToMenu },
            h('i', {'className': 'fas fa-plus'}),
            h('span', { 'className': 'ml-2' }, 'Add')
          )            
        )
      )
    );
    return ctl;
  },
};


var menueditorPreview = {
  traverse:function(menuobj, level)
  {
    var element;
    if(menuobj && menuobj.length > 0)
    {
      //element = h('ul', { 'className': });
    }
  },

  /*
<ul id="fresponsive" class="nav navbar-nav dropdown">
  <li class="active"><a href="#">Home</a></li>
  <li><a href="#">About</a></li>
  <li><a href="#">service</a></li>
  <li class="dropdown"><a data-toggle="dropdown" class="dropdown-toggle">Submenu 1<span class="caret"></span></a>
      <ul class="dropdown-menu">
        <li><a href="#">Lorem ipsum</a></li>
        <li>
          <a href="#" data-toggle="dropdown" class="dropdown-toggle">Submenu 2<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Lorem ipsum</a></li>
            <li><a href="#">Lorem ipsum</a></li>
            <li>
              <a href="#" data-toggle="dropdown" class="dropdown-toggle">Submenu 3<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Lorem ipsum</a></li>
                <li><a href="#">Lorem ipsum</a></li>
              </ul>
          </li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#Download">lorem ipsum</a></li>        
</ul>  
  */
  render: function() {
    var rendered;
    if(this.props && this.props.value){
      var value = JSON.parse(this.props.value);
      rendered = this.traverse(value, 0);
    }
    else
    {
      rendered = h('div', {}, "No menu yet. Create your first menu item!");
    }
    console.log(JSON.parse(this.props.value));
    
    return h('div', {}, rendered );
/*
Multilevel
https://bootsnipp.com/snippets/35p8X

https://getbootstrap.com/docs/4.0/components/navbar/
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
*/

  }
};

var menurdidorconfig = { 
  "name": "menus" ,
  "label": "Menus",
  "folder": "/serum/_menus",
  "create": true,
  "slug": "{{slug}}", //{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-
  "identifier_field": "title",
  "fields":[
      { "label": "Hidden", "name": "hidden", "widget": "boolean", "default": true },
      { "label": "Title", "name": "title", "required": true },
      { "label": "Menu", "name": "menu", "default": "{}", "widget": menueditorSerumModuleName, "required": true }
  ]
};
//-----------------------------

if (!window.serumModules) {
  window.serumModules = [];
}


//  CMS.registerPreviewTemplate("content-blocks", ContentBlockPreview);


var menueditorloaded = function(){
  //alert("called menueditorloaded");
document.arrive(".waitforit", function() {
  //alert("waitforit arrived");
  Array.from(document.getElementsByClassName("waitforit")).forEach(function(element, index){
//debugger;
/*
    var iconPickerOptions = {searchText: "Search...", labelHeader: "{0}/{1}"};
    // sortable list options
    var sortableListOptions = {
        placeholderCss: {'background-color': "#cccccc"}
    };
    if(!window.serumMenuEditor)
    {
      
    window.serumMenuEditor = new MenuEditor('serumMenuEditor', 
          { 
          listOptions: sortableListOptions, 
          iconPicker: iconPickerOptions,
          maxLevel: 2 // (Optional) Default is -1 (no level limit)
          // Valid levels are from [0, 1, 2, 3,...N]
          });
      
          window.serumMenuEditor.setForm($('#frmEdit'));
          window.serumMenuEditor.setUpdateButton($('#btnUpdate'));

      //console.log(editor);

      
    }
    console.log("======== filling ==========");
    var arrayjson = [{"href":"http://home.com","icon":"fas fa-home","text":"Home", "target": "_top", "title": "My Home"},{"icon":"fas fa-chart-bar","text":"Opcion2"},{"icon":"fas fa-bell","text":"Opcion3"},{"icon":"fas fa-crop","text":"Opcion4"},{"icon":"fas fa-flask","text":"Opcion5"},{"icon":"fas fa-map-marker","text":"Opcion6"},{"icon":"fas fa-search","text":"Opcion7","children":[{"icon":"fas fa-plug","text":"Opcion7-1","children":[{"icon":"fas fa-filter","text":"Opcion7-1-1"}]}]}];
    window.serumMenuEditor.setData(arrayjson);
    */
  });
  
});
};

window.serumModules.push({ 
  "modulename": menueditorSerumModuleName, 
  "control": menueditorcontrol, 
  "preview": menueditorPreview,
  "config": menurdidorconfig,
  "callback": menueditorloaded
});


});
});
});
});
});
});