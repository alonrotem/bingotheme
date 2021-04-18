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

  updateMenu: function()
  {
    console.log("=========== updateMenu ===========");
    this.editor.update();
    alert(this.editor.getString());
    this.props.onChange(this.editor.getString());
  },
  addToMenu: function()
  {
    console.log("=========== addToMenu ===========");
    this.editor.add();
    alert(this.editor.getString());
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
          h('button', { 'type':'button', 'id': 'btnUpdate', 'className':'btn btn-primary ml-2', 'disabled':'disabled', 'onClick': this.updateMenu },
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
  componentDidMount: function(){
    console.log("======== componentDidMount ==========");
    var iconPickerOptions = {searchText: "Search...", labelHeader: "{0}/{1}"};
    // sortable list options
    var sortableListOptions = {
        placeholderCss: {'background-color': "#cccccc"}
    };
    if(!this.editor)
    {
      
      this.editor = new MenuEditor('serumMenuEditor', 
          { 
          listOptions: sortableListOptions, 
          iconPicker: iconPickerOptions,
          maxLevel: 2 // (Optional) Default is -1 (no level limit)
          // Valid levels are from [0, 1, 2, 3,...N]
          });
      
          this.editor.setForm($('#frmEdit'));
          this.editor.setUpdateButton($('#btnUpdate'));

      //console.log(editor);

      
    }
    console.log("======== filling "+this.props.value+"==========");
    var arrayjson = this.props.value;//[{"href":"http://home.com","icon":"fas fa-home","text":"Home", "target": "_top", "title": "My Home"},{"icon":"fas fa-chart-bar","text":"Opcion2"},{"icon":"fas fa-bell","text":"Opcion3"},{"icon":"fas fa-crop","text":"Opcion4"},{"icon":"fas fa-flask","text":"Opcion5"},{"icon":"fas fa-map-marker","text":"Opcion6"},{"icon":"fas fa-search","text":"Opcion7","children":[{"icon":"fas fa-plug","text":"Opcion7-1","children":[{"icon":"fas fa-filter","text":"Opcion7-1-1"}]}]}];
    this.editor.setData(arrayjson);
  }
};


var menueditorPreview = {
  render: function() {
    return h('div', { "style" : { "backgroundColor" : this.props.value } } );
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