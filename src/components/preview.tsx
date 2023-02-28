import { useEffect, useRef } from "react";
import './preview.css'

interface PreviewProps {
    code: string;
    err: string;
}

const html = `
<html>
  <head>
  <style> html { background: white; }</style>
  </head>
  <body>
      <div id="root"></div>
      <script>

        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>'+ err +'</div>'
          console.error(err)
        }

        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error)
        })

        window.addEventListener('message', (event) => {

          try {
            console.log(event.data);
            eval(event.data)
          } catch(err) {
            handleError(err)
          }
          
        }, false)    
      </script>
    </body>
</html>

`

const Preview: React.FC<PreviewProps> = ({code, err}) => {

    const iframe = useRef<any>('')

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
          iframe.current.contentWindow.postMessage(code, '*')
        }, 50)
        // iframe.current.contentWindow.postMessage(code, '*')
    }, [code])

    console.log(err);
    
    return <div className="preview-wrapper">
      <iframe title='priview' ref={iframe} sandbox='allow-scripts allow-modals' srcDoc={html} />
      {err && <div className="preview-error">{err}</div>}
      </div>
}


export default Preview;