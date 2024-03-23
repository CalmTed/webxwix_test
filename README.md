### PLAN

1. Create UI
   - address bar (text, reload/stop, back)
   - proxy settings (enabled, address, port)
   - web page view
2. Open web page from provided address
   - open using proxy (not changeble for now)
3. Change proxy settings
4. Security best practicies

webview
https://www.youtube.com/watch?v=37q6IwGaAvw

laoding with with proxy
https://stackoverflow.com/questions/37393248/how-connect-to-proxy-in-electron-webview

loading browser view as child element (but not DOM)
https://www.electronjs.org/docs/latest/api/browser-view

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```

### log
```
2024-03-20
   - dont know how to show web page with external address bar in the same window
   - dont know how to set up proxy
2024-03-23
   - googled about webview
   - googled about proxy for browser view and browserview
   - discovered that browserView can be the part of window itself

   - 1030 ips doesnt want to work, remember that probem but forgot how did i fix it last time
   - 1118 nedded to use default nextjs preload script and strictly use contextIsolation: true
   - 1247 basicaly done but still unable to test if proxy works b.c. proxy doest work in system settings either for some reason
```