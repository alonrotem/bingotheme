On Linux
```
npx netlify-cms-proxy-server & bundle exec jekyll serve --incremental --livereload
```

On Windows (Powershell)
````
$netlifycmsbackend = Start-Process -NoNewWindow npx netlify-cms-proxy-server; $jekyllrun = Start-Process -NoNewWindow bundle 'exec jekyll serve'
```
and stop the processes
```
stop-process $netlifycmsbackend; stop-process $jekyllrun
```