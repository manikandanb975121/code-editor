import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';
import ReactDOM from 'react-dom/client';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';
import { Provider } from 'react-redux';
import { store } from './state';


function App() {

  useEffect(() => {
    // This ugly code is to avoid calling initialize() more than once
    try {
      esbuild.build({});
    } catch (error) {
      if (error instanceof Error && error.message.includes('initialize')) {
        esbuild.initialize({
          worker: false,
          // wasmURL: '/esbuild.wasm',
          wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.48/esbuild.wasm',
        });
      } else {
        throw error;
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList />
      </div>
    </Provider>
  );
}

const root  = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)