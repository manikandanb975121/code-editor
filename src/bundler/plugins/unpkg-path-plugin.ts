import * as esbuild from 'esbuild-wasm';
// import axios from 'axios';
// import localforage from 'localforage';

// const fileCache = localforage.createInstance({
//   name: 'filecache'
// });


// (async () => {
//   await fileCache.setItem('color', 'red');

//   const color = await fileCache.getItem('color');

//   console.log({color})
// })()

export const unpkgPathPlugin = () => {

  return {

    name: 'unpkg-path-plugin',

    setup(build: esbuild.PluginBuild) {


      build.onResolve({filter: /(^index\.js$)/}, () => {
        return {path: 'index.js', namespace: 'a'}
      })


      build.onResolve({filter: /^\.+\//}, async (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      })

      build.onResolve({ filter: /.*/ }, async (args: any) => {

        // console.log('onResole', args);

        // if (args.path === 'index.js') {

        //     return { path: args.path, namespace: 'a' };

        // } 

        // if (args.path.includes('./') || args.path.includes('../')) {

        //     return {
        //         namespace: 'a',
        //         // path: new URL(args.path, args.importer + '/').href
        //         path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        //     }

        // }

        return { namespace: 'a', path:`https://unpkg.com/${args.path}`}

        // else if (args.path === 'tiny-test-pkg') {
        //     return { path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a' };
        // }
        
      });

      // build.onLoad({ filter: /.*/ }, async (args: any) => {

      //   console.log('onLoad', args);

      //   if (args.path === 'index.js') {

      //     return {
      //       loader: 'jsx',
      //       contents: inputCode,
      //     };

      //   } 


      //   const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);


      //   if (cachedResult) {
      //     return cachedResult;
      //   }
        


      //   const { data, request } = await axios.get(args.path);

      //   console.log({request})

      //   console.log({data})

      //   const result: esbuild.OnLoadResult = {
      //     loader: 'jsx',
      //     contents: data,
      //     resolveDir: new URL('./', request.responseURL).pathname
      //   };


      //   await fileCache.setItem(args.path, result);

      //   return result;

      //   // return {
      //   //     loader: 'jsx',
      //   //     contents: data,
      //   //     resolveDir: new URL('./', request.responseURL).pathname
      //   // };

      // });
    },
  };
};