window.CMS_MANUAL_INIT = true;

var pagelayouts = ["default", "blank"];

var collections = 
[
    { 
        "name": "content-blocks" ,
        "label": "Content block",
        "folder": "/custom_collections/_content-blocks",
        "create": true,
        "slug": "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{slug}}",
        "identifier_field": "title",
        "fields":[
            { "label": "Hidden", "name": "hidden", "widget": "boolean", "default": true },
            { "label": "Title", "name": "title", "required": true },
            { "label": "Content", "name": "body", "widget": "markdown" },
            { "label": "Background color", "name": "bg-color", "default": "#B64144", "widget": "color-picker", "required": false },
            { "label": "Text color", "name": "color", "default": "white", "widget": "color-picker", "required": false },
            { "label": "Additionall CSS class", "name": "css-class", "default": "", "required": false }                    
        ]
    },
    {
        "name": "animated-banners",
        "label": "Animated banner",
        "folder": "custom_collections/_animated-banners",
        "create": true,
        "slug": "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{slug}}",
        "identifier_field": "title",
        "fields":[
          { "label": "Hidden", "name": "hidden", "widget": "boolean", "default": true },
          { "label": "Title", "name": "title", "required": true },
          { "label": "Content - in rows", "name": "body", "widget": "markdown" },
          { "label": "Background image", "name": "background-image", "widget": "image", "required": false, "media_library":  { "config": { "multiple": false }}}
        ]
    },
    {


        "name": "testimonial" ,
        "label": "Testimonial",
        "folder": "/custom_collections/_testimonials",
        "create": true,
        "slug": "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{slug}}",
        "identifier_field": "name",
        "fields":[
          { "label": "Hidden", "name": "hidden", "widget": "boolean", "default": true },
          { "label": "First and last name", "name": "name", "required": true },
          { "label": "Title", "name": "title", "required": true },
          { "label": "Tagline", "name": "tagline" },
          { "label": "Photo", "name": "photo", "widget": "image", "required": false, "media_library": { "config": { "multiple": false }}},
          { "label": "Content", "name": "body", "widget": "markdown" },
          { "label": "Gender icon", "name": "genger", "widget": "select", "default": "Male", "multiple": false, "options": ["Male", "Female"] }
        ]
    },
    {
        "name": "page-generators",
        "label": "Page",
        "folder": "/custom_collections/_page-generators",
        "create": true,
        "slug": "{{year}}-{{month}}-{{day}}-{{hour}}-{{minute}}-{{slug}}",
        "identifier_field": "name",
        "fields": [
            { "label": "Page name", "name": "name", "widget": "pagetitle", "required": true, "id": "page-generator-title", "mirrored": true, "editorComponents": ["animated-banner", "content-blocks", "testimonials"] },
            { "label": "Content", "name": "body", "widget": "markdown" },
            { "label": "Permalink", "name": "permalink", "widget": "permalink", "required": true, "mirrorfield": "page-generator-title" },
            { "label": "Page layout", "name": "layout", "widget": "select", "required": true, "options": pagelayouts, "default": "default" }
        ]
    }
  ];



function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    console.log("appeding script " + url.substr(url.lastIndexOf("/")+1));
    // Fire the loading
    head.appendChild(script);
}

function custom()
{
   console.log("main script loaded. running custom script");
    window.CMS_MANUAL_INIT = true

    if(window.netlifinityModules && window.netlifinityModules.length > 0)
    {
      
        for(var m=0; m < window.netlifinityModules.length; m++)
        {
            collections.push(window.netlifinityModules[m]["config"]);
        }
    }
  
    console.log(collections);
  
  
  var configurations = 
  {
      "development": {
          "config": {
          "backend": {
              "name": "git-gateway"
          },
          "local_backend": true,
          "load_config_file": false,
          "media_folder": "Uploads",
          "public_folder": "Uploads",
          "collections": collections
          }
      },
      "production": {
          "config": {
          "backend": {
              "name": "github",
              "repo": "mastilnicata/mastilnicata.github.io",
              "branch": "work",
              "base_url": "https://warm-woodland-78106.herokuapp.com"
          },
          "local_backend": true,
          "load_config_file": false,
          "media_folder": "Uploads",
          "public_folder": "Uploads",
          "collections": collections
          }
      }
  }


    var env = "{{jekyll.environment}}";
    if(!configurations[env])
    {
      env = "production";
    }
    initCMS(configurations[env]);

    if(window.netlifinityModules && window.netlifinityModules.length > 0 && CMS && CMS.registerWidget)
    {
        for(var m=0; m < window.netlifinityModules.length; m++)
        {
            alert("registering widget: " + window.netlifinityModules[m]["modulename"]);
            CMS.registerWidget(
                window.netlifinityModules[m]["modulename"], 
                createClass(window.netlifinityModules[m]["control"]),
                createClass(window.netlifinityModules[m]["preview"])
            );

            if(window.netlifinityModules[m]["callback"])
            {
                window.netlifinityModules[m]["callback"]();
            }
        }
    }
}

loadScript("https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js", custom);